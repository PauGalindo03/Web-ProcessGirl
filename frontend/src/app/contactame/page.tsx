import { getServerContactos } from "@/lib/serverModels";
import ContactoPage from "@/pages/ContactoPage/ContactoPage";

export default async function Page() {
  const contactos = await getServerContactos();
  return <ContactoPage contactos={contactos} />;
}
