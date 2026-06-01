let cars = JSON.parse(localStorage.getItem("cars")) || [
    { plate: "CA1234AB", brand: "BMW", model: "320d", status: "ACTIVE" },
    { plate: "CB5678CD", brand: "Audi", model: "A4", status: "ACTIVE" }
];

function save() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

function render(filter = "") {
    const list = document.getElementById("list");
    list.innerHTML = "";

    cars
    .filter(c =>
        c.plate.toLowerCase().includes(filter.toLowerCase()) ||
        c.brand.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((car, i) => {
        list.innerHTML += `
            <tr>
                <td>${car.plate}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.status}</td>
                <td class="admin-only">
                    <button onclick="removeCar(${i})">DELETE</button>
                </td>
            </tr>
        `;
    });

    applyAdmin();
}

function addCar() {
    cars.push({
        plate: plate.value,
        brand: brand.value,
        model: model.value,
        status: "ACTIVE"
    });

    save();
    render();
}

function removeCar(i) {
    cars.splice(i, 1);
    save();
    render();
}

/* SEARCH */
search.addEventListener("input", e => render(e.target.value));

/* LOGIN */
function openLogin() {
    loginModal.style.display = "block";
}

function login() {
    if (username.value === "admin" && password.value === "72725324") {
        localStorage.setItem("admin", "true");
        loginModal.style.display = "none";
        applyAdmin();
    } else {
        error.innerText = "Wrong credentials";
    }
}

function applyAdmin() {
    if (localStorage.getItem("admin") === "true") {
        document.querySelectorAll(".admin-only").forEach(e => {
            e.style.display = "inline-block";
        });
    }
}

function logout() {
    localStorage.removeItem("admin");
    location.reload();
}

render();
applyAdmin();
