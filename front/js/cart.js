// on récupère le panier et ont le convertit en array
let basket = JSON.parse(localStorage.getItem("basket"));

// On tri le panier en fonction de l'id des article
async function tri() {
  basket.sort((a, b) => {
    let fa = a.id.toLowerCase();
    let fb = b.id.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
}

// si le panier n'as rien on l'initialise
if (basket == null) {
  basket = [];
  setBasket(basket);
}

// si le panier est vide on l'affiche au client
if (basket.length == 0) {
  document.getElementById("cart__items").innerHTML = `<style>
      h3{
        color: #DE1B1B;
        text-decoration: underline;
      }
     </style>
    <h3> <center>Votre panier est vide.</center></h3> `;
}

// Fonction permettant de sauvegarder le localstorage
function setBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
  // on reload la page pour qu'a chaque fois que le local storage change l'affichage soit le bon
  location.reload();
}

// récupère tous les boutons et ajoute la gestion d'évènement
async function initEvents() {
  //---- Gestion bouton Supprimer -----//
  let deleteBtns = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", (event) => {
      deleteProduct(event);
    });
  }
  //---- Gestion input Quantité ----//
  let inputs = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", (event) => {
      changeQty(event);
    });
  }
}

// fonction de suppression d'un produit
function deleteProduct(event) {
  // on récupère l'article parent de la ou on clique
  let article = event.target.closest("article");
  // on récupère l'id via le dataset
  let deleteId = article.dataset.id;
  // on récupère la couleur via le dataset
  let color = article.dataset.color;
  // on créer une constant qui corespond à un tableau des id correspondante à l'id de notre article
  const productList = basket.filter((product) => product.id == deleteId);
  // dans le nouveau tableau on récupère uniquement celui qui à la couleur de notre article
  const prodToDelete = productList.filter((product) => product.color == color);
  // basket vaut à présent la liste des produits du localStorage sans le produit "prodToDelete[0]"
  basket = basket.filter((p) => p != prodToDelete[0]);
  // on appel la fonction de sauvegarde de notre panier
  setBasket(basket);
}

//fonction modification quantité
function changeQty(event) {
  let article = event.target.closest("article");
  let selectedId = article.dataset.id;
  let color = article.dataset.color;
  const productList = basket.filter((product) => product.id == selectedId);
  const selectedProd = productList.filter((product) => product.color == color);
  if (event.target.value >= 100 || event.target.value <= 0) {
    alert(
      "Veuillez sélectionner un nombre correcte d'article !"
    );
    event.target.value = selectedProd[0].quantity;
  } else {
    // on modifie l'attribut quantité du produit
    selectedProd[0].quantity = parseInt(event.target.value);
    setBasket(basket);
  }
}

// fonction permettant de récupérer les information de l'API
async function getProducts() {
  return fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (err) {
      window.alert(
        "Une erreur de chargement est survenue. Nous sommes désolés pour cet incident !"
      );
      document.getElementById("cart__items").innerHTML = `<style>
        .error{
          color: #ffffff;
          text-decoration: underline;
          font-weight: bold;
          background: #DE1B1B;
        }
        </style>
        <h2 class="error"><center>Une erreur de chargement est survenue. Nous sommes désolés pour cet incident !</center></h2> `;
    });
}

// Fonction qui va attendre les information de l'API puis vas filtrer pour récuprer uniquement celles des article qu'on veux
async function displayAllProducts() {
  // Ont créer une constante qui récupère les information de l'API
  const products = await getProducts();
  // On créer une boucle dans le panier
  for (let productToDisplay of basket) {
    // ont créer une constante qui permet de filtrer et de prendre les info qui concerne uniquement le produit que nous avons dans le panier
    const product = products.filter((p) => p._id === productToDisplay.id);
    //On appel la fonction displayProduct avec les paramètre
    displayProducts(product[0], productToDisplay);
  }
  return;
}

function totalArticle() {
  let totalArticle = 0;
  for (let article of basket) {
    totalArticle += article.quantity;
  }
  document.getElementById("totalQuantity").textContent = totalArticle;
}

async function totalPrice() {
  const products = await getProducts();
  let totalPrice = 0;
  for (let article of basket) {
    const product = products.filter((p) => p._id === article.id);
    totalPrice += article.quantity * product[0].price;
  }
  document.getElementById("totalPrice").textContent = totalPrice;
}

const displayProducts = (products, productToDisplay) => {
  let el = document.getElementById("cart__items");
  let childEl = document.createElement("article");
  childEl.className = "cart__item";
  childEl.dataset.id = `${productToDisplay.id}`;
  childEl.dataset.color = `${productToDisplay.color}`;

  // création code HTML
  childEl.innerHTML = `
          <div class="cart__item__img">
            <img src="${products.imageUrl}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${products.name}</h2>
              <p>${productToDisplay.color}</p>
              <p>${products.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productToDisplay.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

  // on ajoute le tout dans l'html
  el.appendChild(childEl);
};

// On appel notre fonction
async function main() {
  await tri();
  await displayAllProducts();
  totalArticle();
  totalPrice();
  await initEvents();
}

main();
