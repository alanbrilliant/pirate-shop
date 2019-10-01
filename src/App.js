/*
App.js
==============================================================================
The "main" file of the app. App.js handles the state for the entire app, as well as all the event handlers
This file also initializes the product list, and the shopping cart
*/

import React, {Component} from 'react';
import './App.css';
import ShoppingCart from './ShoppingCart.js'
import ProductList from './ProductList.js';
import {movies} from './products.js'

class App extends Component {
  constructor(){
    super();
    
    //State stores the current shopping cart inventory, and whether the shopping cart is expanded
    this.state = {
      shoppingCartInventory: [],
      shoppingCartDropDown: false
    }
  }

  //Toggles the state whether the shopping cart is expanded
  onToggleExpandCart = (event) =>{
    this.setState((state) => {return {shoppingCartDropDown: !state.shoppingCartDropDown}})  
  }

  //When the add button is clicked, pushes the corresponding item to the shopping cart inventory in state
  onAddToCart = (event,product) =>{
    let currentInv = this.state.shoppingCartInventory;
    currentInv.push(product);
    this.setState((state) => {return {shoppingCartInventory: currentInv}});
  }

  //When quantity of an item is changed in the shopping cart, this updates the state
  //Essentialy, this method removes all former instances of the item in the inventory, and
  //injects the new quantity of items in the same location of the cart as the old items
  onUpdateCartItemQuantity =(event,item)=>{
    let quantity = event.target.value;
    //Grabs the position of the first instance of the item in the cart
    let firstPositionOfItem = this.state.shoppingCartInventory.indexOf(item);
    let filteredCart = this.removeAllInstancesFromCart(item);
    //Injects the items, with the updated quantity, back into the cart
    for(var i = 0; i < quantity; i++){
      filteredCart.splice(firstPositionOfItem,0,item);
    }

    this.setState((state) => {
      return{shoppingCartInventory: filteredCart}
    })
      
    
  }

  //Removes all of an item from the cart
  onRemoveFromCart = (event,item)=>{
    let filteredCart = this.removeAllInstancesFromCart(item);
    this.setState((state) =>{
      
      return {shoppingCartInventory: filteredCart}
    });
  }

  //Helper method to remove of all of one type of items from the cart
  removeAllInstancesFromCart = (itemToFilter) =>{
    return this.state.shoppingCartInventory.filter(oldItem =>  itemToFilter.name !== oldItem.name);

  }


  

  render(){
    return <div>
      <header className = "App-header">Welcome to The Pirate Shop </header>
      {/* Passes movies to product list as prop "products" */}
      <div className = "Product-list"><ProductList  onAddToCart = {this.onAddToCart} products = {movies}/>  </div>
      <ShoppingCart shoppingCartDropDown = {this.state.shoppingCartDropDown} onToggleExpandCart={this.onToggleExpandCart} onChangeItemQuantity = {this.onUpdateCartItemQuantity} onRemove = {this.onRemoveFromCart} inventory = {this.state.shoppingCartInventory}/>
    </div>
  }

}

export default App;
