let users = [];
let Products = [
    {
        id: 1,
        name: "cup",
        price: 100,
        quantity: 5,
        category: "supplies",
        imgScource: "images/1.jpg",
    },

    {
        id: 2,
        name: "iphone",
        price: 150,
        quantity: 5,
        category: "phones",
        imgScource: "images/4.jpeg",
    },

    {
        id: 3,
        name: "bag",
        price: 240,
        quantity: 5,
        category: "supplies",
        imgScource: "images/3.png",
    },

    {
        id: 4,
        name: "tshirt",
        price: 700,
        quantity: 5,
        category: "clothes",
        imgScource: "images/6.jpeg",
    },

    {
        id: 5,
        name: "bag",
        price: 1200,
        quantity: 5,
        category: "phones",
        imgScource: "images/4.jpeg",
    },
    {
        id: 6,
        name: "tshirt",
        price: 50,
        quantity: 5,
        category: "clothes",
        imgScource: "images/6.jpeg",
    },
];

let Cart = [];
// =================================
document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("regemail");
        let errorMsg = document.getElementById("errorMsg");
        let pass = document.getElementById("regpassword");
        let confirmpass = document.getElementById("confirmPassword");

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let nameRegex = /^[A-Za-z\s]+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            errorMsg.textContent =
                "Name should contain only letters and spaces.";
            errorMsg.style.color = "red";
            return;
        }

        if (!emailRegex.test(email)) {
            errorMsg.textContent = "Please enter a valid email address.";
            errorMsg.style.color = "red";
            return;
        }
         if (!pass.value) {
             errorMsg.textContent = "Please enter password";
             errorMsg.style.color = "red";
             return;
         }
         if (pass.value != confirmpass.value) {
             errorMsg.textContent = "confirmation password is wrong";
             errorMsg.style.color = "red";
             return;
         }
    });
// =================================
let slideIndex = 1;

showSlides(slideIndex);
let slideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

function changeSlide(n) {
    showSlides((slideIndex += n));
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}function currentSlide(n) {
    showSlides((slideIndex = n));
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
        slides[slideIndex - 1].classList.add("active");
}
// =================================
function addUser(userObject) {
    users.push(userObject);
}

function routeToPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.classList.add("hidden"));

    let target = document.getElementById(pageId);
    if (target) {
        target.classList.remove("hidden");
    }
}

// Main router
window.addEventListener("load", function () {
    routeToPage("register");
    viewer();
});

let form = document.getElementById("registerForm");
let errorMsg = document.getElementById("errorMsg");
let errorLoginMsg = document.getElementById("errorLoginMsg");
let userBtn = document.getElementById("userBtn");
let logoutBtn = document.getElementById("logoutBtn");
let cart = document.getElementById("cart");

// register and validation  functionality
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let userObject = {};

    userObject.name = form.name.value.trim();
    userObject.email = form.regemail.value.trim();
    userObject.password = form.regpassword.value;
    let confirmPassword = form.confirmPassword.value;

    if (
        !userObject.name ||
        !userObject.email ||
        !userObject.password ||
        userObject.password !== confirmPassword
    ) {
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
        addUser(userObject);
        routeToPage("loginFormSection");

        form.reset();
    }
});

// login  functionality

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = loginForm.email.value.trim();
    let password = loginForm.password.value;

    if (!email || !password) {
        alert("Please fill in all fields.");
    } else {
        login(email, password);
        loginForm.reset();
    }
});

function login(email, password) {
    for (let key = 0; key < users.length; key++) {
        if (users[key].email == email) {
            if (users[key].password == password) {
                routeToPage("home");
                viewer();
                userBtn.innerText = users[key].name;
            } else {
                errorLoginMsg.style.display = "block";
            }
        } else if (key == users.length - 1) {
            errorLoginMsg.style.display = "block";
        }
    }
}

//  logout
logoutBtn.addEventListener("click", () => {
    userBtn.innerText = "Login";
    userBtn.setAttribute("onclick", routeToPage("loginFormSection"));
});

