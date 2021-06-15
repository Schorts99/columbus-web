import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './contexts/User';
import Loading from './pages/Loading';
import SignUp from './pages/SignUp';
import Route from './components/Route';
import Home from './pages/Home';
import Layout from './layouts';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';
import Success from './pages/Success';

function App() {
  const { loadingCurrentUser } = useContext(UserContext);

  if (loadingCurrentUser) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" policy="all" authChildren={<Home />}>
          <SignUp />
        </Route>
        <Route exact path="/sign-in" policy="only-not-auth">
          <SignIn />
        </Route>
        <Route exact path="/cart" policy="only-customer">
          <Cart />
        </Route>
        <Route exact path="/success" policy="only-customer">
          <Success />
        </Route>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
