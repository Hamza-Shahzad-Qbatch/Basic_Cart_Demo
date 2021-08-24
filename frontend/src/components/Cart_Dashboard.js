import React, { useEffect } from 'react'
import CartProduct from './Cart';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartProducts } from '../redux/cartHandler';

function Cart_Dashboard() {

    const { cart_data } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        //if (cart_data.length === 0)
            dispatch(fetchCartProducts());
    }, [])

    return (
        <Grid container style={{ paddingLeft: '70px', paddingRight: '70px' }}
            justifyContent="space-evenly"
            alignItems="center">

            <h1>Cart Products</h1>
            <Grid style={{ marginTop: '5px' }}
                container
                spacing={10}
                direction="row"
                justifyContent="center"
                alignItems="center">

                {cart_data && cart_data.map((ele, i) => {
                    return (
                        <Grid style={{ paddingLeft: '100px', paddingRight: '100px' }} item xs={12} ls={12}>
                            <CartProduct product={ele} />
                        </Grid>
                    );
                })}

            </Grid>
        </Grid>

    )
}

export default Cart_Dashboard;
