import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/Communities/HomePage';
import CommunityPage from './components/Communities/CommunityPage';
import CommunityIndex from './components/Communities/CommunityIndex';
import CreateCommunityForm from './components/Communities/CreateCommunity';
import EditCommunityForm from './components/Communities/EditCommunity';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path='/communities/new' exact={true}>
          <CreateCommunityForm />
        </ProtectedRoute>
        <Route path='/communities' exact={true}>
          <CommunityIndex />
        </Route>
        <ProtectedRoute path='/:communityId/:communityName/edit' exact={true}>
          <EditCommunityForm />
        </ProtectedRoute>
        <Route path='/:communityId/:communityName' exact={true}>
          <CommunityPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
