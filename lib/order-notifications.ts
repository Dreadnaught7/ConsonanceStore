type OrderNotification = {
  orderId: string;
  bookName: string;
  quantity: number;
  bookSubtotalCents: number;
  shippingAmountCents: number;
  currency: string;
  customerEmail: string;
  fulfillmentStatus: string;
  providerOrderId?: string | null;
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export async function sendOrderNotification(order: OrderNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL || process.env.LULU_CONTACT_EMAIL;
  const from = process.env.ORDER_NOTIFICATION_FROM || "Consonance Orders <orders@consonanceintelligence.com>";

  if (!apiKey || !to) {
    console.warn("[order notification] Email notification not configured.");
    return { sent: false, reason: "NOT_CONFIGURED" as const };
  }

  const totalCents = order.bookSubtotalCents + order.shippingAmountCents;
  const subject = `New Consonance order — ${order.bookName} — Qty ${order.quantity}`;

  const text = [
    "A new Consonance Publishing order has been paid.",
    "",
    `Book: ${order.bookName}`,
    `Quantity: ${order.quantity}`,
    `Book subtotal: ${money(order.bookSubtotalCents, order.currency)}`,
    `Shipping: ${money(order.shippingAmountCents, order.currency)}`,
    `Order total: ${money(totalCents, order.currency)}`,
    `Customer: ${order.customerEmail}`,
    `Order ID: ${order.orderId}`,
    `Fulfillment: ${order.fulfillmentStatus}`,
    order.providerOrderId ? `Lulu order: ${order.providerOrderId}` : "",
  ].filter(Boolean).join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Order notification failed (${response.status}): ${detail.slice(0, 500)}`);
  }

  return { sent: true as const };
}
