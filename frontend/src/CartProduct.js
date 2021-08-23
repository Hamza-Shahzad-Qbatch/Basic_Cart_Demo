import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeCartProduct } from './redux/cartProdHandler';
import { updateCartProdQuantity } from './redux/cartProdHandler';

function CartProduct(props) {

    const dispatch = useDispatch();

    const delete_cart_prod = (id) => {
        dispatch(removeCartProduct(id));
    };

    const update_cart_prod_quantity = (val) => {
        dispatch(updateCartProdQuantity({
            "cart_id": props.product.cart_id, "quantity": parseInt(val)
        }));
    };

    return (
        <Grid style={{ backgroundColor: '#1b5450' }}
            container
            spacing={4}
            direction="row"
            alignItems="center"
            justifyContent="space-around">

            <Grid item xs={3}>
                <p>Name : {props.product.name}</p>
            </Grid>
            <Grid item xs={3}>
                Quantity : <input type="number" value={props.product.quantity} min="1" onChange={(e) => update_cart_prod_quantity(e.target.value)} />
            </Grid>
            <Grid item xs={3}>
                <p>Price : ${props.product.price}</p>
            </Grid>
            <Grid item xs={3}>
                <Button color="secondary" onClick={() => delete_cart_prod(props.product.cart_id)}>Remove</Button>
            </Grid>
        </Grid>
    );
}

export default CartProduct;
