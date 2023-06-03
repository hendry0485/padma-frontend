import React from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import "./Dashboard.css";
import { Col, Container, Row } from 'react-bootstrap';
import { styled } from 'styled-components';
import { FcInTransit, FcTreeStructure, FcUndo, FcFullTrash, FcSynchronize, FcCalculator } from "react-icons/fc"

const DashboardBox = styled.div`
    background-color: white;
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    padding:30px;
`;

const IconBox = styled.p`
  font-size:20px;
`


const Dashboard = () => {
  const buttonList = [
    {text:"Penerimaan Supplier",
      link:'/penerimaan-supplier',
      icon:<FcInTransit/>
    },
    {text:"Penjualan",
      link:'/penjualan',
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
    <DashboardBox>
        <Row>
          {buttonList.map((button,index)=>{
            return (
              <NavLink key={index} className='col-6 col-sm-4 col-lg-3 d-grid p-1' style={{textDecoration:"none"}} to={button.link} >
                <Button className='py-3 text-left' size="sm" variant="outline-secondary">
                    <IconBox>{button.icon}</IconBox>
                    {button.text.toString().toUpperCase()}
                </Button>
              </NavLink>
            )
          })}
        </Row>
    </DashboardBox>
  )
}

export default Dashboard;
