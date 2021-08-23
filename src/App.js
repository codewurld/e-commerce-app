import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar } from './components';


const App = () => {
    // useState for later use when product is fetched

    const [products, setProducts] = useState([]);

    // cart is empty, when item is added, cart updates
    const [cart, setCart] = useState({});

    // fetch product from commerce js DB
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    // function to retrieve items user places in cart

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    // async function to add item to cart when cart icon is clicked
    // function should take two items - the id of the product and quantity selected
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    // can use multiple effects in one useEffect
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <div>
            <Navbar totalItemsSelected={cart.total_items} />
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    );
}

export default App;