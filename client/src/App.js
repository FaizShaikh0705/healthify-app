import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from "../src/redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from './pages/SignUp/SignUp';
import Questions from './pages/Questions/Questions';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
          <Route path="/questions" component={Questions} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
