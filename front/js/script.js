async function getProducts(){
  return fetch(`http://localhost:3000/api/products`)
    .then(res => res.json())
    .then(data => data)
    .catch(function (err) {
      console.log('erreur')
        let addElement = document.getElementById("items");
      addElement.innerHTML = `<style>
          .error{
          color: #ffffff;
          text-decoration: underline;
          font-weight: bold;
          background: #DE1B1B
        }
        </style>
        <h2 class="error"> <center>Une erreur de chargement est survenue. Nous sommes désolés pour cet incident !</center></h3>`;
    });
} 

// On créer une foction pour executer le code de façon asyncrone
const displayProducts = (allProducts) => {
  // on appel l'api et on recupere les donnés
  for (let product of allProducts) {
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

const main = async () => {
  const allProducts = await getProducts();
  displayProducts(allProducts);
};

// On appel notre fonction
main();
