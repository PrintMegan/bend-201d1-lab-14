/* global Product, Cart */

'use strict';
// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    optionEl.value = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  // TODO: suss out the item picked from the select list
  var product = event.target.items.value;

  // TODO: get the quantity
  var quantity = event.target.quantity.value;
  // console.log(product, quantity);
  // TODO: using those, add one item to the Cart
  cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {

  var cartCount = 0;
  for (var i = 0; i < cart.items.length; i++) {
    cartCount += parseInt(cart.items[i].quantity);
  }
  var cartNodeCount = document.getElementById('itemCount');
  cartNodeCount.textContent = cartCount;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var product = event.target.items.value;
  var quantity = event.target.quantity.value;
  // TODO: Add a new element to the cartContents div with that information
  var pEl = document.createElement('p');
  var cartContentsNode = document.getElementById('cartContents');
  pEl.textContent = product + ' & ' + quantity;
  cartContentsNode.appendChild(pEl);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

if (localStorage.cartItems) {
  //reassigns cart array
  cart.items = JSON.parse(localStorage.getItem('cartItems'));

  //re-adds preview of things in cart on refresh
  for (var item in cart.items) {
    var pEl = document.createElement('p');
    var cartContentsNode = document.getElementById('cartContents');
    pEl.textContent = cart.items[item].product + ' & ' + cart.items[item].quantity;
    cartContentsNode.appendChild(pEl);
  }
  //Updates counter on refresh
  updateCounter();
}