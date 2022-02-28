// ont récupère le panier et ont le convertit en array
let basket = localStorage.getItem("basket");
basket = JSON.parse(basket);



// ont initialise le prix total et le nombre total d'article
let totalPrice = 0;
let totalArticle = 0;

// Ont créer une boucle pour afficher tout les arrticle de notre panier
for (let product of basket) {
  let productID = product.id;

  // ont récuprère les information de notre API pour chaque article
  fetch(`http://localhost:3000/api/products/${productID}`)
    .then((response) => response.json())
    .then((data) => {
      totalPrice = totalPrice + product.quantity * data.price;

      // ont multiplie le prix de l'article par sa quantité qu'on ajoute au prix total
      document.getElementById("totalPrice").textContent = totalPrice;

      // ont ajoute la quantité d'article ajoute au nombre d'article total
      totalArticle = totalArticle + product.quantity;
      document.getElementById("totalQuantity").textContent = totalArticle;

      //Ont ajoute un élément article avec sa classe et les datas (pour chaque article)
      let element = document.getElementById("cart__items");
      let childElement = document.createElement("article");
      childElement.className = "cart__item";
      childElement.dataset.id = `${product.id}`;
      childElement.dataset.color = `${product.color}`;

      //Ont insère du code HTML dans notre article créer précédement en utilisant les information de notre array et les information de notre API
      childElement.innerHTML = `<div class="cart__item__img">
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
   </div>`;
      
  // on implémente le tout dans le html
  element.appendChild(childElement);
  });
}