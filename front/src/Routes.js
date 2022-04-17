/**
 * Caution: Consider this file when using react-scripts
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ShoppingCart } from 'views/Account/components';
import WithLayout from 'WithLayout';
import { Main as MainLayout} from './layouts';

import {
  Home ,
  Products,
  NotFoundCover,
  SigninSimple,
  SignupSimple,
  PasswordResetSimple,
  About,
  Account,
  Product
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={Home}
            layout={MainLayout}
          />
        )}
      />
      
      <Route
        exact
        path="/notfoundcover"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={NotFoundCover}
            layout={MainLayout}
          />
        )}
      /> 
       <Route
        exact
        path="/signin"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={SigninSimple}
            layout={MainLayout}
          />
        )}
      /> 
      <Route
        exact
        path="/signup"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={SignupSimple}
            layout={MainLayout}
          />
        )}
      /> 
       <Route
        exact
        path="/passwordreset"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={PasswordResetSimple}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/products/:category"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={Products}
            layout={MainLayout}
          />
        )}
      />
       <Route
        exact
        path="/products/product/:id"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={Product}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path="/aboutus"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={About}
            layout={MainLayout}
          />
        )}
      /> 
     {
       localStorage.getItem('jwt')&&
       <Route
       exact
       path="/account"
       render={matchProps => (
         <WithLayout
           {...matchProps}
           component={Account}
           layout={MainLayout}
         />
       )}
     /> 
     }
     {
       localStorage.getItem('jwt')&&
       <Route
       exact
       path="/account/shoppingcart"
       render={matchProps => (
         <WithLayout
           {...matchProps}
           component={ShoppingCart}
           layout={MainLayout}
         />
       )}
     /> 
     }
      <Redirect to="/notfoundcover" />

    </Switch>
  );
};

export default Routes;
/**
 * 
 * 
 *        
 */