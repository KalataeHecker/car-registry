let cars = JSON.parse(localStorage.getItem("cars")) || [
    {
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/BMW_3_Series.jpg",
        plate: "CA1234AB",
        brand: "BMW",
        model: "320d",
        year: "2018",
        owner: "Иван Иванов",
        info: "Шофьор със стаж 10 години"
    }
];

function save() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

/* RENDER */
function render() {
    const container = document.getElementById("cars");
    container.innerHTML = "";

    cars.forEach((c, i) => {
        container.innerHTML += `
        <div class="card" onclick="openDetails(${i})">
            <img src="${c.img}">
            <h3>${c.plate}</h3>
            <p>${c.brand} ${c.model}</p>
        </div>
        `;
    });
}

function openDetails(i) {
    const c = cars[i];

    document.getElementById("details").style.display = "block";
    document.getElementById("details").innerHTML = `
        <div class="details-box">
            <h2>${c.plate}</h2>
            <img src="${c.img}" style="width:100%">
            <p><b>Марка:</b> ${c.brand}</p>
            <p><b>Модел:</b> ${c.model}</p>
            <p><b>Година:</b> ${c.year}</p>
            <p><b>Собственик:</b> ${c.owner}</p>
            <p><b>Характеристики:</b> ${c.info}</p>
            <button onclick="closeDetails()">Затвори</button>
        </div>
    `;
}

function closeDetails() {
    document.getElementById("details").style.display = "none";
}

/* ADD CAR */
function addCar() {
    cars.push({
        img: img.value,
        plate: plate.value,
        brand: brand.value,
        model: model.value,
        year: year.value,
        owner: owner.value,
        info: info.value
    });

    save();
    render();
}

/* LOGIN */
function openLogin() {
    loginModal.style.display = "block";
}

function closeLogin() {
    loginModal.style.display = "none";
}

function login() {
    if (username.value === "admin" && password.value === "72725324") {
        localStorage.setItem("admin", "true");
        closeLogin();
        applyAdmin();
    } else {
        error.innerText = "Грешни данни";
    }
}

/* ADMIN */
function applyAdmin() {
    if (localStorage.getItem("admin") === "true") {
        document.querySelectorAll(".admin-only").forEach(e => {
            e.style.display = "block";
        });
    }
}

render();
applyAdmin();
