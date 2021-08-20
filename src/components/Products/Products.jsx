import React from 'react';
import { Grid } from '@material-ui/core';
import Product from '../Product/Product';
// import ukHoodie from '../assets/nomadscapblack.png'
import useStyles from './styles'



const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            {/* div below adds exact amt of pixels  in height that the navbar has */}
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (<Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;