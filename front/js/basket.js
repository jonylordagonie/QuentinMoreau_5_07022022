// Création du localstorage en json

function setBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Récupération du localstorage et remise en tableau
function getBasket() {
  basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    basket = JSON.parse(basket);
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
    return basket;
  }
}

// Ajout des articles lors du click sur le bouton.
addToCart.onclick = function (e) {
  let color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;
  quantity = parseInt(quantity);
  let id = new URLSearchParams(location.search).get("id");
  const product = {
    id: id,
    color: color,
    quantity: quantity,
  }
  if (color == "" || quantity <= 0 || quantity > 100) {
    console.log('manque couleur')
    alert("Veuillez sélectionner une couleur et un nombre d'article !");
  } else {
    changeQuantity(product, color, quantity); 
  }
}

// Ajout d'un produit
function addBasket(product) {
  let basket = getBasket();
  basket.push(product);
  setBasket(basket);
}

function changeQuantity(product, color, quantity) {
  let basket = getBasket();
  // Initialisation du panier avec le 1er produit si celui-ci est vide
  console.log(basket);
  if (basket.length == 0) {
    addBasket(product);
  } else {
    // Ont filtre afin de créer un tableau avec tout les id correspondant a l'id du produit
    const porductList = basket.filter((id) => id.id == product.id);
    // dans le nouveau tableau filtrer nous filtrons à nouveau pour savoir si la couleur du produit existe déjà dans le tableau
    const color = porductList.filter((color) => color.color == product.color);
    if (color.length == 0) {
      // Si il n'y as pas de correspondance alors ont rajoute le produit
      addBasket(product);
    } else {
      // Si le produit existe déjà dans le panier avec la couleur demandé ont ajoute la quantité à celle que nous avions précédement
      color[0].quantity += quantity;

      // Si la quantité du produit tombe à 0 ou moins ont le supprime du tableau
      if (color[0].quantity <= 0) {
        basket = basket.filter((p) => p != color[0]);
      }
      // Si le produit dépasse une quantité de 100 ont met la quantité à 100
      if (color[0].quantity > 100) {
        color[0].quantity = 100;
      }
      // ont envoie les information dans le tableau du panier
      setBasket(basket);
    }
  }
}

