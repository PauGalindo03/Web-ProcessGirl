import Link from "next/link";

type Pagina = { key: string; nombre: string; ruta: string };

export default function NavLinks({ paginas }: { paginas: Pagina[] }) {
  return (
    <ul>
      {paginas.map(p => (
        <li key={p.key}>
          <Link href={p.ruta}>{p.nombre}</Link>
        </li>
      ))}
    </ul>
  );
}
