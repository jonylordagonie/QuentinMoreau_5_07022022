let idProduct = new URLSearchParams(location.search).get("orderId");
let orderID = document.getElementById("orderId");
orderID.textContent = idProduct;
function removeBasket() {
  basket = [];
  localStorage.setItem("basket", JSON.stringify(basket));
}
removeBasket();