// import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./navbar.css";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const MenuBar = (props) => {
  const buttonList = [
    {text:"Registrasi Barcode",
      link:'/registrasi-barcode',
      enabled:true
    },
    {text:"Penerimaan Supplier",
      link:'/penerimaan-supplier',
      enabled:true},
    {text:"Penjualan",
      link:'/pengeluaran-barang',
      enabled:true},
    {text:"Assembly",
      link:'/assembly',
      enabled:true}, 
    {text:"Retur Supplier",
      link:'/retur-supplier',
      enabled:true},
    {text:"Retur Customer",
      link:'/retur-customer',
      enabled:true},
    {text:"Waste",
      link:'/waste',
      enabled:false}
  ];

  const [setLayout, setSetLayout] = useState("");

  return (
    <>
      {['sm'].map((expand,indexKey) => (
        <Navbar 
          key={indexKey} 
          bg="light"
          variant='light' 
          expand="lg"
          collapseOnSelect
          >
          <Container>
            <Navbar.Brand>
            <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
              PELITA ABADI
            </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Offcanvas 
              bg="dark"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    MENU
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav id="nav-menu" className='justify-content-end flex-grow-1 pe-3'>
                    {buttonList.map((button,index)=>{
                      return (
                        <Nav.Link eventKey={index} as={NavLink} key={index} to={button.link} disabled={!button.enabled} >
                            {button.text.toString().toUpperCase()}
                        </Nav.Link>
                      )
                    })}
                  </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MenuBar;
