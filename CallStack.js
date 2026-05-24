// ================= SELECTORS =================

let addNote = document.querySelector("#add-note");

let formContainer = document.querySelector(".form-container");

let closeForm = document.querySelector(".Close");

let btns = document.querySelector(".btns");

let stack = document.querySelector(".cards-wrapper");

let form = document.querySelector("form");

const upBtn = document.querySelector("#upBtn");

const downBtn = document.querySelector("#downBtn");

const imageUrlInput =
    form.querySelector('input[placeholder="Enter image url"]');

const fullNameInput =
    form.querySelector('input[placeholder="ENter full name"]');

const homeTownInput =
    form.querySelector('input[placeholder="Enter home town"]');

const purposeInput =
    form.querySelector('input[placeholder="Enter your purpose"]');

let categoryRadios =
    form.querySelectorAll("input[name='category']");


// ================= SAVE TO LOCAL STORAGE =================

function saveToLocalStorage(obj) {

    let oldTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    obj.id = Date.now();

    oldTasks.push(obj);

    localStorage.setItem(
        "tasks",
        JSON.stringify(oldTasks)
    );
}


// ================= OPEN FORM =================

addNote.addEventListener("click", function () {

    formContainer.style.display = "flex";

    btns.style.display = "none";

    stack.style.display = "none";
});


// ================= CLOSE FORM =================

closeForm.addEventListener("click", function () {

    formContainer.style.display = "none";

    btns.style.display = "flex";

    stack.style.display = "block";
});


// ================= FORM SUBMIT =================

form.addEventListener("submit", function (evt) {

    evt.preventDefault();

    const imageUrl = imageUrlInput.value.trim();

    const fullName = fullNameInput.value.trim();

    const homeTown = homeTownInput.value.trim();

    const purpose = purposeInput.value.trim();

    let selected = false;

    categoryRadios.forEach(function (cat) {

        if (cat.checked) {

            selected = cat.value;
        }
    });

    // ================= VALIDATIONS =================

    if (imageUrl === "") {

        alert("Please enter image URL");

        return;
    }

    if (fullName === "") {

        alert("Please enter full name");

        return;
    }

    if (homeTown === "") {

        alert("Please enter home town");

        return;
    }

    if (purpose === "") {

        alert("Please enter purpose");

        return;
    }

    if (!selected) {

        alert("Please select a category");

        return;
    }

    // ================= SAVE =================

    saveToLocalStorage({
        imageUrl,
        fullName,
        purpose,
        homeTown,
        selected,
    });

    // ================= RESET FORM =================

    form.reset();

    formContainer.style.display = "none";

    btns.style.display = "flex";

    stack.style.display = "block";

    // ================= SHOW UPDATED CARDS =================

    showCards();
});


// ================= SHOW CARDS =================

function showCards() {

    // CLEAR OLD CARDS FIRST

    stack.innerHTML = "";

    let allTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    allTasks.forEach(function (task) {

        // ================= CREATE CARD =================

        const card = document.createElement("div");

        card.classList.add("card");

        // ================= IMAGE =================

        const img = document.createElement("img");

        img.src = task.imageUrl;

        img.alt = "not found";

        // ================= NAME =================

        const nameHeading = document.createElement("h2");

        nameHeading.classList.add("naam");

        nameHeading.textContent = task.fullName;

        // ================= HOME TOWN =================

        const homeTownDiv = document.createElement("div");

        homeTownDiv.classList.add("two", "home-town");

        const homeLabel = document.createElement("p");

        homeLabel.textContent = "Home Town";

        const homeValue = document.createElement("p");

        homeValue.textContent = task.homeTown;

        homeTownDiv.append(homeLabel, homeValue);

        // ================= PURPOSE =================

        const purposeDiv = document.createElement("div");

        purposeDiv.className = "two bookings";

        const purposeLabel = document.createElement("p");

        purposeLabel.textContent = "Purpose";

        const purposeValue = document.createElement("p");

        purposeValue.textContent = task.purpose;

        purposeDiv.append(purposeLabel, purposeValue);

        // ================= CATEGORY =================

        const categoryDiv = document.createElement("div");

        categoryDiv.className = "two";

        const categoryLabel = document.createElement("p");

        categoryLabel.textContent = "Category";

        const categoryValue = document.createElement("p");

        categoryValue.textContent = task.selected;

        categoryDiv.append(categoryLabel, categoryValue);

        // ================= BUTTONS =================

        const c_m = document.createElement("div");

        c_m.classList.add("C_M");

        const callBtn = document.createElement("div");

        callBtn.classList.add("call");

        callBtn.textContent = "Call";

        const msgBtn = document.createElement("div");

        msgBtn.classList.add("msg");

        msgBtn.textContent = "Message";

        const deleteBtn = document.createElement("div");

        deleteBtn.classList.add("delete");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            
            let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            
            // remove task by id
            allTasks = allTasks.filter(t => t.id !== task.id);
            
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            
            showCards(); // re-render UI
        });
        
        c_m.append(callBtn, msgBtn, deleteBtn);

        // ================= APPEND EVERYTHING =================

        card.append(
            img,
            nameHeading,
            homeTownDiv,
            purposeDiv,
            categoryDiv,
            c_m
        );

        stack.appendChild(card);
    });

    updateStack();
}


// ================= UPDATE STACK =================

function updateStack() {

    const cards =
        document.querySelectorAll(".cards-wrapper .card");

    cards.forEach(function (card, index) {

        card.style.zIndex =
            cards.length - index;

        card.style.transform =
            `translateY(${index * 10}px) scale(${1 - index * 0.02})`;

        card.style.opacity =
            `${1 - index * 0.1}`;
    });
}


// ================= MOVE STACK UP =================

upBtn.addEventListener("click", function () {

    let lastChild = stack.lastElementChild;

    if (lastChild) {

        stack.insertBefore(
            lastChild,
            stack.firstElementChild
        );

        updateStack();
    }
});


// ================= MOVE STACK DOWN =================

downBtn.addEventListener("click", function () {

    const firstChild = stack.firstElementChild;

    if (firstChild) {

        stack.appendChild(firstChild);

        updateStack();
    }
});


// ================= INITIAL RENDER =================

showCards();