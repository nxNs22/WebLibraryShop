export type PromoRule = {
  code: string;
  type: "percent" | "fixed";
  value: number;
  minSubtotal?: number;
};

export const PROMO_CODES: PromoRule[] = [
  { code: "GIFT10", type: "percent", value: 10 },
  { code: "VOUCHER20", type: "percent", value: 20, minSubtotal: 1000 },
  { code: "WELCOME50", type: "fixed", value: 50, minSubtotal: 300 },
];

export const parsePrice = (value: string | number): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const calculateSubtotal = (items: Array<{ price: string | number; quantity: number }>): number => {
  return items.reduce((total, item) => total + parsePrice(item.price) * Math.max(1, item.quantity), 0);
};

export const getPromoByCode = (code: string): PromoRule | null => {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  return PROMO_CODES.find((promo) => promo.code === normalized) ?? null;
};

export const calculateDiscount = (subtotal: number, promo: PromoRule | null): number => {
  if (!promo || subtotal <= 0) return 0;
  if (promo.minSubtotal && subtotal < promo.minSubtotal) return 0;
  if (promo.type === "percent") return (subtotal * promo.value) / 100;
  return promo.value;
};

