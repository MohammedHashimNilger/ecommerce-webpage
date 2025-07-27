let wishItemObject = [];
onLoad();

function onLoad() {
     let wishItemsStr = localStorage.getItem('wishItems');
    wishItems = wishItemsStr ? JSON.parse(wishItemsStr) : [];

    loadWishItems();
    displayWishItems();
    displayWishIcon();
    displayBagIcon()
}

function loadWishItems() {
    wishItemObject = wishItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
        
        console.warn(`Item with id ${itemId} not found.`);
        return null;
    }).filter(item => item !== null); 
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

function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayWishItems() {
    let containerElement = document.querySelector('.wish-container');
    if (!containerElement) {
        console.error('Wish container not found');
        return;
    }

    let innerHTML = '';
    wishItemObject.forEach(wishItem => {
        innerHTML += generateItemHTML(wishItem);
    });
    
    containerElement.innerHTML = innerHTML;
}

function removeFromWish(itemId) {
    wishItems = wishItems.filter(wishItemId => wishItemId !== itemId);
    localStorage.setItem('wishItems', JSON.stringify(wishItems));
    loadWishItems();
    displayWishItems();
    displayWishIcon();  
}

function generateItemHTML(item) {
    return `
      <div class="item-container">
            <img class="item-image" src="../${item.image}" alt="image">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="btn-container">
                <button class="btn-add-tag" onclick="addToBag(${item.id})">Add to Bag</button>
                <button class="btn-remove-tag" onclick="removeFromWish(${item.id})">Remove</button>
            </div>
        </div>`;
}