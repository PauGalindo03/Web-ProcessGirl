import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587", 10),
  secure: process.env.EMAIL_PORT === "465", // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Tipado de parámetros de la función
export const sendAccountVerificationEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const frontendUrl =
    process.env.FRONTEND_URL || "http://127.0.0.1:3000/";
  const verificationUrl = `${frontendUrl}/auth/verificacion/correo?token=${token}`;
  const denyRegistrationUrl = `${
    process.env.BACKEND_URL || "http://127.0.0.1:3000"
  }/api/auth/deny-registration/${token}`;

  const mailOptions = {
    from:
      process.env.EMAIL_FROM || `"Process Girl" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verifica tu cuenta en Process Girl",
    text: `¡Hola!\n\nGracias por registrarte en Process Girl. Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nEste enlace expirará en 24 horas.\n\nSi no te registraste, por favor ignora este correo o haz clic aquí para informarnos: ${denyRegistrationUrl}\n\nSaludos,\nEl equipo de Process Girl`,
    html: `
      <div style="background-color: #fff0f7; padding: 24px; border-radius: 16px; font-family: 'Segoe UI', sans-serif; color: #5a004c; max-width: 500px; margin: auto; border: 2px solid #f9d5e5;">
        <h2 style="text-align: center; color: #ef1e9f; margin-bottom: 20px;">✨ ¡Bienvenida a Process Girl! ✨</h2>
        <p style="font-size: 16px;">¡Hola bella!</p>
        <p style="font-size: 16px;">Gracias por unirte a nuestra comunidad. Para completar tu registro, por favor verifica tu dirección de correo electrónico haciendo clic en el botón de abajo:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="${verificationUrl}" style="background-color: #ef1e9f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; display: inline-block;">Verificar mi Correo</a>
        </div>
        <p style="font-size: 15px; color: #655f5f;">Este enlace de verificación expirará en <strong>24 horas</strong>.</p>
        <p style="font-size: 14px; color: #655f5f; word-break: break-all;">Si el botón no funciona, copia y pega el siguiente enlace en tu navegador: ${verificationUrl}</p>
        <p style="font-size: 14px; color: #655f5f;"> Si no solicitaste este registro, puedes <a href="${denyRegistrationUrl}" style="color: #5a004c; text-decoration: underline;">hacer clic aquí para reportarlo</a> o simplemente ignorar este mensaje.</p>
        <p style="margin-top: 30px;">Con cariño,<br><strong>El equipo de Process Girl 💗</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendChangeEmailCode = async (
  to: string,
  token: string
): Promise<void> => {
  const mailOptions = {
    from:
      process.env.EMAIL_FROM || `"Process Girl" <${process.env.EMAIL_USER}>`,
    to, // destinatario es el nuevo email
    subject: "Tu Código de Verificación para Process Girl",
    text: `Hola,\n\nTu código de verificación para cambiar tu email en Process Girl es: ${token}\n\nEste código expirará en 10 minutos.\n\nSi no solicitaste este cambio, por favor ignora este mensaje.\n\nSaludos,\nEl equipo de Process Girl`,
    html: `
      <div style="background-color: #fff0f7; padding: 24px; border-radius: 16px; font-family: 'Segoe UI', sans-serif; color: #5a004c; max-width: 500px; margin: auto; border: 2px solid #f9d5e5;">
        <h2 style="text-align: center; color: #ef1e9f; margin-bottom: 20px;">✨ Verificación Process Girl ✨</h2>
        <p style="font-size: 16px;">Hola bella,</p>
        <p style="font-size: 16px;">Tu código de verificación para actualizar tu correo electrónico es:</p>
        <div style="background-color: #ffe4f1; padding: 12px 20px; font-size: 20px; font-weight: bold; color: #b23f7c; text-align: center; border-radius: 12px; margin: 20px 0;">
          ${token}
        </div>
        <p style="font-size: 15px; color: #655f5f;">Este código estará activo durante los próximos <strong>10 minutos</strong>.</p>
        <p style="font-size: 14px; color: #655f5f;">Si no solicitaste este cambio, puedes ignorar este mensaje con tranquilidad.</p>
        <p style="margin-top: 30px;">Con cariño,<br><strong>El equipo de Process Girl 💗</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendContactEmail = async (
  fromName: string,
  fromEmail: string,
  subject: string,
  message: string
): Promise<void> => {
  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: process.env.EMAIL_USER,
    subject: `Mensaje de Contacto: ${subject}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2>Nuevo Mensaje de Contacto desde Process Girl</h2>
        <p><strong>De:</strong> ${fromName} (${fromEmail})</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}


export default transporter;
