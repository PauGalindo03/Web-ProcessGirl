'use client';
import styles from '@/app/auth/AuthLayout.module.css'
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <section>
      <h1 className={styles.titulo}>Iniciar sesión</h1>
      <LoginForm />
    </section>
  );
}
