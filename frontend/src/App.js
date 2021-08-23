import React from 'react'
import Navbar from './Navbar';
import Error from './Error';
import { Route, Switch } from 'react-router-dom';
import Product_Dashboard from './Product_Dashboard';
import Cart_Dashboard from './Cart_Dashboard';

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
