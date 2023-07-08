import {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { FcInTransit, FcTreeStructure, FcUndo, FcFullTrash, FcSynchronize, FcCalculator, FcLeft } from "react-icons/fc"
import { useAuthUser } from '../../customHooks/useAuthUser';
import UseAxios from "../../customHooks/useAxios";

const DashboardBox = styled.div`
    min-height:100vh;
    width:100vw;
    
`;

const IconBox = styled.p`
  font-size:2.5em;
`;

const SlideItem = styled.div`
  scroll-snap-align:start;
  scroll-snap-stop:always;
  padding:20px;
  margin-right:20px;
  min-width:35vw;
  height:150px;
  background:white;
  border-radius:10px;
`;
  
const SlideBox = styled.div`
  scroll-snap-type:x mandatory;
  scroll-padding:0 0px;
  overflow:auto;
  display:flex;
  flex-direction:row;
  align-items:start;
  justify-content:start;
  padding:20px 20px 10px 0;
  margin-left:20px;
`;


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

  const linkStyled = {
    position:"absolute",
    right:"0px",
    top:"0",  
    width:"80px",
    textAlign:"center",
    height:"100%",
    display:"flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    border:"none",
    textDecoration:"none",
    color:'black'
  }

  const btnStyled = {
    padding:'0',
    margin:'0',
    height:"100%",
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'
  }

  const iconStyled = {
    backgroundColor:"#eee",
    padding:"10px 15px",
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center'

  }

  const getDate = new Date();
  const today = (getDate.getDate() < 10 ? '0'+getDate.getDate() : getDate.getDate() )+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const [data, setData] = useState([]);
  const [tanggalFilter, setTanggalFilter] = useState(today);
  const [fetchParams, setFetchParams] = useState({
    method:"get",
    url:"/transaksi",
    params: {
      tgl_transaksi:tanggalFilter.split('/').reverse().join('-')
    }
  });

  const {response, error , loading} = UseAxios(fetchParams);

  useEffect(() => {
    setData(response);
  }, [response]);  


  return (
    <DashboardBox >
        <Row>
          <div className='m-4 text-light'>
            <h1>PROTOTYPE</h1>
          </div>
          {/* buttonList.map((button,index)=>{
            return (
              <NavLink key={index} className='col-6 col-sm-4 col-lg-3 d-grid p-1' style={{textDecoration:"none"}} to={button.link} >
                <Button className='py-3 text-left' size="sm" variant="light"  style={{boxShadow: "5px 5px 5px 0px rgba(162, 36, 37,0.5)"}}>
                    <IconBox>{button.icon}</IconBox>
                    {button.text.toString().toUpperCase()}
                </Button>
              </NavLink>
            )
          }) */}
              {/* <NavLink className='col-6 col-sm-4 col-lg-3 d-grid p-1' style={{textDecoration:"none"}} onClick={logout} >
                <Button className='py-3 text-left' size="sm" variant="light" style={{boxShadow: "5px 5px 5px 0px rgba(162, 36, 37,0.5)"}}>
                    <IconBox><FcLeft/></IconBox>
                    LOGOUT
                </Button>
              </NavLink> */}

            
        </Row>
              <SlideBox className='ps-4 mt-4'>
              {buttonList.map((button,index)=>{
                return (
                  <NavLink key={index} className='d-grid' style={{textDecoration:"none", color:"inherit"}} to={button.link} >
                    <SlideItem className='d-flex flex-column justify-content-around align-items-center text-center' style={{boxShadow: "5px 5px 5px 0px rgba(162, 36, 37,0.5)"}}>
                      <span className='fs-1'>{button.icon}</span>
                      <small style={{fontSize:"12px"}}>{button.text.toString().toUpperCase()}</small>
                    </SlideItem>
                  </NavLink>
                )
              })}
            </SlideBox>
        <Container className='my-4'>
          <Row>
            <Col>
              <ListGroup className="list-group-flush">

                {
                  data != null && 
                  data.length > 0 ? 
                  data.map((val, index)=>{
                    return(
                        <ListGroup.Item 
                          action variant="light"
                          key={index}
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                          
                          > 
                            <div as="Button" style={linkStyled}>
                              <div style={{...btnStyled, width:'60px'}}>
                                <span className="fs-3">{val.total_qty}</span>
                                <small>{val.total_unit} roll</small>
                              </div>                  
                            </div>
                            <div className="mb-1">
                              <NavLink style={{textDecorationLine:"none"}} to={`/pengeluaran-barang/${val.id}`}>
                                <div className="fs-2">{(val.nama ? val.nama : '--')}</div>
                              </NavLink>
                              <small>{val.no_ref}</small>
                            </div>

                        </ListGroup.Item>
                    )
                  }) : 
                    <ListGroup.Item > 
                      <div className="px-2">
                        <div className="fw-bold">No Data Found</div>
                        <small>--</small>
                      </div>
                    </ListGroup.Item>
                  }

                  <ListGroup.Item 
                    action variant="light"
                    as="li"
                    className="d-flex justify-content-start align-items-center mb-1"
                    > 
                    <div style={iconStyled} className='bg-warning me-3 fs-3'>
                      A
                    </div>                  
                    <div>
                      <NavLink style={{textDecorationLine:"none"}} >
                        <div className="fs-2">Destri (1)</div>
                      </NavLink>
                      <small>Mega</small>
                    </div>

                  </ListGroup.Item>

                  <ListGroup.Item 
                    action variant="light"
                    as="li"
                    className="d-flex justify-content-start align-items-center mb-1"
                    > 
                    <div style={iconStyled} className='bg-orange me-3 fs-3'>
                      J
                    </div>                  
                    <div>
                      <NavLink style={{textDecorationLine:"none"}} >
                        <div className="fs-2">Bapa Agus</div>
                      </NavLink>
                      <small>Mega</small>
                    </div>

                  </ListGroup.Item>

                  <ListGroup.Item 
                    action variant="light"
                    as="li"
                    className="d-flex justify-content-start align-items-center mb-1"
                    > 
                    <div style={iconStyled} className='bg-info me-3 fs-3'>
                      T
                    </div>                  
                    <div>
                      <NavLink style={{textDecorationLine:"none"}} >
                        <div className="fs-2">B 8816</div>
                      </NavLink>
                      <small>Salsa</small>
                    </div>

                  </ListGroup.Item>
              </ListGroup>

            </Col>
          </Row>
        </Container>
    </DashboardBox>
  )
}

export default Dashboard;
