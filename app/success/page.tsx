import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="shell status-page">
      <p className="eyebrow">ORDER RECEIVED</p>
      <h1>Thank you.</h1>
      <p>Your payment confirmation is being recorded. We will use the shipping details from your order to fulfill the book.</p>
      <Link href="/" className="button">Return to the store</Link>
    </main>
  );
}
