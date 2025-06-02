import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Home from './pages/Home';
import Adoption from './pages/Adoption';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Meetup from './pages/Meetup';

import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/adoption",
        element: <Adoption />
      },
      {
        path: "/inbox",
        element: <Inbox />
      },
      {
        path: "/meetup",
        element: <Meetup />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/login",
        element: <Login />
      }, 
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
