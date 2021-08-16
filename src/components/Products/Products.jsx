import React from 'react';
import { Grid } from '@material-ui/core';
import Product from '../Product/Product';
// import ukHoodie from '../assets/nomadscapblack.png'



const products = [
    {
        id: 1,
        name: "NOMADS. Hoodie UK",
        description: "Black Hoodie UK Edition",
        price: "£45",
        image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG9vZGllfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60",
    },
    {
        id: 2,
        name: "NOMADS. Baseball Cap",
        description: "Flat baseball cap",
        price: "£27",
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60",
    },
    {
        id: 3,
        name: "NOMADS. Face Mask",
        description: "Black face mask",
        price: "£8",
        image: "https://images.unsplash.com/photo-1621609764049-5ee1db3d7c35?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFncGFja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1296&q=60",
    }
]

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (<Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                    <Product product={product} />
                </Grid>
                ))}
            </Grid>
        </main>
    );
}

export default Products;