import React from 'react';


const ProductList = (props) =>{
    let listElements = props.products.map( (product) => {
        return <div>
        {product.name+" price: $"+product.price}
        <button type="button" disabled = "" onClick = {(event) =>((props.onAddToCart)(event,product))}> hello</button>
        </div>} )

    return (listElements)

}

export default ProductList

