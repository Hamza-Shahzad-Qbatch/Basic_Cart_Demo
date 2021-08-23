import React from 'react';
import Paper from '@material-ui/core/Paper';

function Product(props) {
    return (
        <Paper style={{ backgroundColor: '#1b5450', padding: '8px', width: 'fit-content', textAlign: 'center'}} variant="outlined" elevation={15}>
            <p>Name : {props.product.name}</p>
            <p>Price : ${props.product.price}</p>
        </Paper>
    )
}

export default Product;
