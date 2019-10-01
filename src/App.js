import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingCart from './ShoppingCart.js'
import ProductList from './ProductList.js';
import {movies} from './products.js'

class App extends Component {
  constructor(){
    super();
    
    this.state = {
      shoppingCartInventory: [],
      shoppingCartDropDown: false
    }
  }


  onToggleExpandCart = (event) =>{
    console.log(this.state.shoppingCartDropDown);
    this.setState((state) => {return {shoppingCartDropDown: !state.shoppingCartDropDown}})  
  }

  onAddToCart = (event,product) =>{
    let currentInv = this.state.shoppingCartInventory;
    currentInv.push(product);
    this.setState((state) => {return {shoppingCartInventory: currentInv}});
  }

  onUpdateCartItemQuantity =(event,item)=>{
    let quantity = event.target.value;
    let firstPositionOfItem = this.state.shoppingCartInventory.indexOf(item);
    let filteredCart = this.removeAllInstancesFromCart(item);
    for(var i = 0; i < quantity; i++){
      filteredCart.splice(firstPositionOfItem,0,item);
    }

    this.setState((state) => {
      return{shoppingCartInventory: filteredCart}
    })
      
    
  }

  onRemoveFromCart = (event,item)=>{
    let filteredCart = this.removeAllInstancesFromCart(item);
    this.setState((state) =>{
      
      return {shoppingCartInventory: filteredCart}
    });
  }

  removeAllInstancesFromCart = (itemToFilter) =>{
    return this.state.shoppingCartInventory.filter(oldItem =>  itemToFilter.name !== oldItem.name);

  }


  

  render(){
    return <div>
      <h1>hello </h1>
      <ProductList onAddToCart = {this.onAddToCart} products = {movies}/>
      <ShoppingCart shoppingCartDropDown = {this.state.shoppingCartDropDown} onToggleExpandCart={this.onToggleExpandCart} onChangeItemQuantity = {this.onUpdateCartItemQuantity} onRemove = {this.onRemoveFromCart} inventory = {this.state.shoppingCartInventory}/>
    </div>
  }
  
}


 


export default App;





/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */