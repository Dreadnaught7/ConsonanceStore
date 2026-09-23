"use client";

import { FormEvent, useState } from "react";

type QuoteOption = {
  id: string;
  level: string;
  label: string;
  amountCents: number;
  currency: string;
  minDeliveryDate?: string;
  maxDeliveryDate?: string;
};

const blankAddress = {
  name: "",
  email: "",
  phone: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  postcode: "",
  country: "US",
};

export default function BuyForm({ slug, priceCents }: { slug: string; priceCents: number }) {
  const [address, setAddress] = useState(blankAddress);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<QuoteOption[]>([]);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  function update(name: keyof typeof address, value: string) {
    setAddress((current) => ({ ...current, [name]: value }));
    setOptions([]);
    setSelected("");
  }

  async function quote(event: FormEvent) {
    event.preventDefault();
    setWorking(true);
    setMessage("");
    try {
      const response = await fetch("/store/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, quantity, address }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Shipping quote failed.");
      setOptions(data.options || []);
      setSelected(data.options?.[0]?.level || "");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Shipping quote failed.");
    } finally {
      setWorking(false);
    }
  }

  async function checkout() {
    if (!selected) return;
    setWorking(true);
    setMessage("");
    try {
      const response = await fetch("/store/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, quantity, address, shippingLevel: selected }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not be created.");
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout could not be created.");
      setWorking(false);
    }
  }

  return (
    <form className="buy-form" onSubmit={quote}>
      <div className="form-heading">
        <h2>Buy direct</h2>
        <p>Book price: {"$" + (priceCents / 100).toFixed(2)} plus shipping.</p>
      </div>

      <div className="field-grid">
        <label>Full name<input required value={address.name} onChange={(e) => update("name", e.target.value)} /></label>
        <label>Email<input required type="email" value={address.email} onChange={(e) => update("email", e.target.value)} /></label>
        <label>Phone<input required value={address.phone} onChange={(e) => update("phone", e.target.value)} /></label>
        <label>Address<input required value={address.street1} onChange={(e) => update("street1", e.target.value)} /></label>
        <label>Address 2<input value={address.street2} onChange={(e) => update("street2", e.target.value)} /></label>
        <label>City<input required value={address.city} onChange={(e) => update("city", e.target.value)} /></label>
        <label>State / region<input required={address.country === "US"} value={address.state} onChange={(e) => update("state", e.target.value)} /></label>
        <label>Postal code<input required value={address.postcode} onChange={(e) => update("postcode", e.target.value)} /></label>
        <label>Country code<input required maxLength={2} value={address.country} onChange={(e) => update("country", e.target.value.toUpperCase())} /></label>
        <label>Quantity<input required type="number" min={1} max={20} value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)); setOptions([]); setSelected(""); }} /></label>
      </div>

      <button className="button" disabled={working} type="submit">
        {working && !options.length ? "Checking…" : "Get shipping"}
      </button>

      {options.length > 0 ? (
        <div className="shipping-options">
          <h3>Shipping</h3>
          {options.map((option) => (
            <label className="shipping-option" key={option.id}>
              <input type="radio" name="shipping" value={option.level} checked={selected === option.level} onChange={() => setSelected(option.level)} />
              <span>{option.label}</span>
              <strong>{"$" + (option.amountCents / 100).toFixed(2)}</strong>
            </label>
          ))}
          <button type="button" className="button primary" disabled={working || !selected} onClick={checkout}>
            {working ? "Opening checkout…" : "Continue to secure checkout"}
          </button>
        </div>
      ) : null}

      {message ? <p className="form-error" role="alert">{message}</p> : null}
    </form>
  );
}
