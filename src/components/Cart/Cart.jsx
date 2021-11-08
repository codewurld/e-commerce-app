import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

// class properties already created in separate styles.js
import './styles'

import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart }) => {




    // cart should be empty if there are zero items in the array of line_items

    const classes = useStyles();

    // if there's no item in cart, prompt user to start adding items
    const EmptyCart = () => (
        <Typography variant="subtitle">You have no items in your shopping cart,
            <Link to="/" className={classes.link}>start adding some</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        {/* display item in cart - pass component from cartItem folder */}
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className="classes.cardDetails">
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>

        </>
    );

    if (!cart.line_items) return 'Loading...';



    return (
        <Container>
            {/* classes.toolbar pushes the container down so it appears under the nav bar */}
            <div className={classes.toolbar} />
            <Typography classes={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>

            {/* if cart item = 0 return empty otherwise return filled cart */}
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
}

export default Cart;