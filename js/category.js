// Archivo: category.js

document.addEventListener("DOMContentLoaded", () => {
  const selectedCategory = localStorage.getItem("selectedCategory");

  if (!selectedCategory) {
    console.error("No se encontró la categoría seleccionada.");
    return;
  }

  const categoryNameMap = {
    "construction-plumbing": "Construcción y Plomeria",
    "floor-paints": "Pisos y Pinturas",
    "tools": "Herramientas",
    "bathroom-kitchens": "Baños y Cocina"
  };

  const categoryTitle = categoryNameMap[selectedCategory] || "Categoría no encontrada";
  const breadcrumbCategory = document.querySelector("a[data-category]");
  const productsContainer = document.querySelector('.products-container');

  // Actualizar el breadcrumb con el nombre de la categoría seleccionada
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = categoryTitle;
    breadcrumbCategory.href = `categorys.html?category=${selectedCategory}`;
  }

  // Cargar productos desde el archivo JSON
  fetch("../data/products.json")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar los datos");
      return response.json();
    })
    .then(data => {
      const products = data[selectedCategory] || [];
      renderProducts(productsContainer, products);
    })
    .catch(error => {
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

  products.forEach(product => {
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
