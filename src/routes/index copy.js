// Layout
import HomeLayout from "../layouts/HomeLayout";
import MainLayout from "../layouts/MainLayout";
import MenuLayout from "../layouts/MenuLayout";

// Pages
import Home from "../Home";
import Dashboard from "../pages/Dashboard";
import PenerimaanSupplier from "../pages/PenerimaanSupplier";
import PenerimaanSupplierNew from "../pages/PenerimaanSupplier/new";
import PenerimaanSupplierEdit from "../pages/PenerimaanSupplier/edit";
import Assembly from "../pages/Assembly"
import RegistrasiBarcode from "../pages/RegistrasiBarcode"
import PengeluaranBarang from "../pages/PengeluaranBarang"
import ReturSupplier from "../pages/ReturSupplier"
import ReturCustomer from "../pages/ReturCustomer"
import { createBrowserRouter } from "react-router-dom";

// import renderRoutes from "./GenerateRoute.js";

const router = createBrowserRouter([
    {
        layout:HomeLayout,
        routes:[
            {
                name:'home',
                title:'Home Page',
                component: Home,
                path:'/home',
                //(optional)
                isPublic:true
            }
        ]
    },
    {
        layout:MenuLayout,
        routes:[
            {
                name:'dashboard',
                title:'Dashboard',
                hasSiderLink:'true',
                component:Dashboard,
                //(optional)
                path:'/'
            }
        ]
    },
    {
        layout:MainLayout,
        routes:[
            {
                name:'registrasi-barcode',
                title:'Registrasi Barcode [IV02]',
                hasSiderLink:'true',
                component:RegistrasiBarcode,
                //(optional)
                path:'/registrasi-barcode'
            },
            {
                name:'assembly',
                title:'Assembly (Split)  [IV03]',
                hasSiderLink:'true',
                component:Assembly,
                //(optional)
                path:'/assembly'
            },
            {
                name:'penerimaan-barang',
                title:'Penerimaan Supplier',
                hasSiderLink:'true',
                // component:PenerimaanSupplier,
                //(optional)
                // path:'/penerimaan-supplier'
                routes: [
                    {
                        name:'penerimaan-supplier-list',
                        title: 'Daftar Penerimaan Supplier',
                        hasSiderLink:'true',
                        component:PenerimaanSupplier,
                        path:'/penerimaan-supplier'
                    },{
                        name:'penerimaan-supplier-baru',
                        title: 'Form Penerimaan Supplier [PB08]',
                        hasSiderLink:'true',
                        component:PenerimaanSupplierNew,
                        path:'/penerimaan-supplier/new'
                    },{
                        name:'penerimaan-supplier-baru',
                        title: 'Form Penerimaan Supplier Edit [PB08]',
                        hasSiderLink:'true',
                        component:PenerimaanSupplierEdit,
                        path:'/penerimaan-supplier/edit'
                    }
                ]

            },
            {
                name:'pengeluaran-barang',
                title:'Pengeluaran Barang [PJ03]',
                hasSiderLink:'true',
                component:PengeluaranBarang,
                //(optional)
                path:'/pengeluaran-barang'
            },
            {
                name:'retur-supplier',
                title:'Retur (Supplier) [PB07]',
                hasSiderLink:'true',
                component:ReturSupplier,
                //(optional)
                path:'/retur-supplier'
            },
            {
                name:'retur-customer',
                title:'Retur (Customer) [PJ08]',
                hasSiderLink:'true',
                component:ReturCustomer,
                //(optional)
                path:'/retur-customer'
            }
        ]
    }
])

export default router;

