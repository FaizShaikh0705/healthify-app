import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from './pages/SignUp/SignUp';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Questions from './pages/Questions/Questions';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/questions" component={Questions} />
          <Route path="/Login" component={Login} />
          <Route path="/SignUp" component={SignUp} />
          <div>
            <Header />
            <Route exact path="*" component={Login} />
            <Footer />
          </div>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