let productDetails = document.getElementById("productDetails");
let detailImage = document.getElementById("detailImage");
let detailName = document.getElementById("detailName");
let detailCategory = document.getElementById("detailCategory");
let detailPrice = document.getElementById("detailPrice");
let backBtn = document.getElementById("backBtn");
let cartBtn = document.getElementById("cartbutton");
let priceBtn = document.getElementById("inputPrice");
let productGrid = document.getElementById("productGrid");
// displaying & filtering products

priceBtn.addEventListener("input", () => {
    viewer(priceBtn.value);
});

function viewer(type = "all") {
    productGrid.innerHTML = "";

    if (!isNaN(type)) {
        Products.forEach((product) => {
            if (product.price <= type) {
                productGrid.innerHTML += htmlStr(product);
            }
        });
    } else {
        if (type == "all") {
            Products.forEach((product) => {
                productGrid.innerHTML += htmlStr(product);
            });
        } else {
            Products.forEach((product) => {
                if (product.category == type) {
                    productGrid.innerHTML += htmlStr(product);
                }
            });
        }
    }
}

function htmlStr(product) {
    return `
    <div class="product-card">
      <img src="${product.imgScource}" class="product-img" alt="${
        product.name
    }">
      <h5>${product.name}</h5>
      <p class="text-muted">${product.category}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button class="btn btn-primary" onclick="addToCart(${
          product.id
      })">Add to Cart</button>
      <button class="btn btn-outline" onclick="modelView(${
          product.id
      })" data-id="${product.id}">View Details</button>
      </div>
    `;
}

function modelView(idinput) {
    let id = idinput;
    let product = Products.find((p) => p.id == id);
    if (product) {
        routeToPage("productDetails");
        detailImage.src = product.imgScource;
        detailName.textContent = product.name;
        detailCategory.textContent = product.category;
        detailPrice.textContent = `$${product.price.toFixed(2)}`;
        cartBtn.setAttribute("onclick", `addToCart(${product.id})`);
    }
}

//Back to products button
backBtn.addEventListener("click", () => {
    routeToPage("home");
});

// add to cart
function addToCart(id) {
    let element;
    for (let i = 0; i < Products.length; i++) {
        if (Products[i].id === id) {
            element = Products[i];
            Products.splice(i, 1);
            Cart.push(element);
        }
    }
    viewer();
}
let mainCartView = document.getElementById("main");
cart.addEventListener("click", () => {
    routeToPage("home");
    let txt = "";
    let btn = document.getElementById("buyNow");

    if (Cart.length > 0) {
        Cart.forEach((element) => {
            txt += ` 
            <div class="product-counter">
                <div class="product-name">${element.name}</div>
                <div class="product-row">
                <div class="price" id="price${element.id}">${element.price}</div>
                <div class="counter">
                <button id="decrement" onclick="minus(${element.id})">-</button>
                <div class="value" id="count${element.id}">1</div>
                <button id="increment" onclick="plus(${element.id})">+</button>
                </div>
                </div>
            </div>
            `;
        });

        txt += `<p >Total Price is<span class="total" id="totalsum"></span></p> 
        `;

        btn.classList.remove("hidden");
        mainCartView.innerHTML = txt;
    }
    sumCart();
});

function minus(id) {
    let count = document.getElementById(`count${id}`);
    let value = count.textContent;
    if (value > 0) {
        count.innerText = --value;
    }
    sumCart();
}

function plus(id) {
    let count = document.getElementById(`count${id}`);
    let value = count.textContent;
    count.innerText = ++value;
    sumCart();
}

function sumCart() {
    let sum = 0;
    let total = document.getElementById("totalsum");

    Cart.forEach((element) => {
        let x = Number(document.getElementById(`price${element.id}`).innerText);
        let y = Number(document.getElementById(`count${element.id}`).innerText);
        sum += x * y;
    });
    total.innerText = ` ${sum}$`;
}
// ======================================================
let buyNowByn = document.getElementById("buyNow");

buyNowByn.addEventListener("click", () => {
    let btn = document.getElementById("buyNow");
    let txt = "";

    txt = `<div class="shipping">
                <div class="product-ship">Order Shipped</div>
            </div>
            `;

    mainCartView.innerHTML = txt;
    btn.classList.add("hidden");
});
