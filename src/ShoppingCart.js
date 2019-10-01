/*
ShoppingCart.js
=====================================================
Manages both the collpased view and expanded view of the shopping cart
Collapsed view simply shows how many items are in the cart, the total price, and any applicable discounts
Expanded view displays all of the items in the shopping cart, and allows the user to change the quantity of a given item
*/

import React from 'react';
import './App.css';
import cartImg from './assets/cart.bmp'



const ShoppingCart = (props) =>{
    //Calculates the total cost of the inventory, before discounts
    let totalCost = props.inventory.reduce((acc,item) => {return acc + item.price},0) ;
    
    //discounts is an array of size 2, where index 0 is the discount for dvds, and index 1 is the discount for blu-rays
    let discounts = scanForAndApplyDiscount(props.inventory);

    //subtracts the discount amount from raw cost
    totalCost = totalCost - discounts[0] - discounts[1]

    //Displays the graphics for dvd and blu ray set discounts
    let discountGraphics = discounts.map((discount,index) =>{
        //If there is no discount, then of course don;t display anything
        if(discount !== 0){
            if (index === 0){
                return <p>{"10% discount applied to DVDs. You saved $"+discount+"!"}</p>
            } else {
                return <p>{"15% discount applied to Blu-Rays. You saved $"+discount+"!"}</p>
            }
        } else {
            return undefined
        }
    })

    //Calculates the bulk discount (having 100 items or more in your cart)
    let bulkDiscount = props.inventory.length >= 100 ? .05 * totalCost : 0;
    totalCost -= bulkDiscount


    //Displays graphic showing the bulk discount
    let bulkDiscountGraphic = bulkDiscount !== 0 ? <p>{"You have 100 items! 5% discount applied. You saved $"+bulkDiscount+"!"}</p> : undefined;
    discountGraphics.push(bulkDiscountGraphic);

    //"Condenses" inventory, meaning instead of displaying every item in the inventory, including repeats
    //the shopping cart will only display the item once, along with the quantity of that specific item in the shopping cart
    let condensedInventory = shoppingCartInventoryCondenser(props.inventory);

    //Genereates the graphics for the shopping cart items
    //Since condensedInventory is a dictionary, it is neccessary to map over the keys of the dictionary
    let inventoryList = Object.keys(condensedInventory).map((item) => {
        return <div>
            {/* The numerical input to change the quantity of an item in the cart. Max 200 */}
            <input className = "Cart-component" type ="number" max="200" onChange={(event) => {
                //This line is to prevent the DOM from reacting to an empty input, or an input greater than the max
                if (event.target.value !== "" && Math.abs(event.target.value) <= event.target.max ){
                    (props.onChangeItemQuantity)(event,condensedInventory[item][0])
                }}} 
            /> 

            {condensedInventory[item][1]+ " in cart: "}
            {condensedInventory[item][0].name + " price: $"+ condensedInventory[item][0].price}
            {/* the rmeove button entirely every instance of an item from the shopping cart */}
            <button onClick = {(event)=> (props.onRemove)(event,condensedInventory[item][0])}>remove</button>
            
        </div>  
    })


    //If the shopping cart expanded view is toggled and there are items in the shopping cart
    //then the shopping cart will expand
    if (!props.shoppingCartDropDown || props.inventory.length === 0) {
        //Collapses expanded view by setting inventory list (that contains the condensedInventory) to an empty array
        inventoryList = [];
    } else {
        //wraps inventory list in div, to show expanded view, by using css class
        inventoryList = <div className = "Shopping-cart-expanded">{inventoryList}</div>
    }
    return (
        //Renders other graphics
        <div className = {'Shopping-cart'}>
            <img className = "Cart-image" src = {cartImg} alt = "shopping cart"/>
            <p>{"Items in cart: "+props.inventory.length}</p> 
            <p>{"Total Cost: $"+totalCost}</p>
            {discountGraphics}
            <button onClick = {props.onToggleExpandCart}>expand/contract</button>
            {inventoryList}
        </div>
    )
}

//scanForAndApplyDiscount detects if a discount is present for both DVDs and BluRays, and calculates the value of each discount
//This function returns an array of size two, where the zeroth index is the dvd discount, and the first index is the blu ray discount
let scanForAndApplyDiscount = (inventory) =>{
    //A discount emerges when the customer has in their cart at least one of each dvd, or one of each blu ray
    //First, the function establishes a complete set of each type
    let discountDvdSet = ["Star Wars Episode IV DVD","Star Wars Episode V DVD","Star Wars Episode VI DVD"];
    let discountBluRaySet = ["Star Wars Episode IV Blu-Ray","Star Wars Episode V Blu-Ray","Star Wars Episode VI Blu-Ray"]
    
    //Removes elements from the "set" arrays above. When all titles from a "set" array are removed, at least one of each
    //title in the set must exist in the inventory, and a discount can be applied
    inventory.forEach(item => {
        if(discountDvdSet.includes(item.name))
            discountDvdSet.splice(discountDvdSet.indexOf(item.name),1);
        
        if(discountBluRaySet.includes(item.name))
            discountBluRaySet.splice(discountBluRaySet.indexOf(item.name),1);
        
    })

    //if a discount exists, then the discount percentage is the corresponding percentage. If not, then it's 0
    let dvdDiscountPercentage = discountDvdSet.length === 0 ? .1 : 0;
    let blueRayDiscountPercentage = discountBluRaySet.length === 0 ? .15 : 0;
    
    //Finds what the actual discount is (the amount to subtract off the total), in dollars, for both dvd and blu ray
    let dvdDiscount = dvdDiscountPercentage*(inventory.reduce((acc,item) => {
        if(item.type === "DVD") {
            return acc + item.price
        } else {
            return acc
        }
        
    },0))

    let blueRayDiscount = blueRayDiscountPercentage*(inventory.reduce((acc,item) => {
        if(item.type === "Blu-Ray") {
            return acc + item.price
        } else {
            return acc
        }
        
    },0))

    return [dvdDiscount,blueRayDiscount]

    
    

}

//"condenses" shopping cart by eliminating repeat items, and instead displaying these repeat items as a quantity
//Returns a dictionary where the keys are the item names (e.g. "Star Wars Episode IV"), and the values are arrays
// of size 2. Index 0 of the array is the item object (as defined in products.js) and index 1 is the quantity of that item
let shoppingCartInventoryCondenser = (rawInventory) => {
    
    //buckets is intended to behave like a hashtable, which uses "chaining" as the collision method
    //Essentially, if an item doesn not already exist in buckets, it gets initializes to buckets
    //If it does already exist, the count of the item increases by one
    let buckets = {}
    rawInventory.forEach(element => {
        if (element.name in buckets) 
            buckets[element.name][1] = buckets[element.name][1] + 1;
        else 
            buckets[element.name] = [element,1]
    });

    return buckets;
    



}

export default ShoppingCart;