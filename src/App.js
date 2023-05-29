import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
// Layout
import HomeLayout from "./layouts/HomeLayout";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import PenerimaanSupplier from "./pages/PenerimaanSupplier";
import Login from "./pages/Login";

//Error Pages
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
    <>
      <Routes isAuthorized={true}/>
    </>
  );
}

const router = createBrowserRouter([
  {
      element: <AuthLayout/>,
      children:[
          {
              element:<HomeLayout/>,
              children:[
                  {
                      path:"/",
                      element:<Login/>
                  },
                  {
                      path:"/login",
                      element:<Login/>
                  }
              ]
          },
          {
              element:<MainLayout/>, //this is protectedLayout
              path:"/dashboard",
              children:[
                  {
                      element:<PenerimaanSupplier/>,
                      path:"penerimaan-supplier"
                  }
              ]
          }
      ],
      errorElement:<ErrorPage/>
  }
]);

export default router;
