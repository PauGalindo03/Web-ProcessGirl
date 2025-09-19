"use client";
import { useState, useEffect } from "react";

import styles from "./Header.module.css";
import {MenuHamburguesa,Logo,HeaderActions} from "./index";

import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { useCachedConfiguracion } from "@/hooks/cached/useCachedConfiguracion";

export default function Header() {
  const { menuVisible, setMenuVisible, carritoVisible, setCarritoVisible } = useUI();
  const config = useCachedConfiguracion();
  const { usuarioLogueado } = useAuth();
  const [isMobile, setIsMobile] = useState(false
  );

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!config || !config.paginasActivas) return null;

  return (
    <header className={styles.menuContainer}>
      <button
        className={styles.abrirMenu}
        title="Abrir"
        onClick={() => setMenuVisible(true)}
      >
        <div className={styles.waveOnHover}>
          <span>•</span>
          <span>♡</span>
          <span>•</span>
        </div>
      </button>

      <Logo smallLogoUrl={config.smallLogoUrl} logoUrl={config.logoUrl} isMobile={isMobile} />
      <MenuHamburguesa visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <HeaderActions
        usuarioLogueado={usuarioLogueado}
        carritoVisible={carritoVisible}
        setCarritoVisible={setCarritoVisible}
      />
    </header>
  );
}