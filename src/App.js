import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, } from './components';
import NewCart from './components/Cart/NewCart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


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
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    };

    // update cart quantity 
    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart)
    }

    // remove quantity when item is removed
    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    // empty cart
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    // can use multiple effects in one useEffect
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);

    return (
        <Router>
            <div>
                <Navbar totalItemsSelected={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>

                    <Route exact path="/basket">
                        <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart} />
                    </Route>


                </Switch>


            </div>
        </Router>

    );
}

export default App;