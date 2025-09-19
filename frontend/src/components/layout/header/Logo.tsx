"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";

interface Props {
  smallLogoUrl: string;
  logoUrl: string;
  isMobile: boolean;
}

export default function Logo({ smallLogoUrl, logoUrl, isMobile }: Props) {
  const src = isMobile
    ? smallLogoUrl || "/img/logo_chico.png"
    : logoUrl || "/img/process_girl.png";

  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <Image
          src={src}
          alt="Logo"
          width={isMobile ? 200 : 130 }
          height={isMobile ? 45 : 60 }
          priority
        />
      </Link>
    </div>
  );
}
