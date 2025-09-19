'use client';
import styles from '@/app/auth/AuthLayout.module.css'
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <section>
      <h1 className={styles.titulo}>Crear cuenta</h1>
      <RegisterForm />
    </section>
  );
}
