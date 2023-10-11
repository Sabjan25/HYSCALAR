/* 
    function Get property by ID function
    
  
    Set input values using javascript 
        1. document.getElementById("name").value = 'response.data.name'
        function to updateForm(id){ }

*/
(function(){
function getpropertyById() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };


}
getpropertyById()

function updateForm() {

  document.getElementById("name").value = "response.data.name";
  document.getElementById("picture").value = "response.data.picture";
  document.getElementById("location").value = "response.data.location";
  document.getElementById("price").value = "response.data.price";
  document.getElementById("description").value = "response.data.description";``
  const data = {
    name: name,
    picture: picture,
    location: location,
    price: price,
    description: description,
  };
  // console.log(data);
  let datasend = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  };

  let fetchRes = fetch("http://localhost:5555/update", datasend);
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      console.log(d);
      window.location.href = "./property.html";
    });
}
})();
