let cars = JSON.parse(localStorage.getItem("cars")) || [];

function save() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

/* IMAGE -> BASE64 */
function toBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
}

/* ADD CAR */
function addCar() {
    const file = document.getElementById("imgFile").files[0];

    if (!file) return alert("Избери снимка!");

    toBase64(file, (imgData) => {
        cars.push({
            img: imgData,
            plate: plate.value,
            brand: brand.value,
            model: model.value,
            year: year.value,
            owner: owner.value,
            info: info.value
        });

        save();
        render();
    });
}

/* RENDER TABLE */
function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    cars.forEach((c, i) => {
        list.innerHTML += `
        <tr>
            <td><img src="${c.img}" onclick="openDetails(${i})"></td>
            <td>${c.plate}</td>
            <td>${c.brand}</td>
            <td>${c.model}</td>
            <td>${c.year}</td>
            <td>${c.owner}</td>
            <td><button onclick="deleteCar(${i})">Изтрий</button></td>
        </tr>
        `;
    });

    applyAdmin();
}

/* DELETE */
function deleteCar(i) {
    cars.splice(i, 1);
    save();
    render();
}

/* DETAILS */
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
