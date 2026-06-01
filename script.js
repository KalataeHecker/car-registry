let cars = JSON.parse(localStorage.getItem("cars")) || [];
let editIndex = null;

/* SAVE DB */
function save() {
    localStorage.setItem("cars", JSON.stringify(cars));
}

/* IMAGE -> BASE64 */
function toBase64(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
}

/* ADD / EDIT */
function saveCar() {
    const file = document.getElementById("imgFile").files[0];

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
            formTitle.innerText = "Добавяне на автомобил";
        }

        save();
        render();
        clearForm();
    }

    if (file) {
        toBase64(file, finish);
    } else if (editIndex !== null) {
        finish(cars[editIndex].img);
    } else {
        alert("Избери снимка!");
    }
}

/* CLEAR */
function clearForm() {
    imgFile.value = "";
    plate.value = "";
    brand.value = "";
    model.value = "";
    year.value = "";
    owner.value = "";
    info.value = "";
}

/* RENDER */
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
            <td class="admin-only">
                <button onclick="editCar(${i})">Редактирай</button>
                <button onclick="deleteCar(${i})">Изтрий</button>
            </td>
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
    formTitle.innerText = "Редакция на автомобил";
}

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
        applyAdmin();
    } else {
        error.innerText = "Грешни данни!";
    }
}

/* ADMIN MODE */
function applyAdmin() {
    if (localStorage.getItem("admin") === "true") {
        document.querySelectorAll(".admin-only").forEach(e => {
            e.style.display = "table-cell";
        });
        document.querySelector(".panel").style.display = "block";
    }
}

render();
applyAdmin();
