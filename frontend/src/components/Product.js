import React from 'react';
import { Card, Button, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { insertCartProduct } from '../redux/cartHandler';
import { useDispatch } from 'react-redux';

function Product(props) {
    const dispatch = useDispatch();

    const addProdToCart = (id) => {
        dispatch(insertCartProduct(id));
    };

    return (
        <>
            <Card
                style={{
                    minWidth: '220px',
                    backgroundColor: 'grey',
                    padding: '8px'
                }}
                variant='elevation' elevation={15}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        image={props.product.image}
                        style={{
                            width: '200px',
                            height: '150px',
                            display: 'inline',
                            objectFit: 'contain'
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.product.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='h3'>
                            <b style={{ color: 'turquoise' }}>${props.product.price}</b>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant='contained' color='default'
                        onClick={() => addProdToCart(props.product._id)}>Add to Cart</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Product;
