// burger
const burger = document.getElementById("show_burger");
const showBurgerButton = document.getElementById("header_burger_btn");
const closeBurgerButton = document.getElementById("close_burger_btn");
const closeBurgerMenu = document.getElementsByClassName("close_burger");


function openBurger() {
    burger.style.display = "flex";
    setTimeout(() => {
        burger.classList.add("open");
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeBurger() {
    burger.classList.remove("open");
    setTimeout(() => {
        burger.style.display = "none";
    }, 500);
    document.body.style.overflow = '';
}

if (showBurgerButton) {
    showBurgerButton.addEventListener('click', openBurger);
}
if (closeBurgerButton) {
    closeBurgerButton.addEventListener('click', closeBurger);
}
for (let i = 0; i < closeBurgerMenu.length; i++) {
    closeBurgerMenu[i].addEventListener('click', closeBurger);
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeBurger();
    }
});
// slider
const sliderNext= document.querySelector(".trip_svg_2");
const sliderPrev= document.querySelector(".trip_svg_1");
const sliderLine = document.querySelector(".third_main_wrapper_item_3");
let leftDisplacement = 80;
function calculateSlideWidth() {
    const windowWidth = window.innerWidth;
    let sliderWidth;

    if (windowWidth >= 1440) {
        sliderWidth = 250;
    } else if (windowWidth <= 380) {
        sliderWidth = 221;
    } else if (windowWidth <= 768) {
        sliderWidth = 221;
    }
return sliderWidth;
}
function updateSlider() {
    const windowWidth = window.innerWidth;
    const sliderWidth = calculateSlideWidth();

    if (leftDisplacement > 80) {
        leftDisplacement = 80;
    }
}
function nextSlide() {
    const sliderWidth = calculateSlideWidth();
    leftDisplacement = leftDisplacement - sliderWidth;
    let windowWidth = window.innerWidth;
    if (window.innerWidth >= 1440) {
        windowWidth = 1440;
    } else {
        windowWidth = window.innerWidth;
    }
    if (leftDisplacement <= -(sliderLine.offsetWidth - windowWidth)) {
        leftDisplacement = -(sliderLine.offsetWidth - windowWidth);
        sliderNext.classList.add("inactive");
    } else {
        sliderNext.classList.remove("inactive");
    }
    if (leftDisplacement < 80) {
        sliderPrev.classList.remove("inactive");
    }
    sliderLine.style.left = leftDisplacement + "px";
}
function prevSlide() {
    const sliderWidth = calculateSlideWidth();
    leftDisplacement = leftDisplacement + sliderWidth;
    let windowWidth = window.innerWidth;
    if (window.innerWidth >= 1440) {
        windowWidth = 1440;
    } else {
        windowWidth = window.innerWidth;
    }
    if (leftDisplacement < 80) {
        sliderPrev.classList.remove("inactive");
    } else {
        sliderPrev.classList.add("inactive");
    }
    if (leftDisplacement >= 80) {
        leftDisplacement = 80;
    }
    if (leftDisplacement <= -(sliderLine.offsetWidth - windowWidth)) {
        sliderPrev.classList.remove("inactive");
    }
    if (leftDisplacement >= 80) {
        sliderNext.classList.remove("inactive");
    }
    sliderLine.style.left = leftDisplacement + "px";
}

if (sliderNext) {
    sliderNext.addEventListener("click", nextSlide );
}
if (sliderPrev) {
    sliderPrev.addEventListener("click", prevSlide );
}
if (sliderPrev) {
    sliderPrev.classList.add("inactive");
}


window.addEventListener('resize', function() {
    sliderLine.style.left = 80 + "px";
    sliderPrev.classList.add("inactive");
    sliderNext.classList.remove("inactive");
});
// cards
const cardHomeContainer = document.querySelector(".fourth_main_wrapper_grid_container");
function getRandomCards(arr, count) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function renderRandomCards(cards) {
    cardHomeContainer.innerHTML = "";
    const randomCards = getRandomCards(cards, 4);
    randomCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("gifts_shop_grid_element");
        cardElement.innerHTML = `<div class="gifts_shop_grid_element">
                    <div class="gifts_shop_grid_element_container">
                        <div class="gifts_shop_grid_element_img">
                            <img src="src/img/${card.category.toLowerCase().replaceAll(' ', '')}.png" alt="${card.category.toLowerCase()}">
                        </div>
                        <div class="gifts_shop_grid_element_footer">
                            <div class="gifts_shop_grid_element_footer_1">${card.category}</div>
                            <div class="gifts_shop_grid_element_footer_2">${card.name}</div>
                        </div>
                    </div>
                </div>`
        if (card.category === "For Health") {
            cardElement.id = "green";
        }
        if (card.category === "For Harmony") {
            cardElement.id = "pink";
        }
        cardElement.addEventListener("click",() => openModalForHome(card));
        cardHomeContainer.appendChild(cardElement);
    });
}
if (cardHomeContainer) {
    fetch('cards.json')
        .then(response => response.json())
        .then(cardsData => {
            renderRandomCards(cardsData);
            console.log(cardsData);
        })
        .catch(error => console.error('Cards is not loaded', error));
}
// Timer
const newYearDate = new Date('2025-01-01T00:00:00');

