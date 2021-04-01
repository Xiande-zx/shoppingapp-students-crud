// API Url
const url = 'http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/list-products/'
const idTeam = 'antelopes' // CHANGEME
var idProduct = 0;

retreiveAllProductsFromServer();


//Product Constructor
class Product {
  constructor(id, title, price, year) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.year = year;

  }
}

//UI Constructor
class UI {
  //Product template
  static addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
      <div class="card-body">
      <h5><strong>${product.title}</strong></h5>
      <strong>Price</strong>: ${product.price}€
      <strong>Year</strong>: ${product.year}
      <a href="#" onclick="UI.deleteProduct(event)" id="${product.id}" class="dlt btn btn-danger ml-5" name="delete">Delete</a>
      </div>
      </div>
      `;
    productList.appendChild(element);
  }

  static resetForm() {
    document.getElementById("product-form").reset();
  }

  static deleteProduct(event) {
    console.log("event", event)
    event.target.closest("div.card.text-center.mb-4").remove();
    console.log("dw" + event.target.id)
    deleteIdProduct(event.target.id);
    UI.showMessage("Product removed successfully", "danger");
  }

  static showMessage(message, cssClass) {
    const msg = document.createElement("div");
    msg.className = `alert alert-${cssClass} mt-2 text-center`;
    msg.appendChild(document.createTextNode(message));

    //Show in the DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");

    //Insert message in the UI
    container.insertBefore(msg, app);

    //Remove after 2 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}



document.getElementById("product-form").addEventListener("submit", e => {
  const name = document.getElementById("product-name").value
  price = document.getElementById("product-price").value
  var age = document.getElementById("product-year").value

  postData({
    title: name,
    price: price,
    year: age
  })

  UI.resetForm();
  UI.showMessage("Product added successfully", "success");

  e.preventDefault();
});


function postData(opts) {
  fetch('http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/add-product/antelopes', {
    method: "POST",
    body: JSON.stringify(opts),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(function(json){
      console.log(json)
        opts.id = json.id
        UI.addProduct(opts);
    } );
}

function retreiveAllProductsFromServer() {
  fetch(url + idTeam)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      for (var i = 0; i < myJson.length; i++) {
        if (myJson[i].year <= 2021) {
          UI.addProduct(myJson[i])
        }
      }
    });
}


function deleteIdProduct(id) {
  
  const urlDelete = `http://ec2-35-181-5-201.eu-west-3.compute.amazonaws.com:8080/delete-product/antelopes/${id}`;
  fetch(urlDelete, {
    method: 'GET'
  })
}