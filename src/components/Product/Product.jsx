import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';


const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    const handleAddToCart = () => onAddToCart(product.id, 1);

    return (
        <Card className={classes.root}>
            {/* necessary to have style with specified height for image to display in CardMedia as per docs */}
            <CardMedia className={classes.media} style={{ height: 0, paddingTop: '56.25%' }} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                < Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"
                />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product;