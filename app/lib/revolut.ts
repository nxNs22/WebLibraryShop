export const getRevolutConfig = () => {
  const secretKey = process.env.REVOLUT_SECRET_KEY;
  const apiVersion = process.env.REVOLUT_API_VERSION ?? "2024-09-01";
  const baseUrl = process.env.REVOLUT_API_BASE_URL ?? "https://sandbox-merchant.revolut.com/api";

  if (!secretKey) {
    throw new Error("Missing REVOLUT_SECRET_KEY.");
  }

  return { secretKey, apiVersion, baseUrl };
};

