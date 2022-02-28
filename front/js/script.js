// On créer une foction pour executer le code de façon asyncrone
async function productAsync() {
  // on appel l'api et on recupere les donnés
  let reponse = await fetch("http://localhost:3000/api/products/");
  let data = await reponse.json();
  for (let product of data) {
    let element = document.getElementById("items");

    // Créer balise a redirigent vers la page product avec l'id personnaliser du produit
    let childElement = document.createElement("a");
    childElement.href = `./product.html?id=${product._id}`;

    // création de l'aticle avec les élément qui sont rattaché au produit
    childElement.innerHTML = `<article>
    <img src=${product.imageUrl} alt=${product.altTxt}>
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>`;
    
    // on implémente le tout dans le html
    element.appendChild(childElement);
  }
}

// On appel notre fonction
productAsync();
