/*
ProductList.js
===================================================================
Displays a list of the products sold. Displays graphics for the name of the product, the price, and a picture of the product
*/
import React from 'react';
import './App.css'


const ProductList = (props) =>{
    //maps product to corresponding graphical elements. A product is an object defined in products.js
    let listElements = props.products.map( (product) => {
        return <div className = "Product-in-productlist">
        {/* An image of the movie being sold */}
        <img className = "Movie-image" src = {product.image} alt = "a star wars episode"/>    
        <p >{product.name+" price: $"+product.price}</p>
        {/* Adds 1 of product to shopping cart */}
        <button type="button" className = "Add-button" onClick = {(event) =>((props.onAddToCart)(event,product))}> add</button>
        </div>} )

    return (listElements)

}

export default ProductList

