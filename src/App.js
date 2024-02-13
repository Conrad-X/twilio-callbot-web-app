import './App.css';
import { PublicRoute } from './Router/publicRoutes';
import { PrivateRoute } from './Router/privateRoute';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { isUserLoggedIn } from './utils/userLogInCheck';

function App() {
  // const loggedIn = useSelector((state) => state.loggedIn);
  console.log((isUserLoggedIn()));
  const router = createBrowserRouter([
    isUserLoggedIn() ? PrivateRoute() : {},
    ...PublicRoute(),
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
