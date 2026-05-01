import { createClient } from "@supabase/supabase-js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// Fetch some books from Supabase to give the AI context about inventory
async function getBookInventoryContext(): Promise<string> {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: books, error } = await supabase
      .from("books")
      .select("title, author, genre, price, stock")
      .limit(20)
      .order("created_at", { ascending: false });

    if (error || !books || books.length === 0) {
      return "No book inventory data available at the moment.";
    }

    const bookList = books
      .map(
        (b) =>
          `- "${b.title}" by ${b.author} (Genre: ${b.genre || "General"}, Price: ${b.price} TL, Stock: ${b.stock})`
      )
      .join("\n");

    return `Here are some books currently in our inventory:\n${bookList}`;
  } catch {
    return "Book inventory is temporarily unavailable.";
  }
}

const SYSTEM_PROMPT = `You are "Libristo AI", the friendly and knowledgeable AI assistant for Libristo — a premium online bookstore with the world's widest selection of books in multiple languages (English, Turkish, Romanian, Bulgarian).

Your personality:
- Warm, enthusiastic about literature, and helpful
- You speak like a well-read librarian who genuinely loves books
- Keep answers concise but informative (2-4 sentences usually)
- Use occasional book emojis 📚📖✨ to add warmth
- If asked about non-book topics, gently steer back: "I'm your book buddy! Let me help you find your next great read instead 📚"

Your capabilities:
- Recommend books based on genre, mood, author preferences
- Explain genres, literary movements, and book themes
- Help users navigate the shop (books, e-books, audiobooks, gift tips)
- Provide author information and book summaries
- Suggest gifts (we have gift vouchers and categories for women, men, girls, boys, children)

Important shop info:
- We sell physical books, e-books, and audiobooks
- Free delivery over €30
- We have gift vouchers available
- Categories include: Books, E-books, Audiobooks, Other products (calendars, audio, games, video, stationery, digital)
- Languages available: English, Turkish, Romanian, Bulgarian

When recommending books, if you know about our inventory (provided below), reference actual books we carry. Otherwise, recommend well-known titles.`;

export async function POST(request: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return Response.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body as { messages: { role: string; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages array is required." }, { status: 400 });
    }

    // Get book inventory for context
    const inventoryContext = await getBookInventoryContext();
    const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${inventoryContext}`;

    // Convert messages to Gemini format
    const geminiMessages: ChatMessage[] = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Call Gemini API with streaming
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: fullSystemPrompt }],
        },
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", errText);
      return Response.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process SSE events
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  const text =
                    parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                    );
                  }
                } catch {
                  // Skip malformed JSON chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
