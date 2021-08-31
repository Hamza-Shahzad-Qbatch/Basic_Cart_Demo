import React, { useEffect } from 'react';
import { AppBar, Grid, Toolbar, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userHandler';
import jwt_decode from "jwt-decode";
import isEmail from 'validator/lib/isEmail';

import { fetchUserData } from '../redux/userHandler';
import { setCookie, getCookie } from '../CookieHandler';

function Navbar() {
    const { cart_counter } = useSelector(state => state.cart);
    const { email } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('Token');
        alert(token);
        dispatch(fetchUserData(token));

        // if (token) {
        //     const decoded = jwt_decode(token);
        //     if (isEmail(decoded.email) && !email) {
        //         dispatch(fetchUserData(decoded.email));
        //     }
        // }
    }, []);

    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>
                    <Grid justifyContent='space-between'
                        container
                        spacing={3}>

                        <NavLink exact activeClassName='active_class' to='/products'>
                            <IconButton color='inherit'>Products</IconButton>
                        </NavLink>

                        {!email ?
                            <>
                                <NavLink exact activeClassName='active_class' to='/login'>
                                    <IconButton color='inherit'>Login</IconButton>
                                </NavLink>
                                <NavLink exact activeClassName='active_class' to='/signup'>
                                    <IconButton color='inherit'>SignUp</IconButton>
                                </NavLink>
                            </>
                            : <NavLink exact activeClassName='active_class' to='/login' onClick={() => {
                                setCookie();
                                dispatch(logoutUser());
                            }}>
                                <IconButton color='inherit'>LogOut</IconButton>
                            </NavLink>}



                        <NavLink exact activeClassName='active_class' to='/cart'>
                            <IconButton color='inherit' style={{ float: 'right' }}>
                                <Badge badgeContent={cart_counter} color='secondary'>
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

export default Navbar;
