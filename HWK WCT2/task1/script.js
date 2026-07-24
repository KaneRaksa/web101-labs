let products = [];
let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalUser = document.getElementById("total-user");

async function fetchUsers(){

    try{

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        products = await response.json();

        displayUsers();

    }

    catch(error){

        console.log(error);

    }

}

fetchUsers();

function displayUsers(){

    productList.innerHTML="";

    products.forEach(user=>{

        productList.innerHTML +=

        `

        <div class="col-md-6 mb-4">

            <div class="card product-card h-100 shadow">

                <div class="card-body">

                    <h4>${user.name}</h4>

                    <hr>

                    <p class="info">

                        <b>Username:</b><br>

                        ${user.username}

                    </p>

                    <p class="info">

                        <b>Email:</b><br>

                        ${user.email}

                    </p>

                    <p class="info">

                        <b>Phone:</b><br>

                        ${user.phone}

                    </p>

                    <p class="info">

                        <b>Website:</b><br>

                        ${user.website}

                    </p>

                    <hr>

                    <h6>Address</h6>

                    <p class="info">

                        Street : ${user.address.street}<br>

                        Suite : ${user.address.suite}<br>

                        City : ${user.address.city}<br>

                        Zip Code : ${user.address.zipcode}

                    </p>

                    <p class="info">

                        Latitude : ${user.address.geo.lat}<br>

                        Longitude : ${user.address.geo.lng}

                    </p>

                    <hr>

                    <h6>Company</h6>

                    <p class="info">

                        <b>${user.company.name}</b>

                    </p>

                    <p class="info">

                        ${user.company.catchPhrase}

                    </p>

                    <small>

                        ${user.company.bs}

                    </small>

                    <br><br>

                    <button class="btn btn-primary w-100" onclick="addToCart(${user.id})">Add To Cart</button>

                </div>

            </div>

        </div>

        `;

    });

}

function addToCart(id){

    const user = products.find(item=>item.id===id);

    const exist = cart.find(item=>item.id===id);

    if(exist){

        exist.quantity++;

    }

    else{

        cart.push({

            id:user.id,

            name:user.name,

            company:user.company.name,

            city:user.address.city,

            quantity:1

        });

    }

    updateCart();

}

function removeItem(id){

    const item = cart.find(i=>i.id===id);

    if(item.quantity>1){

        item.quantity--;

    }

    else{

        cart = cart.filter(i=>i.id!==id);

    }

    updateCart();

}

function updateCart(){

    if(cart.length===0){

        cartItems.innerHTML="Cart is Empty";

        cartCount.innerHTML=0;

        totalUser.innerHTML=0;

        return;

    }

    cartItems.innerHTML="";

    let count=0;

    cart.forEach(item=>{

        count += item.quantity;

        cartItems.innerHTML +=

        `

        <div class="cart-item">

            <strong>

                ${item.name}

            </strong>

            <br>

            Company : ${item.company}

            <br>

            City : ${item.city}

            <br>

            Quantity : x${item.quantity}

            <br><br>

            <button

                class="btn btn-danger btn-sm"

                onclick="removeItem(${item.id})">

                Delete

            </button>

        </div>

        `;

    });

    cartCount.innerHTML=count;

    totalUser.innerHTML=count;

}