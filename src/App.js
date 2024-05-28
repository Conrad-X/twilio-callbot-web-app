import './App.scss';
import { PublicRoute } from './Router/publicRoutes';
import { PrivateRoute } from './Router/privateRoute';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { isUserLoggedIn } from './utils/userLogInCheck';

function App() {
  const router = createBrowserRouter([
    isUserLoggedIn() ? PrivateRoute() : {},
    ...PublicRoute(),
  ]);

  return <RouterProvider router={router} />;
}

export default App;
