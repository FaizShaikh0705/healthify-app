import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from './pages/SignUp/SignUp';
import Blogs from './pages/Blogs/Blogs';
import ContactLeads from './pages/Leads/ContactLeads';
import './App.css';
import Testimonails from './pages/Testimonails/Testimonails';
import Products from './pages/Products/Products';
import Coupons from './pages/Coupons/Coupons';
import Order from './pages/Order/Order';
import Customer from './pages/Customer/Customer';
import Reviews from './pages/Reviews/Reviews'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/blogs" component={Blogs} />
          <PrivateRoute path="/coupons" component={Coupons} />
          <PrivateRoute path="/order" component={Order} />
          <PrivateRoute path="/customer" component={Customer} />
          <PrivateRoute path="/testimonails" component={Testimonails} />
          <PrivateRoute path="/reviews" component={Reviews} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/contact-leads" component={ContactLeads} />
          <Route path="/Login" component={Login} />
          <Route path="/qirah-dashboard-SignUp" component={SignUp} />
          <Route exact path="*" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
