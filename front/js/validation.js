let form = document.querySelector(".cart__order__form");
let errorDetection = false;


// Récupération de ton les IDs du panier
const allId = [];
for (let i of basket) {
  allId.push(i.id);
}

// Constante des information contact (qui vont se remplir au moment du onclick sur le panier)
const contact = { 
};

// Constante des information à envoyer à l'API
const sendData = {
  products: allId,
  contact: contact,
};

// Fonction permettant d'envoyer les informations à l'API
function post() {
  const headers = new Headers();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  })
    .then((res) => res.json())
    .then((data) => {
      location.href = `./confirmation.html?orderId=${data.orderId}`;
    });
}

order.onclick = function (event) {
  validFirstName(form.firstName);
  validLastName(form.lastName);
  validAddress(form.address);
  validCity(form.city);
  validEmail(form.email);
  // test si une erreur à été detecter dans les différent champs de saisi
  if (errorDetection) {
    // Si il y as une erreur on desactive l'effet du boutton
    event.preventDefault();
  } else {
    post();
  }
  // On reset le detecteur d'erreur pour une nouvelle saisie
  errorDetection = false;
};

// Fonction validation prénom
const validFirstName = function (inputFirstName) {
  //Création regex prénom
  let firstNameRegex = RegExp("^[a-zA-Z-]{3,30}$", "g");
  let testFirstName = firstNameRegex.test(inputFirstName.value);
  let msg = document.getElementById("firstNameErrorMsg");
  if (testFirstName) {
    msg.innerHTML = "";
    contact.firstName = form.firstName.value;
  } else {
    msg.innerHTML = "Veuillez saisir un prénom correcte (pas de nombre)";
    errorDetection = true;
  }
};

// Fonction validation nom
const validLastName = function (inputLastName) {
  //Création regex nom
  let lastNameRegex = RegExp("^[a-zA-Z- ]{3,30}$", "g");
  let testLastName = lastNameRegex.test(inputLastName.value);
  let msg = document.getElementById("lastNameErrorMsg");
  if (testLastName) {
    msg.innerHTML = "";
    contact.lastName = form.lastName.value;
  } else {
    msg.innerHTML = "Veuillez saisir un nom correcte (pas de nombre)";
    errorDetection = true;
  }
};

// Fonction validation adresse
const validAddress = function (inputAddress) {
  //Création regex adresse
  let addressRegex = RegExp(
    "^[0-9]{1,3}[,]{1}[ ]{1}[a-zA-z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let addressRegex2 = RegExp(
    "^[0-9]{1,3}[ ]{1}[a-zA-z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let addressRegex3 = RegExp(
    "^[0-9]{1,3}[ ]{1}(bis){1}[,]{1}[ ]{1}[a-zA-Z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let addressRegex4 = RegExp(
    "^[0-9]{1,3}[ ]{1}(bis){1}[ ]{1}[a-zA-Z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let addressRegex5 = RegExp(
    "^[0-9]{1,3}[ ]{1}(ter){1}[ ]{1}[a-zA-Z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let addressRegex6 = RegExp(
    "^[0-9]{1,3}[ ]{1}(ter){1}[,]{1}[ ]{1}[a-zA-Z-]{3,11}[ ]{1}[a-zA-Z- ]{3,30}$",
    "g"
  );
  let testAddress = addressRegex.test(inputAddress.value);
  let testAddress2 = addressRegex2.test(inputAddress.value);
  let testAddress3 = addressRegex3.test(inputAddress.value);
  let testAddress4 = addressRegex4.test(inputAddress.value);
  let testAddress5 = addressRegex5.test(inputAddress.value);
  let testAddress6 = addressRegex6.test(inputAddress.value);
  let msg = document.getElementById("addressErrorMsg");
  if (
    testAddress ||
    testAddress2 ||
    testAddress3 ||
    testAddress4 ||
    testAddress5 ||
    testAddress6
  ) {
    msg.innerHTML = "";
    contact.address = form.address.value;
  } else {
    msg.innerHTML = "Adresse incorrecte. Exemple: 10, Rue des Mimosas";
    errorDetection = true;
  }
};

// Fonction validation ville
const validCity = function (inputCity) {
  //Création regex ville
  let cityRegex = RegExp("^[0-9]{5}[,]{1}[ ]{1}[a-zA-Z-]{2,73}$", "g");
  let testCity = cityRegex.test(inputCity.value);
  let msg = document.getElementById("cityErrorMsg");
  if (testCity) {
    msg.innerHTML = "";
    contact.city = form.city.value;
  } else {
    msg.innerHTML = "Ville non trouvée. Exemple: 75000, Paris";
    errorDetection = true;
  }
};

// Fonction validation email
const validEmail = function (inputEmail) {
  //Création regex email
  let emailRegex = RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9-.]+[.]{1}[a-z]{1,6}$",
    "g"
  );
  let testEmail = emailRegex.test(inputEmail.value);
  let msg = document.getElementById("emailErrorMsg");
  if (testEmail) {
    msg.innerHTML = "";
    contact.email = form.email.value;
  } else {
    msg.innerHTML =
      "L'adresse mail n'est pas valide. Exemple: exemple@gmail.com";
    errorDetection = true;
  }
};
