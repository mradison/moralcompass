import ReactDOM from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import auth from './utils/auth';

import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import Signup from './pages/Signup.jsx';
import Groups from './pages/Groups.jsx';
import GroupSingle from './pages/GroupSingle.jsx';
import SingleContact from './pages/SingleContact.jsx';
import Contacts from './pages/Contacts.jsx';
import Login from './pages/Login';
import Error from './pages/Error';
import ActivitiesPage from './pages/ActivitiesPage.jsx';

import Scenario from './pages/Scenario.jsx';
import Admin from './pages/Admin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Homepage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/activities', element: <ActivitiesPage /> },
      { path: '/groups', element: <Groups /> },
      { path: '/groups/:groupid', element: <GroupSingle /> },
      { path: '/contacts', element: <Contacts /> },

      { path: '/scenario/:id', element: <Scenario /> },
      { path: '/admin', element: <Admin /> },

      { path: '/contacts/:contactid', element: <SingleContact /> },

      {
        path: '*',
        element: auth.loggedIn() ? <Homepage /> : <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);