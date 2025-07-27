let bagItems;
let wishItems = [];
document.addEventListener('DOMContentLoaded', function () {
    onLoad();
});


function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    let wishItemsStr = localStorage.getItem('wishItems');

    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    wishItems = wishItemsStr ? JSON.parse(wishItemsStr) : [];

    displayItemsOnHomePage();
    displayBagIcon();
    displayWishIcon();
}

function addToBag(itemId) {
    if (!bagItems.includes(itemId)) {
        bagItems.push(itemId);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
        displayBagIcon();
        console.log("Item added to bag");
    } else {
        console.log("Item already in bag");
    }
}

function addToWish(itemId){
    if (!wishItems.includes(itemId)) {
        wishItems.push(itemId);
        localStorage.setItem('wishItems', JSON.stringify(wishItems));
        displayWishIcon();
        console.log("Item added to wishlist");
    } else {
        console.log("Item already in wishlist");
    }
}

function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag-item-count');

    if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayWishIcon(){
    let wishItemCountElement = document.querySelector('.wish-item-count');

    if(wishItems.length > 0){
        wishItemCountElement.innerText = wishItems.length;
        wishItemCountElement.style.visibility = 'visible';
    } else {
        wishItemCountElement.style.visibility = 'hidden';
    }
    
}

function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector(".items-container");
    if (!itemsContainerElement) {
        return;
    }
    let innerHtml = '';
    items.forEach(item => {
        innerHtml+= `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars}⭐| ${item.rating.count}
            </div>
            <div class="comapny-name">${item.company_name}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag(${item.id})" >Add to Bag</button>
            <button class="btn-add-wish" onclick="addToWish(${item.id})">Add to Wishlist</button>
        </div>
    `;
    });

    itemsContainerElement.innerHTML = innerHtml;
}