function onSubmit() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const user = {
    username: username,
    password: password,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  };
  let fetchRes = fetch("http://localhost:5555/login", options);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      window.location.href = "./add-property.html";

    });
}

function saveForm() {
  const name = document.getElementById("property_name").value;
  const picture = document.getElementById("picture-file").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("property_price").value;
  const description = document.getElementById("description").value;
  const data = {
    name: name,
    picture: picture,
    location: location,
    price: price,
    description: description,
  };
  // console.log(data);
  let datasend = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
    
  };
console.log(datasend)
  let fetchRes = fetch("http://localhost:5555/save", datasend);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      window.location.href = "./property.html";
    });
}



