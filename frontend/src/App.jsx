import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation.jsx';
import AllSpots from './components/AllSpots/AllSpots.jsx';
import SpotDetails from './components/SpotDetails/SpotDetails.jsx';
import { NewSpot } from './components/NewSpot/NewSpot.jsx';
import ManageSpots from './components/ManageSpots/ManageSpots.jsx';
import UpdateSpot from './components/UpdateSpot/UpdateSpot.jsx';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: `/spots/:spotId`,
        element: <SpotDetails />
      }, 
      {
        path: '/spots/new',
        element: <NewSpot />
      }, 
      {
        path: '/spots/current',
        element: <ManageSpots />
      }, 
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;