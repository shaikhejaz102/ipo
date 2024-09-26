import React, {lazy} from 'react'
import {
    Route,createBrowserRouter,RouterProvider
} from 'react-router-dom'
const IpoDetails = lazy(()=> import('../ipo-details/IpoDetails'));
const Ipo = lazy(()=> import('../ipo-lists/Ipo'));

const Routes = () => {

   const router = createBrowserRouter([
    {
        path: '/',
        element: <Ipo/>,
    },
    {
      path: '/Details/:id',
      element: <IpoDetails/>,
    }
   ])

  return (
    <RouterProvider router={router}/>
  )
}

export default Routes