// on récupère le panier et ont le convertit en array
let basket = JSON.parse(localStorage.getItem("basket"));
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

if (basket == null) {
  basket = [];
  setBasket(basket);
}

// ont initialise le prix total et le nombre total d'article
let totalPrice = 0;
let totalArticle = 0;


// Si aucun produit dans le localStorage alors on affiche un message
if (basket.length !== 0) {
  // On créé un tableau des Promises (fetch)
  const reqs = Object.values(basket).map((product) => {
    return fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => res.json())
      .then((data) => {
        // gestion prix total
        totalPrice += product.quantity * data.price;
        document.getElementById("totalPrice").textContent = totalPrice;

        // gestion quantité totale
        totalArticle += product.quantity;
        document.getElementById("totalQuantity").textContent = totalArticle;

        let el = document.getElementById("cart__items");
        let childEl = document.createElement("article");
        childEl.className = "cart__item";
        childEl.dataset.id = `${product.id}`;
        childEl.dataset.color = `${product.color}`;

        // création code HTML
        childEl.innerHTML = `
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${product.color}</p>
              <p>${data.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        `;

        // on ajoute le tout dans l'html
        el.appendChild(childEl);
      });
  });
  // Promesse qui est résolé loreque l'ensemble des promesses dans reqs sont résolues
  Promise.all(reqs).then(() => initEvents());
} else {
  document.getElementById("cart__items").innerHTML = `<style>
      h3{
        color: #DE1B1B;
        text-decoration: underline;
      }
     </style>
    <h3> <center>Votre panier est vide.</center></h3> `;
}


function setBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
  location.reload();
}

// récupère tous les boutons et ajoute la gestion d'évènement
function initEvents() {
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
  let article = event.target.closest("article");
  let deleteId = article.dataset.id;
  let color = article.dataset.color;
  const productList = basket.filter((product) => product.id == deleteId);
  const prodToDelete = productList.filter((product) => product.color == color);
  // basket vaut à présent la liste des produits du localStorage sans le produit "prodToDelete[0]"
  basket = basket.filter((p) => p != prodToDelete[0]);
  setBasket(basket);
}

//fonction modification quantité
function changeQty(event) {
  let article = event.target.closest("article");
  let selectedId = article.dataset.id;
  let color = article.dataset.color;
  const productList = basket.filter((product) => product.id == selectedId);
  const selectedProd = productList.filter((product) => product.color == color);
  // on modifie l'attribut quantité du produit
  selectedProd[0].quantity = parseInt(event.target.value);
  setBasket(basket);
}

function getBasket() {
  basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    basket = JSON.parse(basket);
    return basket;
  }
}