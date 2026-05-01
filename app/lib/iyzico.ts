export const getIyzicoClient = () => {
  // Load iyzipay at runtime on server to avoid Turbopack static resolution issues.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Iyzipay = require("iyzipay");
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL ?? "https://sandbox-api.iyzipay.com";

  if (!apiKey || !secretKey) {
    throw new Error("Missing IYZICO_API_KEY or IYZICO_SECRET_KEY.");
  }

  return new Iyzipay({
    apiKey,
    secretKey,
    uri: baseUrl,
  });
};

type IyzicoResponse = {
  status?: string;
  errorMessage?: string;
  paymentPageUrl?: string;
  token?: string;
  [key: string]: unknown;
};

export const initializeCheckoutForm = async (
  payload: Record<string, unknown>,
): Promise<IyzicoResponse> => {
  const client = getIyzicoClient();
  return await new Promise((resolve, reject) => {
    client.checkoutFormInitialize.create(payload, (_err: unknown, result: IyzicoResponse) => {
      if (!result) {
        reject(new Error("Empty response from iyzico."));
        return;
      }
      resolve(result);
    });
  });
};

export const retrieveCheckoutForm = async (token: string): Promise<IyzicoResponse> => {
  const client = getIyzicoClient();
  return await new Promise((resolve, reject) => {
    client.checkoutForm.retrieve({ locale: "tr", token }, (_err: unknown, result: IyzicoResponse) => {
      if (!result) {
        reject(new Error("Empty retrieve response from iyzico."));
        return;
      }
      resolve(result);
    });
  });
};
