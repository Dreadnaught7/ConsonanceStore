import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="shell status-page">
          <p className="eyebrow">ORDER RECEIVED</p>
          <h1>Thank you.</h1>
          <p>Your payment confirmation is being recorded.</p>
        </main>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
