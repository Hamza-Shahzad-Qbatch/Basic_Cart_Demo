import dotenv from 'dotenv';
import React from 'react'
import Navbar from '../src/components/Navbar';
import Error from '../src/components/Error';
import { Route, Switch } from 'react-router-dom';
import Product_Dashboard from '../src/components/Product_Dashboard';
import Cart_Dashboard from '../src/components/Cart_Dashboard';
//require('dotenv').config();

dotenv.config();

function App() {
  return (
    <div>
      <Navbar/>

        <Switch>
          <Route path="/products" component={Product_Dashboard} />
          <Route path="/cart" component={Cart_Dashboard} />
          <Route component={Error}></Route>
        </Switch>
    </div>
  )
}

export default App
