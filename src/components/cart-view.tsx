"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useLang } from "@/components/lang-context";
import { formatPrice } from "@/lib/format";
import { cartItemName } from "@/lib/localize";

/** Construit le lien WhatsApp (wa.me) avec le détail de la commande. */
export function buildWhatsAppUrl(
  whatsapp: string,
  shopName: string,
  lines: { name: string; qty: number; price: number }[],
  total: number,
  customer: { name: string; address: string },
  labels: { greeting: string; total: string; name: string; address: string; payment: string }
): string {
  const parts: string[] = [labels.greeting];
  parts.push("");
  for (const l of lines) {
    parts.push(`- ${l.name} × ${l.qty} = ${formatPrice(l.price * l.qty)}`);
  }
  parts.push("");
  parts.push(`${labels.total}: ${formatPrice(total)}`);
  if (customer.name) parts.push(`${labels.name}: ${customer.name}`);
  if (customer.address) parts.push(`${labels.address}: ${customer.address}`);
  parts.push(labels.payment);
  const text = parts.join("\n").replace("{shop}", shopName);
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

export function CartView({ whatsapp, shopName }: { whatsapp: string; shopName: string }) {
  const { items, total, setQty, removeItem, clear } = useCart();
  const { lang, t } = useLang();
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const orderUrl = buildWhatsAppUrl(
    whatsapp,
    shopName,
    items.map((i) => ({ name: cartItemName(i, lang), qty: i.qty, price: i.price })),
    total,
    { name: customerName.trim(), address: customerAddress.trim() },
    {
      greeting: t("waGreeting", { shop: shopName }),
      total: t("waTotal"),
      name: t("waName"),
      address: t("waAddress"),
      payment: t("waPayment"),
    }
  );

  return (
    <div className="mx-auto max-w-[1326px] px-4 mt-6">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#e31e25]">{t("home")}</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-800 font-semibold">{t("cartTitle")}</span>
      </nav>

      <h1 className="font-extrabold text-xl text-gray-900 border-t-2 border-black pt-3 mb-6">
        {t("cartTitle")}
        <span className="block h-[3px] w-12 bg-[#e31e25] mt-1" />
      </h1>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-10 text-center">
          <div className="text-5xl mb-3">🛒</div>
          <p className="text-gray-500">{t("cartEmpty")}</p>
          <Link
            href="/"
            className="inline-block mt-6 bg-[#e31e25] text-white font-bold px-8 py-3 hover:bg-[#c21920] transition-colors"
          >
            {t("discover")}
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 p-4 flex gap-4 items-center anim-up">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={cartItemName(item, lang)} className="w-20 h-20 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/produit/${item.slug}`}
                    className="text-sm font-semibold text-gray-800 hover:text-[#e31e25] line-clamp-2"
                  >
                    {cartItemName(item, lang)}
                  </Link>
                  <div className="text-[#e31e25] font-bold mt-1" dir="ltr">{formatPrice(item.price)}</div>
                </div>
                <div className="flex items-center border border-gray-300">
                  <button onClick={() => setQty(item.id, item.qty - 1)} className="w-8 h-8 hover:bg-gray-100 font-bold">
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1)} className="w-8 h-8 hover:bg-gray-100 font-bold">
                    +
                  </button>
                </div>
                <div className="w-28 text-end font-bold text-gray-900 hidden sm:block" dir="ltr">
                  {formatPrice(item.price * item.qty)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-[#e31e25] text-lg"
                  aria-label={t("removeAria")}
                >
                  ✕
                </button>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-gray-500 hover:text-[#e31e25] underline">
              {t("clearCart")}
            </button>
          </div>

          <div className="bg-white border border-gray-200 p-6 h-fit">
            <h2 className="font-bold text-gray-900 uppercase text-sm tracking-wide mb-4">{t("summary")}</h2>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">{t("subtotal")}</span>
              <span className="font-semibold" dir="ltr">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-100">
              <span className="text-gray-500">{t("deliveryLabel")}</span>
              <span className="font-semibold text-green-600">{t("free")}</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-extrabold">
              <span>{t("total")}</span>
              <span className="text-[#e31e25]" dir="ltr">{formatPrice(total)}</span>
            </div>

            <div className="space-y-2 mb-4">
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t("customerName")}
                className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#25d366]"
              />
              <input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder={t("customerAddress")}
                className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#25d366]"
              />
            </div>

            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-white font-bold py-3 hover:bg-[#1ebe5a] transition-colors"
            >
              <span aria-hidden="true">💬</span> {t("orderWhatsapp")}
            </a>
            <p className="text-[11px] text-gray-500 mt-3 text-center">{t("whatsappNote")}</p>
            <p className="text-[11px] text-gray-400 mt-1 text-center">{t("cashNote")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
