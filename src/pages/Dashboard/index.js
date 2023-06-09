import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { styled } from 'styled-components';
import { FcInTransit, FcTreeStructure, FcUndo, FcFullTrash, FcSynchronize, FcCalculator, FcLeft } from "react-icons/fc"
import { useAuthUser } from '../../customHooks/useAuthUser';

const DashboardBox = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    padding:30px;
`;

const IconBox = styled.p`
  font-size:2.5em;
`

/*
// lestari
box-shadow: 5px 5px 5px 0px rgba(14, 103, 32,0.5);
// abadi
box-shadow: 5px 5px 5px 0px rgba(70, 143, 184,0.5);
// sejati
box-shadow: 5px 5px 5px 0px rgba(162, 36, 37,0.5);
 */

const Dashboard = () => {
  const {logout} = useAuthUser();

  const buttonList = [
    {text:"Penerimaan Supplier",
      link:'/penerimaan-supplier',
      icon:<FcInTransit/>
    },
    {text:"Penjualan",
      link:'/pengeluaran-barang',
      icon:<FcCalculator/>
    },
    {text:"Assembly",
      link:'/assembly',
      icon:<FcTreeStructure/>
    }, 
    {text:"Retur Supplier",
      link:'/retur-supplier',
      icon:<FcUndo/>
    },
    {text:"Retur Customer",
      link:'/retur-customer',
      icon:<FcSynchronize/>
    },
    {text:"Waste",
      link:'/waste',
      icon:<FcFullTrash/>
    }
  ];

  return (
    <DashboardBox >
        <Row>
          <div className='mb-4 text-light'>
            <h1>PELITA ABADI</h1>
          </div>
          {buttonList.map((button,index)=>{
            return (
              <NavLink key={index} className='col-6 col-sm-4 col-lg-3 d-grid p-1' style={{textDecoration:"none"}} to={button.link} >
                <Button className='py-3 text-left' size="sm" variant="light"  style={{boxShadow: "5px 5px 5px 0px rgba(162, 36, 37,0.5)"}}>
                    <IconBox>{button.icon}</IconBox>
                    {button.text.toString().toUpperCase()}
                </Button>
              </NavLink>
            )
          })}
              <NavLink className='col-6 col-sm-4 col-lg-3 d-grid p-1' style={{textDecoration:"none"}} onClick={logout} >
                <Button className='py-3 text-left' size="sm" variant="light" style={{boxShadow: "5px 5px 5px 0px rgba(162, 36, 37,0.5)"}}>
                    <IconBox><FcLeft/></IconBox>
                    LOGOUT
                </Button>
              </NavLink>
        </Row>
    </DashboardBox>
  )
}

export default Dashboard;
