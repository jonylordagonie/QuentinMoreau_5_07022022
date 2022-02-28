let firstName = new URLSearchParams(location.search).get("firstName");
let lastName = new URLSearchParams(location.search).get("lastName");
let address= new URLSearchParams(location.search).get("address");
let city = new URLSearchParams(location.search).get("city");
let email = new URLSearchParams(location.search).get("email");

function contact() {
  const contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email
  }
  console.log("test");
  console.log(contact);
}
contact();
