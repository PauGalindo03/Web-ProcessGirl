"use client";
import Link from "next/link";

import {AnimatedIcon} from "@/components/common";

interface Props {
  usuarioLogueado: boolean;
}

export default function LoginButton({ usuarioLogueado }: Props) {
  return (
    <Link
      href={usuarioLogueado ? "/panel/usuario/panel_usuario" : "/auth/login"}
      title={usuarioLogueado ? "Mi Cuenta" : "Iniciar Sesión"}
    >
      <AnimatedIcon
        icon={
          usuarioLogueado ? "bi bi-person-heart" : "bi bi-person-circle"
        }
        color="azul"
        animation="pulseOnHover"
      />
    </Link>
  );
}
