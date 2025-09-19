"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./MenuHamburguesa.module.css";

import {AnimatedIcon} from "@/components/common";
import { useCachedConfiguracion } from "@/hooks/cached/useCachedConfiguracion";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ visible, onClose }: Props) {
    const config = useCachedConfiguracion();
    if (!config) return null;
    const menuItems = config.paginasActivas?.filter((p) => p.activo) ?? [];

  return (
    <nav className={`${styles.nav} ${visible ? styles.navVisible : ""}`}>
      {visible && (
        <button
          className={styles.cerrarMenu}
          title="Cerrar"
          onClick={onClose}
        >
          <AnimatedIcon
            icon="bi bi-x-circle"
            color="rosa"
            animation="pulseOnHover"
          />
        </button>
      )}

      <div className={styles.logoMobile}>
        <Link href="/">
          <Image
            src={
              config.logoUrl ||
              config.smallLogoUrl ||
              "/img/process_girl.png"
            }
            alt="Logo"
            width={275}
            height={55}
            priority
          />
        </Link>
      </div>

      <ul className={styles.navLinks}>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link href={item.ruta}>{item.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
