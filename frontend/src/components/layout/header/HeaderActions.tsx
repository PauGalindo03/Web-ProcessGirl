"use client";
import styles from "./Header.module.css";

import {CurrencySelector,LoginButton,CartDropdown} from "@/components/layout";

interface Props {
  usuarioLogueado: boolean;
  carritoVisible: boolean;
  setCarritoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderActions({
  usuarioLogueado,
  carritoVisible,
  setCarritoVisible,
}: Props) {
  return (
    <div className={styles.accionesHeader}>
      <CurrencySelector />
      <LoginButton usuarioLogueado={usuarioLogueado} />
      <CartDropdown visible={carritoVisible} setVisible={setCarritoVisible} />
    </div>
  );
}
