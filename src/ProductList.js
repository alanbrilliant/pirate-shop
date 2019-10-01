import React from 'react';
import plus from './assets/plus.png'
import './App.css'


const ProductList = (props) =>{
    let listElements = props.products.map( (product) => {
        return <div className = "Product-in-productlist">
        <img className = "Movie-image" src = {product.image} alt = "a star wars episode"/>    
        <p >{product.name+" price: $"+product.price}</p>
        <button type="button" className = "Add-button" onClick = {(event) =>((props.onAddToCart)(event,product))}> add</button>
        </div>} )

    return (listElements)

}

export default ProductList

