import { Container, Typography, Button, Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';

// class properties already created in separate styles.js
import './styles'

import useStyles from './styles';

const Cart = ({ cart }) => {

    // cart should be empty if there are zero items in the array of line_items
    // const isEmpty = !cart.line_items.length;


    const classes = useStyles();

    // if there's no item in cart, prompt user to start adding items
    const EmptyCart = () => (
        <Typography variant="subtitle">You have no items in your shopping cart, start adding some!</Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <div>{item.name}</div>
                    </Grid>
                ))}
            </Grid>
            <div className="classes.cardDetails">
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
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
            <Typography classes={classes.title} variant="h3">Your Shopping Cart</Typography>

            {/* if cart item = 0 return empty otherwise return filled cart */}
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
}

export default Cart;