import React from 'react';
import './App.css';



const ShoppingCart = (props) =>{
    let totalCost = props.inventory.reduce((acc,item) => {return acc + item.price},0) ;
    let discounts = scanForAndApplyDiscount(props.inventory);
    totalCost = totalCost - discounts[0] - discounts[1]
    let discountGraphics = discounts.map((discount,index) =>{
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
    let bulkDiscount = props.inventory.length >= 100 ? .05 * totalCost : 0;
    totalCost -= bulkDiscount

    let bulkDiscountGraphic = bulkDiscount !== 0 ? <p>{"You have 100 items! 5% discount applied. You saved $"+bulkDiscount+"!"}</p> : undefined;
    discountGraphics.push(bulkDiscountGraphic);

    let condensedInventory = shoppingCartInventoryCondenser(props.inventory);
    let inventoryList = Object.keys(condensedInventory).map((item) => {
        return <div>
            <input type ="number" onChange={(event) => {
                if (event.target.value !== ""){
                    (props.onChangeItemQuantity)(event,condensedInventory[item][0])
                }}} 
            /> 
            {condensedInventory[item][1]+ " "}
            {condensedInventory[item][0].name + " price: $"+ condensedInventory[item][0].price}
            <button onClick = {(event)=> (props.onRemove)(event,condensedInventory[item][0])}>remove</button>
            
        </div>  
    })



    if (!props.shoppingCartDropDown) {
        console.log(props.shoppingCartDropDown)
        inventoryList = [];}
    return (
        <div className = {'Shopping-cart'}>
            <p >I'm a shopping cart</p>
            <p>{"Items in cart: "+props.inventory.length}</p> 
            <p>{"Total Cost: $"+totalCost}</p>
            {discountGraphics}
            <button onClick = {props.onToggleExpandCart}>expand</button>
            {inventoryList}
        </div>
    )
}

let scanForAndApplyDiscount = (inventory) =>{
    let discountDvdSet = ["Star Wars Episode IV DVD","Star Wars Episode V DVD","Star Wars Episode VI DVD"];
    let discountBluRaySet = ["Star Wars Episode IV Blu-Ray","Star Wars Episode V Blu-Ray","Star Wars Episode VI Blu-Ray"]
    

    inventory.forEach(item => {
        if(discountDvdSet.includes(item.name))
            discountDvdSet.splice(discountDvdSet.indexOf(item.name),1);
        
        if(discountBluRaySet.includes(item.name))
            discountBluRaySet.splice(discountBluRaySet.indexOf(item.name),1);
        
    })

    let dvdDiscountPercentage = discountDvdSet.length === 0 ? .1 : 0;
    let blueRayDiscountPercentage = discountBluRaySet.length === 0 ? .15 : 0;
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

let shoppingCartInventoryCondenser = (rawInventory) => {

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