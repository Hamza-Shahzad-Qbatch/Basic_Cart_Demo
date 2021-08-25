import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeCartProduct, updateCartProdQuantity } from '../redux/cartHandler';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

function CartProduct(props) {

    const dispatch = useDispatch();

    const delete_cart_prod = (id) => {
        dispatch(removeCartProduct(id));
    };

    const update_cart_prod_quantity = (val) => {
        const qty = val === '' ? 1 : parseInt(val);
        dispatch(updateCartProdQuantity({
            "cart_id": props.product.cart_id, "quantity": qty
        }));
    };

    return (
        <>
            <Grid style={{ backgroundColor: '#1b5450' }}
                container
                spacing={4}
                direction="row"
                alignItems="center"
                justifyContent="space-around">

                <Grid item xs={3}>
                    <p><label style={{fontWeight: 'bolder', color: 'turquoise'}}>Name</label> : {props.product.name}</p>
                </Grid>
                <Grid item xs={3}>
                    <label style={{fontWeight: 'bolder', color: 'turquoise'}}>Quantity</label> : <input type="number" value={props.product.quantity} min="1" onChange={(e) => update_cart_prod_quantity(e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                    <p><label style={{fontWeight: 'bolder', color: 'turquoise'}}>Price</label> : ${props.product.price}</p>
                </Grid>
                <Grid item xs={3}>
                    <IconButton color="secondary" onClick={() => delete_cart_prod(props.product.cart_id)}>
                        <RemoveShoppingCartIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default CartProduct;