function updateTimer() {
    const currentDate = new Date();
    const timeDifference = newYearDate - currentDate;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 3;
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / (1000));

    document.querySelector('.fifth_main_wrapper_item_4_days_number').textContent = days;
    document.querySelector('.fifth_main_wrapper_item_4_hours_number').textContent = hours;
    document.querySelector('.fifth_main_wrapper_item_4_minutes_number').textContent = minutes;
    document.querySelector('.fifth_main_wrapper_item_4_seconds_number').textContent = seconds;
}
if (document.querySelector(".fifth_main_wrapper_item_4_days_number")) {
    const timerInterval = setInterval(updateTimer, 1000);

}

if (document.querySelector(".fifth_main_wrapper_item_4_days_number")){
    updateTimer();
}
// category
const giftsShop = document.querySelector(".gifts_shop")
const cardGiftsContainer = document.querySelector(".gifts_shop_item_3");
const categoryButtons = document.querySelectorAll(".gifts_shop_items");

let originalCardsData = [];

function renderGiftsCards(cardsData) {
    cardGiftsContainer.innerHTML = "";
    const randomCards = getRandomCards(cardsData, 36);
    randomCards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("gifts_shop_grid_element");
        cardElement.innerHTML = `
            <div class="gifts_shop_grid_element_container">
                <div class="gifts_shop_grid_element_img">
                    <img src="../src/img/${card.category.toLowerCase().replaceAll(' ', '')}.png" alt="${card.category.toLowerCase()}">
                </div>
                <div class="gifts_shop_grid_element_footer">
                    <div class="gifts_shop_grid_element_footer_1">${card.category}</div>
                    <div class="gifts_shop_grid_element_footer_2">${card.name}</div>
                </div>
            </div>
        `;
        if (card.category === "For Health") {
            cardElement.id = "green";
        }
        if (card.category === "For Harmony") {
            cardElement.id = "pink";
        }
        cardGiftsContainer.appendChild(cardElement);

        cardElement.addEventListener("click",() => openModal(card));
    });
}

function filterCards(category) {
    let filteredCards;
    if (category === "all") {
        filteredCards = originalCardsData;
    } else {
        filteredCards = originalCardsData.filter((card) => card.category === category);
    }
    renderGiftsCards(filteredCards);
}
function setActiveButton(activeButton) {
    categoryButtons.forEach((button) => {
        button.classList.remove("active");
    })
    activeButton.classList.add("active");
}
if (giftsShop) {
    document.getElementById("all").classList.add("active");
}
if (giftsShop) {
    fetch('../cards.json')
        .then((response) => response.json())
        .then((cardsData) => {
            originalCardsData = cardsData;
            renderGiftsCards(cardsData);
            categoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.dataset.category;
                    filterCards(category);
                    setActiveButton(button);
                });
            });
        })
        .catch((error) => console.error("Cards is not loaded", error));
}
// up
const scrollToTop = document.querySelector(".up");

