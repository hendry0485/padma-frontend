// import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

function Home() {
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
    <header className="App-header">
        <h1>Main Menu </h1>
        <div className='container'>
          <div className='row my-1'>
            <div className="col d-grid">
              <Button variant="warning">Registrasi Barcode</Button>
            </div>
          </div>
 
          <div className='row p-2'>
            {buttonList.map((button,index)=>{
              return (
                <NavLink className='col-4 d-grid p-1' to={button.link} >
                  <Button className='py-3' size="sm" key={index}  variant="primary">
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
        
      </header>
  );
}

export default Home;
