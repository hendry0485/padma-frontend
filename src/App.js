import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
// Layout
import HomeLayout from "./layouts/HomeLayout";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MenuLayout from "./layouts/MenuLayout";

//Login
import Login from "./pages/Login";
// Pages
import Home from "./Home";
import Dashboard from "./pages/Dashboard";

//Penerimaan
import PenerimaanSupplier from "./pages/PenerimaanSupplier";
import PenerimaanSupplierEdit from "./pages/PenerimaanSupplier/edit";


//Error Pages
import ErrorPage from "./pages/ErrorPage";
import { element } from "prop-types";


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
              element:<MenuLayout/>, //this is protectedLayout
              children:[
                {
                  path:"/dashboard",
                  element:<Dashboard/>
                }
              ]
          },
          {
              element:<MainLayout/>, //this is protectedLayout
              children:[
                {
                    element:<PenerimaanSupplier title={"Penerimaan Supplier"}/>,
                    path:"/penerimaan-supplier/*",
                    children:[
                      {
                        element:<PenerimaanSupplierEdit/>,
                        path:":id"
                      }

                    ]
                }
              ]
          }
      ],
      errorElement:<ErrorPage/>
  }
]);

export default router;
