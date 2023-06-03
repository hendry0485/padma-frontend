// import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./navbar.css";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import NavItem from 'react-bootstrap/NavItem';
import { FaRegUser } from 'react-icons/fa';
import { useAuthUser } from '../../customHooks/useAuthUser';

const MenuBar = (props) => {
  const {logout} = useAuthUser();

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
              <div style={{display:"flex",alignItems:"center", justifyContent:"space-beetween"}}>
                  <Dropdown as={NavItem} className='px-3'>
                    <Dropdown.Toggle as={Nav.Link}  className="justify-content-end"><FaRegUser/></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Navbar.Toggle/>
              </div>
            
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
