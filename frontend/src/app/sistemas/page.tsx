'use client';
import React, { useMemo, useState } from 'react';

import type { Categoria, ProductoDigital } from '@types';

import styles from './page.module.css';

import {
  PackagesMagazine,
  FiltersBar,
  CollectionSection,
} from '@/components/catalogo';
import { useCachedConfiguracion } from '@/hooks/cached/useCachedConfiguracion';
import { useCachedPaquetesPD } from '@/hooks/cached/useCachedPaquetesPD';
import { useCachedProductosDigitales } from '@/hooks/cached/useCachedProductosDigitales';
import { useCarrito } from '@/hooks/useCarrito';

export default function SistemasPage() {
  const { productos, loading, error } = useCachedProductosDigitales();
  const { paquetes } = useCachedPaquetesPD();
  const config = useCachedConfiguracion();
  const carrito = useCarrito();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ✅ Construir lista de categorías
  const categories = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => {
      (p.categoria ?? []).forEach((c) => set.add(c.nombre));
    });
    set.add('Edición limitada');
    set.add('Gratis');
    return Array.from(set);
  }, [productos]);

  // ✅ Agrupar productos por categoría
  const grouped = useMemo(() => {
    const map = new Map<string, ProductoDigital[]>();
    categories.forEach((c) => map.set(c, []));

    productos.forEach((p) => {
      const isLimited = p.esEdicionLimitada;
      const isFree = (p.precioFinal ?? 0) <= 0;
      const cats = (p.categoria ?? []).map(
        (c: Categoria) => c.nombre ?? String(c)
      );

      if (isLimited) map.get('Edición limitada')?.push(p);
      else if (isFree) map.get('Gratis')?.push(p);

      if (cats.length === 0) {
        if (!map.has('Otros')) map.set('Otros', []);
        map.get('Otros')?.push(p);
      } else {
        cats.forEach((name: string) => {
          if (!map.has(name)) map.set(name, []);
          map.get(name)?.push(p);
        });
      }
    });

    return map;
  }, [productos, categories]);

  // ✅ Productos visibles según categoría seleccionada
  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return productos;
    return grouped.get(selectedCategory) ?? [];
  }, [selectedCategory, productos, grouped]);

  // ✅ Función "Lo quiero"
  const onWant = (p: ProductoDigital) => {
    carrito.addItem(p);
    alert(`Agregado: ${p.titulo}`);
  };

  return (
    <section className={styles.page}>
      {config.ofertas?.[0] && (
        <section className={styles.featured}>
          <div className={styles.featuredText}>
            <h2>{config.ofertas[0].titulo}</h2>
            <p>{config.ofertas[0].descripcion}</p>
          </div>
          <div>
            <button
              className={styles.featuredButton}
              onClick={() =>
                (window.location.href =
                  config.ofertas?.[0].linkOfertas ?? '#')
              }
            >
              {config.ofertas[0].cta || 'Ver oferta'}
            </button>
          </div>
        </section>
      )}

      {paquetes && <PackagesMagazine paquetes={paquetes} />}

      <div className={styles.filters}>
        <FiltersBar
          categories={categories} // ✅ ahora es string[]
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <section>
        {loading && (
          <div className={styles.loading}>Cargando productos...</div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        <CollectionSection
          title={selectedCategory ?? 'Todos los sistemas'}
          productos={visibleProducts}
          onWant={onWant}
        />
      </section>
    </section>
  );
}