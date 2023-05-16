import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import "./Dashboard.css";
import logo from '../../images/Logo.png'

const Dashboard = () => {
  const buttonList = [
    {text:"Penerimaan Supplier",
      link:'/penerimaan-supplier'},
    {text:"Penjualan",
      link:'/penjualan'},
    {text:"Assembly",
      link:'/assembly'}, 
    {text:"Retur Supplier",
      link:'/retur-supplier'},
    {text:"Retur Customer",
      link:'/retur-customer'},
    {text:"Waste",
      link:'/waste'}
  ];

  return (
    <div id="containerDashboard">
      {/* <h2 className='text-center'>Dashboard</h2> */}
      <img src={logo} className="App-logo" alt="logo" />
      <div className='container my-4'>
        <div className='row my-1'>
          <div className="col d-grid">
            <Button variant="warning">Registrasi Barcode</Button>
          </div>
        </div>

        <div className='row p-2'>
          {buttonList.map((button,index)=>{
            return (
              <NavLink key={index} className='col-4 d-grid p-1' to={button.link} >
                <Button className='py-3' size="sm" variant="primary">
                    {button.text.toString().toUpperCase()}
                </Button>
              </NavLink>
            )
          })}
        </div>

        <div className='row my-1'>
          <div className="col d-grid gap-2">
            <Button variant="secondary">Back</Button>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
