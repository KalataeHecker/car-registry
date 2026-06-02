let cars = JSON.parse(localStorage.getItem("cars")) || [];
let editIndex = null;

/* LOGIN */
function openLogin() {
    loginModal.style.display = "block";
}

function closeLogin() {
    loginModal.style.display = "none";
}

function login() {
    if (username.value === "admin" && password.value === "7272") {
        localStorage.setItem("admin", "true");
        closeLogin();
        showAdmin();
    } else {
        error.innerText = "Грешни данни";
    }
}

/* SWITCH MODE */
function showAdmin() {
    document.getElementById("guestView").classList.add("hidden");
    document.getElementById("adminView").classList.remove("hidden");
    render();
}

/* IMAGE */
function toBase64(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
}

/* SAVE CAR */
function saveCar() {
    const file = imgFile.files[0];

    function finish(img) {
        const car = {
            img,
            plate: plate.value,
            brand: brand.value,
            model: model.value,
            year: year.value,
            owner: owner.value,
            info: info.value
        };

        if (editIndex === null) {
            cars.push(car);
        } else {
            cars[editIndex] = car;
            editIndex = null;
        }

        localStorage.setItem("cars", JSON.stringify(cars));
        render();
        clear();
    }

    if (file) toBase64(file, finish);
    else if (editIndex !== null) finish(cars[editIndex].img);
}

/* CLEAR */
function clear() {
    imgFile.value = "";
    plate.value = "";
    brand.value = "";
    model.value = "";
    year.value = "";
    owner.value = "";
    info.value = "";
}

/* RENDER TABLE */
function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    cars.forEach((c, i) => {
        list.innerHTML += `
        <tr>
            <td><img src="${c.img}"></td>
            <td>${c.plate}</td>
            <td>${c.brand}</td>
            <td>${c.model}</td>
            <td>${c.year}</td>
            <td>${c.owner}</td>
            <td>
                <button onclick="editCar(${i})">Edit</button>
                <button onclick="deleteCar(${i})">Delete</button>
            </td>
        </tr>
        `;
    });
}

/* DELETE */
function deleteCar(i) {
    cars.splice(i, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    render();
}

/* EDIT */
function editCar(i) {
    const c = cars[i];

    plate.value = c.plate;
    brand.value = c.brand;
    model.value = c.model;
    year.value = c.year;
    owner.value = c.owner;
    info.value = c.info;

    editIndex = i;
}

/* SEARCH */
function searchCar() {
    const val = search.value.toLowerCase();
    const result = cars.filter(c => c.plate.toLowerCase().includes(val));

    searchResult.innerHTML = result.length
        ? result.map(c => `<div>🚗 ${c.plate} - ${c.brand} ${c.model}</div>`).join("")
        : "Няма резултати";
}

/* GUEST BRAND VIEW */
function openBrand(brand) {
    const filtered = cars.filter(c => c.brand === brand);

    brandModels.innerHTML = `
        <h3>${brand} модели</h3>
        ${filtered.map(c => `
            <div class="card">
                <img src="${c.img}" style="width:100%">
                <p>${c.model}</p>
            </div>
        `).join("")}
    `;
}

/* INIT */
render();
