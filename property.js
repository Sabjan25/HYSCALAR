// get call

(function () {
  function getProperty() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    let fetchRes = fetch("http://localhost:5555/properties", options);
    fetchRes
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        createPropertyHtml(response.data);
      });
  }

  getProperty();

  function createPropertyHtml(data) {
    const property = document.getElementById("property-list");
    let propertyHtml;

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      const wrapper = document.createElement("div");
      wrapper.classList.add("property-text");

      const title = document.createElement("h2");
      title.innerHTML = element.name;
      wrapper.appendChild(title);

      const price = document.createElement("h4");
      price.innerHTML = `Price: ${element.price}`;
      wrapper.appendChild(price);

      const location = document.createElement("h4");
      location.innerHTML = `Location: ${element.location}`;
      wrapper.appendChild(location);

      const heading = document.createElement("h4");
      heading.innerHTML = `About the property:`;
      wrapper.appendChild(heading);

      const desc = document.createElement("p");
      desc.innerHTML = `${element.description}`;
      wrapper.appendChild(desc);

      const img = document.createElement("img");
      img.src = "assets/images/property1.avif";
      wrapper.appendChild(img);

      const ebutton = document.createElement("button");
      ebutton.innerHTML = `Edit Property`;
      ebutton.type = "button";
      ebutton.addEventListener("click",function(){
        window.location.href = "./update-property.html"
      });
      wrapper.appendChild(ebutton);
      console.log("click")

      
      /* Add event listener */
      /* 
        redirect to update-property.html with ID
      */
      wrapper.appendChild(ebutton);

      const cbutton = document.createElement("button");
      cbutton.innerHTML = `Deletes Property`;
      cbutton.type = "button";
      cbutton.addEventListener(
        "click",
        function () {
          let btn = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          };
          let fetchs = fetch(`http://localhost:5555/delete/${element.id}`, btn);
          fetchs.then().then((d) => {
            getProperty();
          });
        },
        false
      );
      wrapper.appendChild(cbutton);

      property.appendChild(wrapper);
    }
  }
})();
