import React from 'react';
import { AppBar, Grid, Toolbar, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
    const { cart_counter } = useSelector(state => state.cartReducer);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid justifyContent="space-between"
                        container
                        spacing={3}>

                        <NavLink exact activeClassName="active_class" to="/products">
                            <IconButton color="inherit">Products</IconButton>
                        </NavLink>

                        <NavLink exact activeClassName="active_class" to="/cart">
                            <IconButton color="inherit" style={{ float: 'right' }}>
                                <Badge badgeContent={cart_counter} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </NavLink>
                    </Grid>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar
