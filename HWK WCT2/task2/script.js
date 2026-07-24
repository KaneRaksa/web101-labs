const products = [
    {
        id:1,
        name:"Keyboard",
        price:25.50
    },
    {
        id:2,
        name:"Mouse",
        price:12.00
    },
    {
        id:3,
        name:"Monitor",
        price:149.99
    },
    {
        id:4,
        name:"USB Hub",
        price:18.75
    },
    {
        id:5,
        name:"Head Phones",
        price:37.75
    }
];

const cart=[];

const productList=document.getElementById("product-list");
const cartItems=document.getElementById("cart-items");
const totalPrice=document.getElementById("total-price");
const cartCount=document.getElementById("cart-count");

function loadProducts(){

    productList.innerHTML="";

    products.forEach(product=>{

        productList.innerHTML+=`

        <div class="col-md-6">

            <div class="card product-card">

                <div class="card-body">

                    <h6>${product.name}</h6>

                    <p class="product-price">$${product.price.toFixed(2)}</p>

                    <button class="btn btn-primary btn-sm"
                    onclick="addToCart(${product.id})">

                        Add to cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function addToCart(id){

    const product=products.find(p=>p.id===id);

    const existing=cart.find(item=>item.id===id);

    if(existing){
        existing.quantity++;
    }else{
        cart.push({
            ...product,
            quantity:1
        });
    }

    updateCart();

}

function removeItem(id){

    const item=cart.find(i=>i.id===id);

    if(item.quantity>1){

        item.quantity--;

    }else{

        const index=cart.findIndex(i=>i.id===id);

        cart.splice(index,1);

    }

    updateCart();

}

function updateCart(){

    if(cart.length===0){

        cartItems.innerHTML="Cart is empty";
        totalPrice.innerHTML="$0.00";
        cartCount.innerHTML="0";
        return;

    }

    cartItems.innerHTML="";

    let total=0;
    let count=0;

    cart.forEach(item=>{

        total+=item.price*item.quantity;
        count+=item.quantity;

        cartItems.innerHTML+=`

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                x${item.quantity}

            </div>

            <div>

                $${(item.price*item.quantity).toFixed(2)}

                <button class="btn btn-danger btn-sm ms-2"
                onclick="removeItem(${item.id})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

    totalPrice.innerHTML="$"+total.toFixed(2);
    cartCount.innerHTML=count;

}

loadProducts();