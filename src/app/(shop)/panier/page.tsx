import { CartView } from "@/components/cart-view";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const settings = await getSettings();
  return <CartView whatsapp={settings.whatsapp} shopName={settings.shopName} />;
}
