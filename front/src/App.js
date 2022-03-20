/**
 * Caution: Consider this file when using react-scripts
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
 import React from 'react';
 import { Router } from 'react-router-dom';
 import { createBrowserHistory } from 'history';
 //import Routes from './Routes';
 
 import 'react-lazy-load-image-component/src/effects/opacity.css';
 import 'leaflet/dist/leaflet.css';
 import 'assets/css/index.css';
 
 import 'swiper/css/swiper.min.css';
 import 'aos/dist/aos.css';
import Routes from 'Routes';
 
 
 const browserHistory = createBrowserHistory();
 
 const App = () => {
   return (
     <Router history={browserHistory}>
    <Routes/>
     </Router>
   );
 }
 
 /**
  * 
  * 
  * import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from 'WithLayout';
import { Main as MainLayout} from './layouts';

import {
  Home ,
  Products,
  NotFoundCover,
  SigninSimple,
  SignupSimple,
  PasswordResetSimple,
  About
} from './views';
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
        path="/products"
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
        path="/aboutus"
        render={matchProps => (
          <WithLayout
            {...matchProps}
            component={About}
            layout={MainLayout}
          />
        )}
      /> 
      <Redirect to="/notfoundcover" />
    </Switch>
  */
 export default App;