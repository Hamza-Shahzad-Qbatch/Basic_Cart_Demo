import React, { useEffect } from 'react';
import { AppBar, Grid, Toolbar, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserState } from '../redux/userHandler';
import { clearCartState } from '../redux/cartHandler';

import { fetchUserData } from '../redux/userHandler';
import { setCookie, getCookie } from '../CookieHandler';

function Navbar() {
    const { cart_counter } = useSelector(state => state.cart);
    const { email } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('Token');
        if (token.length >= 12) {
            dispatch(fetchUserData(token));
        }
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

                        {getCookie('Token') === '' || getCookie('Token').length < 12 ?
                            <>
                                <NavLink exact activeClassName='active_class' to='/login'>
                                    <IconButton color='inherit'>Login</IconButton>
                                </NavLink>
                                <NavLink exact activeClassName='active_class' to='/signup'>
                                    <IconButton color='inherit'>SignUp</IconButton>
                                </NavLink>
                            </>
                            : <NavLink exact activeClassName='active_class' to='/login' onClick={() => {
                                setCookie('Token', '');
                                dispatch(clearUserState());
                                dispatch(clearCartState());
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
