import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/NOMADS_MASK.jpg'
import useStyles from './styles' // use styles from styles.js

// pass prop from App to dynamically change number of items displayed in cart - i.e. "badge content"

const Navbar = ({ totalItemsSelected }) => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="NOMADS. " height="25px" className={classes.image} />
                        NOMADS.
                    </Typography>
                    <div className={classes.grow}>
                        <div className={classes.button}><IconButton aria-label="Show cart items" color="inherit">
                            {/* Display list of returned items */}
                            <Badge badgeContent={totalItemsSelected} color="secondary">
                                <ShoppingCart />
                            </Badge>



                        </IconButton>

                        </div>

                    </div>
                </Toolbar>

            </AppBar>
        </div>
    );
}

export default Navbar;