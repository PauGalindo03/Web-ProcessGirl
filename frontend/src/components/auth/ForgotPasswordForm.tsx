import { useState } from "react";

import { resendVerificationEmail } from "@/services/authService";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resendVerificationEmail(email);
      setSent(true);
    } catch (err) {
      console.error("Error al enviar recuperación", err);
    }
  };

  return (
    <form onSubmit={handleSend}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required />
      <button type="submit">Enviar recuperación</button>
      {sent && <p>Correo enviado. Revisa tu bandeja.</p>}
    </form>
  );
}
