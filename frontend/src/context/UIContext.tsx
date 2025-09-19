"use client";
import { createContext, useContext, useState, useEffect } from "react";

import type { Dispatch, SetStateAction } from "react";

interface UIContextType {
  menuVisible: boolean;
  carritoVisible: boolean;
  isMobile: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  setCarritoVisible: Dispatch<SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UIContext.Provider
      value={{
        menuVisible,
        carritoVisible,
        isMobile,
        setMenuVisible,
        setCarritoVisible,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}

/*
-----------------------------
USO
-----------------------------

import { useUI } from "@/context/UIContext";

export default function Header() {
  const { isMobile, menuVisible, setMenuVisible } = useUI();

  return (
    <header>
      {isMobile ? <p>Vista Mobile</p> : <p>Vista Desktop</p>}
      <button onClick={() => setMenuVisible(!menuVisible)}>Toggle menú</button>
    </header>
  );
}

*/
