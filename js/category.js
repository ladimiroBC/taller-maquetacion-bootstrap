document.addEventListener("DOMContentLoaded", () => {
  // Obtener parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category"); // Captura la categoría de la URL

  // Validar si hay una categoría seleccionada
  if (!selectedCategory) {
    console.error("No se encontró la categoría en la URL.");
    document.querySelector(".products-container").innerHTML =
      "<p class='text-center'>Por favor, selecciona una categoría.</p>";
    return;
  }
  // Mapeo de nombres de categorías
  const categoryNameMap = {
    construction_plumbing: "Construcción y Plomería",
    floors_painting: "Pisos y Pinturas",
    tools: "Herramientas",
    bathrooms_kitchens: "Baños y Cocinas"
  };

  // Obtener nombre de la categoría
  const categoryTitle = categoryNameMap[selectedCategory] || "Categoría no encontrada";

  // Actualizar breadcrumb con la categoría seleccionada
  const breadcrumbCategory = document.querySelector(
    ".breadcrumb a[data-category]"
  );
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = categoryTitle;
    breadcrumbCategory.href = `categories.html?category=${selectedCategory}`;
    breadcrumbCategory.setAttribute("data-category", selectedCategory);
  }

  // Actualizar el nombre de la categoría y los resultados
  const categoryNameElement = document.querySelector("#category-name");
  const resultCountElement = document.querySelector("#result-count");

  if (categoryNameElement) {
    categoryNameElement.textContent = `${categoryTitle}`;
  }

  // Cargar productos desde el archivo JSON
  fetch("/data/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar los datos");
      return response.json();
    })
    .then((data) => {
      const products = data[selectedCategory] || [];

      if (resultCountElement) {
        resultCountElement.textContent = `Resultados: ${products.length}`;
      }

      renderProducts(document.querySelector(".products-container"), products);
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
});

// Renderizar los productos en el contenedor
function renderProducts(container, products) {
  container.innerHTML = ""; // Limpiar productos actuales

  if (!products.length) {
    container.innerHTML = "<p>No hay productos disponibles para esta categoría.</p>";
    return;
  }

  products.forEach((product) => {
    const productHTML = `
      <section class="row border-bottom mt-2">
        <div class="col-4">
          <img src="${product.image}" class="img-fluid" alt="${product.mark}">
        </div>
        <div class="col-8 align-content-center">
          <span class="d-block">${product.mark}</span>
          <span class="d-block">${product.description}</span>
          <span class="d-block">${product.price}</span>
        </div>
      </section>
    `;
    container.insertAdjacentHTML("beforeend", productHTML);
  });
}
