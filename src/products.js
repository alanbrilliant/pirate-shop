/*
products.js
=====================================
contains an object representation of all the products sold in the pirate store
These products are stored in an array, "movies"
Movies is then accessed in App.js
*/
import dvd4 from './assets/episode4dvd.jpg';
import dvd5 from './assets/episode5dvd.jpg';
import dvd6 from './assets/episode6dvd.jpg';
import blu4 from './assets/episode4blu.jpg';
import blu5 from './assets/episode5blu.jpg';
import blu6 from './assets/episode6blu.jpg';






export const movies = [
    {
        name: "Star Wars Episode IV DVD",
        price: 20.00,
        type: "DVD",
        image: dvd4
    },
    {
        name: "Star Wars Episode V DVD",
        price: 20.00,
        type: "DVD",
        image: dvd5

    },

    {
        name: "Star Wars Episode VI DVD",
        price: 20.00,
        type: "DVD",
        image: dvd6

    },
    {
        name: "Star Wars Episode IV Blu-Ray",   
        price: 25.00,
        type:"Blu-Ray",
        image: blu4

    },
    {
        name: "Star Wars Episode V Blu-Ray",   
        price: 25.00,
        type:"Blu-Ray",
        image:blu5

    },
    {
        name: "Star Wars Episode VI Blu-Ray",   
        price: 25.00,
        type:"Blu-Ray",
        image:blu6

    }
]