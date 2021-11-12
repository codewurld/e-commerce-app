import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

// import classes
import useStyles from './styles'

// import props from Cart component
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {

    const classes = useStyles();


    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">
                    {item.name}
                </Typography>
                <Typography variant="h5">
                    {item.line_total.formatted_with_symbol}
                </Typography>
                <CardActions className={classes.CardActions}>
                    <div className="classes">
                        {/* decrement cart content quantity */}
                        <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-
                        </Button>

                        {/* display cart quantity */}
                        <Typography>{item.quantity}</Typography>

                        {/* increment cart content quantity  */}
                        <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+
                        </Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}



export default CartItem;