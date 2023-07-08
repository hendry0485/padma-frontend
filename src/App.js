import { createBrowserRouter } from "react-router-dom";
// Layout
import HomeLayout from "./layouts/HomeLayout";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MenuLayout from "./layouts/MenuLayout";

//Login
import Login from "./pages/Login";
// Pages
import Home from "./Home";
import Dashboard from "./pages/Dashboard/prototype";

//Penerimaan
import PenerimaanSupplier from "./pages/PenerimaanSupplier";
import PenerimaanSupplierEdit from "./pages/PenerimaanSupplier/edit";

//Penjualan
import Penjualan from "./pages/PengeluaranBarang";
import PenjualanEdit from "./pages/PengeluaranBarang/edit";

//Assembly
import Assembly from "./pages/Assembly";
import AssemblyEdit from "./pages/Assembly/edit";


//Error Pages
import ErrorPage from "./pages/ErrorPage";
import { element } from "prop-types";

import { FcInTransit, FcTreeStructure, FcUndo, FcFullTrash, FcSynchronize, FcCalculator, FcLeft } from "react-icons/fc"



function App() {
  return (
    <>
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
                    path:"/penerimaan-supplier/",
                    children:[
                      {
                        element:<PenerimaanSupplier icon={<FcInTransit/>}  title={"Penerimaan Supplier"}/>,
                        path:""
                      },
                      {
                        element:<PenerimaanSupplierEdit  title={"Edit Penerimaan Supplier"}/>,
                        path:":id"
                      }
                    ]
                },
                {
                  path:"/pengeluaran-barang/",
                  children:[
                    {
                      element:<Penjualan icon={<FcCalculator/>} title={"Penjualan"}/>,
                      path:""
                    },
                    {
                      element:<PenjualanEdit  title={"Edit Penjualan"}/>,
                      path:":id"
                    }
                  ]
              },
              {
                path:"/assembly/",
                children:[
                  {
                    element:<Assembly title={"Assembly (Split)"}/>,
                    path:""
                  },
                  {
                    element:<AssemblyEdit  title={"Edit Assembly"}/>,
                    path:":id"
                  }
                ]
            }
              ]
          }
      ],
      errorElement:<ErrorPage/>
  }
], 
//{ basename: "/hendry-dev" }//only in production
);

export default router;
