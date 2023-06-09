// import logo from './logo.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./navbar.css";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import NavItem from 'react-bootstrap/NavItem';
import { FaEllipsisV } from 'react-icons/fa';
import { BiPowerOff } from 'react-icons/bi';
import { useAuthUser } from '../../customHooks/useAuthUser';

const MenuBar = (props) => {
  const {logout} = useAuthUser();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          variant='light'
          text="primary"
          expand="lg"
          collapseOnSelect
          >
          <Container>
            <Navbar.Brand className='pt-2'>

              <Link to="/" style={{textDecoration:'none',color:'white'}}>
                PELITA ABADI
              </Link>
            </Navbar.Brand>
            <Navbar.Text>
              <span onClick={()=>setShow(true)} style={{color:'white'}}><FaEllipsisV/></span>
            </Navbar.Text>
              
            
            <Navbar.Offcanvas 
              show={show}
              bg="dark"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                    <Nav.Link style={{color:'blue'}} onClick={logout}>
                      <BiPowerOff/> logout
                    </Nav.Link>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav id="nav-menu" className='justify-content-end flex-grow-1 pe-3'>
                    {buttonList.map((button,index)=>{
                      return (
                        <Nav.Link onClick={handleClose} eventKey={index} as={NavLink} key={index} to={button.link} disabled={!button.enabled} >
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
