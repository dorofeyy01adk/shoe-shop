const products = document.querySelectorAll(".product");
const buttons = document.querySelectorAll(".add");
const cartList = document.getElementById("cart");
const totalElement = document.getElementById("total");

let cart = [];

const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const product = products[index];

        const item = {
            name: product.querySelector("p").textContent,
            price: Number(product.dataset.price)
        };

        cart.push(item);
        saveCart();
        renderCart();
    });
});

const renderCart = () => {
    cartList.innerHTML = "";

    cart.forEach((item, i) => {
        const li = document.createElement("li");
        li.textContent = item.name + " - " + item.price;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Удалить";

        removeBtn.addEventListener("click", () => {
            cart.splice(i, 1);
            saveCart();
            renderCart();
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    updateTotal();
};

const updateTotal = () => {
    let total = 0;
    cart.forEach(item => total += item.price);
    totalElement.textContent = "Итого: " + total;
};

document.getElementById("pay").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        saveCart();
        renderCart();
    }
});

document.getElementById("clear").addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
});

const filters = document.querySelectorAll("[data-filter]");

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.filter;

        products.forEach(product => {
            if (category === "all" || product.dataset.category === category) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});

renderCart();
