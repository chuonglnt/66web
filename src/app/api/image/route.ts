import { initAdmin } from "@/lib/firebase/firebase-admin.config";
import { getLogoFromStorage } from "@/lib/firebase/firebase";

export async function GET(request: Request) {
  await initAdmin();
  const imageUrl = await getLogoFromStorage();
  const response = await fetch(imageUrl);
  return new Response(response.body, { headers: response.headers });
}
