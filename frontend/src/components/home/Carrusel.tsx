interface Carrusel {
  data: {
    titulo: string;
    subtitulo: string;
    img: string;
  };
}

export default function Hero({ data }: Carrusel) {
  return (
    <section id="sistemas-destacados-section">
      {data.length > 0 ? (
        <div className="carousel">
          {data.map((item) => {
            const imageUrl = item.imagenes.find((img) =>
              img.toLowerCase().includes("limitado")
            );
            if (!imageUrl) return null;
            return (
              <div key={item.sku} className="slide">
                <div className="slide-image-wrapper">
                  <img
                    src={imageUrl}
                    alt={item.titulo}
                    width={400} // Ajusta el ancho según tu diseño
                    height={300} // Ajusta el alto según tu diseño
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="info">
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                  <a
                    href={`/pages/subpaginas/pag-prod?id=${item.sku}`}
                    className="btn-cta"
                  >
                    Lo quiero
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay ediciones limitadas disponibles.</p>
      )}
    </section>
  );
}
