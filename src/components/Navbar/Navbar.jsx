import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/NOMADS_MASK.jpg'
import useStyles from './styles' // use styles from styles.js
import { Link, useLocation } from 'react-router-dom';

// pass prop from App to dynamically change number of items displayed in cart - i.e. "badge content"

const Navbar = ({ totalItemsSelected }) => {
    const classes = useStyles();
    // hook with properties to hide display (i.e. hide basket if user is in basket already)
    const location = useLocation();



    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="NOMADS. " height="25px" className={classes.image} />
                        NOMADS.
                    </Typography>
                    <div className={classes.grow} />
                    {/* if url is not basket, display cart symbol */}
                    {location.pathname !== '/basket' && (
                        <div className={classes.button}>

                            <IconButton component={Link} to="/basket" aria-label="Show cart items" color="inherit">
                                {/* Display list of returned items */}
                                <Badge badgeContent={totalItemsSelected} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>

                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;