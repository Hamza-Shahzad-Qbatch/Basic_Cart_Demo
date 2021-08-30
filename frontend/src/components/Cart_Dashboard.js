import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import CartProduct from './Cart';
import { fetchUserCart } from '../redux/cartHandler';
import { setCookie, getCookie } from '../CookieHandler';

function Cart_Dashboard() {
    const { cart_data } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        //if (cart_data.length === 0)
        dispatch(fetchUserCart(getCookie('Token')));
    }, [])

    return (
        <Grid container
            style={{
                paddingLeft: '70px',
                paddingRight: '70px'
            }}
            justifyContent='space-evenly'
            alignItems='center'>

            <h1 style={{ marginTop: '90px' }}>Cart Products</h1>
            <Grid
                style={{
                    marginTop: '5px'
                }}
                container
                spacing={10}
                direction='row'
                justifyContent='center'
                alignItems='center'>

                {cart_data?.map((ele, i) => {   //cart_data?.map === (cart_data && cart_data.map)
                    return (
                        <Grid key={`cart_${i}`} item xs={12} ls={12}
                            style={{
                                paddingLeft: '100px',
                                paddingRight: '100px'
                            }}>
                            <CartProduct product={ele} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    )
}

export default Cart_Dashboard;
