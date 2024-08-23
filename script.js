const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list = document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity");


openShopping.addEventListener("click",()=>{
    body.classList.add("active")
})

closeShopping.addEventListener("click",()=>{
    body.classList.remove("active")
})

let products = [
    {
        "id" : 1,
        "name" : "Product 1",   
        "image" : "1.png",
        "price" : 10.99,
    },
    {
        "id" : 2,
        "name" : "Product 2",   
        "image" : "2.png",
        "price" : 12.99,
    },
    {
        "id" : 3,
        "name" : "Product 3",   
        "image" : "3.png",
        "price" : 9.99,
    },
    {
        "id" : 4,
        "name" : "Product 4",   
        "image" : "4.png",
        "price" : 20.99,
    },
    {
        "id" : 5,
        "name" : "Product 5",   
        "image" : "5.png",
        "price" : 17.99,
    },
    {
        "id" : 6,
        "name" : "Product 6",   
        "image" : "6.png",
        "price" : 19.99,
    },
]

let listCards = [];

const initAdd = () =>{
    products.forEach((value,key)=>{
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src = "img/${value.image}">
        <div class= "title">${value.name}</div>
        <div class= "price">${value.price.toLocaleString()}</div>
        <button class ="button" onClick = "addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv)
    })
}
initAdd();

const addToCard = key =>{
    if (listCards[key]==null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]))
        // console.log(listCards)
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity)
    }
    reloadCard()
}

const reloadCard = ()=>{
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value,key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value!=null) {
            let newDiv = document.createElement("li")
            newDiv.innerHTML = `
            <div> <img src = "img/${value.image}"></div>
            <div class ="cardTitle">${value.name}</div>
            <div class ="cardPrice">${value.price.toLocaleString()}</div>



            <div>
            <button style="background-color:#560bad" class="cardButton" onClick =changeQuantity(${key},${value.quantity - 1})>-</button>
            <div class= "count">${value.quantity}</div>
            <button style="background-color:#560bad" class="cardButton" onClick =changeQuantity(${key},${value.quantity + 1})>+</button>
            </div>
            `

            listCard.appendChild(newDiv)
        }
        total.innerHTML = totalPrice.toLocaleString()
        quantity.innerHTML = count;
    })
}

const changeQuantity = (key,quantity)=>{
    if (quantity == 0) {
        delete listCards[key];
    }
    else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price

    }
    reloadCard()
}