scrollToTop.classList.add("hidden");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.remove("hidden");
        scrollToTop.classList.add("visible");
    } else {
        scrollToTop.classList.remove("visible");
        scrollToTop.classList.add("hidden");
    }
});
// modal
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal_overlay");
const modalImg = document.querySelector(".modal_block_img img");
const modalCategory = document.querySelector(".modal_block_item1");
const modalName = document.querySelector(".modal_block_item2");
const modalDescription = document.querySelector(".modal_block_item3");
const modalLive = document.getElementById("live");
const modalLove = document.getElementById("love");
const modalDream = document.getElementById("dream");
const modalCreate = document.getElementById("create");
const starsLive = document.querySelector(".stars_live");
const starsLove = document.querySelector(".stars_love");
const starsDream = document.querySelector(".stars_dream");
const starsCreate = document.querySelector(".stars_create");
const body = document.querySelector("body");


function getStars(value) {
    const number = parseInt(value.replace('+', ''));
    const stars = number / 100;

    let starsHtml = "";
    for (let i = 1; i <= stars; i++) {
        starsHtml += '<img src="../src/img/rating.png" alt="star" class="star1">';
    }
    return starsHtml;
}

function openModal(card) {
    modalImg.src = `../src/img/${card.category.toLowerCase().replace(/ /g, '')}.png`;
    modalImg.alt = card.category;
    modalCategory.textContent = card.category;
    modalName.textContent = card.name;
    modalDescription.textContent = card.description;
    if (card.category === "For Health") {
        modalCategory.classList.add("green");
    }
    if (card.category === "For Harmony") {
        modalCategory.classList.add("pink");
    }
    Object.entries(card.superpowers).forEach(([key, value]) => {
        let starsHtml = getStars(value);

        if (key === "live") {
            modalLive.innerHTML = `${value}`;
            starsLive.innerHTML = `${starsHtml}`;
        } else if (key === "create") {
            modalCreate.innerHTML = `${value}`;
            starsCreate.innerHTML = `${starsHtml}`;
        } else if (key === "love") {
            modalLove.innerHTML = `${value}`;
            starsLove.innerHTML = `${starsHtml}`;
        } else if (key === "dream") {
            modalDream.innerHTML = `${value}`;
            starsDream.innerHTML = `${starsHtml}`;
        }
    });
    modal.style.display = "flex";
    body.style.overflow = "hidden";

}
document.getElementById("close").addEventListener("click", () => {
    modal.style.display = "none";
    modalCategory.classList.remove("green") || modalCategory.classList.remove("pink");
    body.style.overflow = "";

})
modalOverlay.addEventListener("click", () => {
    modal.style.display = "none";
    modalCategory.classList.remove("green") || modalCategory.classList.remove("pink");
    body.style.overflow = "";

})
function getStarsForHome(value) {
    const number = parseInt(value.replace('+', ''));
    const stars = number / 100;

    let starsHtml = "";
    for (let i = 1; i <= stars; i++) {
        starsHtml += '<img src="src/img/rating.png" alt="star" class="star1">';
    }
    return starsHtml;
}
function openModalForHome (card) {
    modalImg.src = `src/img/${card.category.toLowerCase().replace(/ /g, '')}.png`;
    modalImg.alt = card.category;
    modalCategory.textContent = card.category;
    modalName.textContent = card.name;
    modalDescription.textContent = card.description;
    if (card.category === "For Health") {
        modalCategory.classList.add("green");
    }
    if (card.category === "For Harmony") {
        modalCategory.classList.add("pink");
    }
    Object.entries(card.superpowers).forEach(([key, value]) => {
        let starsHtml = getStarsForHome(value);

        if (key === "live") {
            modalLive.innerHTML = `${value}`;
            starsLive.innerHTML = `${starsHtml}`;
        } else if (key === "create") {
            modalCreate.innerHTML = `${value}`;
            starsCreate.innerHTML = `${starsHtml}`;
        } else if (key === "love") {
            modalLove.innerHTML = `${value}`;
            starsLove.innerHTML = `${starsHtml}`;
        } else if (key === "dream") {
            modalDream.innerHTML = `${value}`;
            starsDream.innerHTML = `${starsHtml}`;
        }
    });
    modal.style.display = "flex";
    body.style.overflow = "hidden";
}

