import React from 'react';
import { AppBar, Grid, Toolbar, Button, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Navbar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid justify="space-between"
                        container
                        spacing={24}>
                        <Button variant="contained">Products</Button>
                        <IconButton color="inherit" style={{ float: 'right' }}>
                            <Badge badgeContent={14} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar
