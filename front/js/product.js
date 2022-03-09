// Récupération de l'id via l'URL
let idProduct = new URLSearchParams(location.search).get("id");

// récupération des donnés du produit
function getProduct(idProduct) {
  return fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((reponse) => reponse.json())
    .catch(function (error) {
      alert("Une erreur de chargement est survenue. Nous sommes désolés pour cet incident !");
      let addElement = document.getElementById("title");
      addElement.classList = "error"
      addElement.innerHTML = `<style>
          .error{
          color: #ffffff;
          text-decoration: underline;
          font-weight: bold;
          background: #DE1B1B
        }
        </style>
        <center>Une erreur de chargement est survenue. Nous sommes désolés pour cet incident !</center>`;
    });
}

// implémentation des donnés dans le html
function putData(product) {
  //Title
  document.getElementsByTagName("title")[0].textContent = product.name;

  //Image
  document.getElementsByClassName("item__img")[0].children[0].src =
    product.imageUrl;

  //alt
  document.getElementsByClassName("item__img")[0].children[0].alt =
    product.altTxt;

  //Titre
  document.getElementById("title").textContent = product.name;

  //Prix
  document.getElementById("price").textContent = product.price;

  //Description
  document.getElementById("description").textContent = product.description;

  //option
  option(product);
}

function option(product) {
  let i = 0;
  for (let options of product.colors) {
    let element = document.getElementById("colors");
    let option = document.createElement("option");
    option.text = product.colors[i];
    element.add(option);
    ++i;
  }
}

// Mise en async des fonction + tranformation de la promise.json en objet
async function main() {
  const product = await getProduct(idProduct);
  putData(product);
}

main();
