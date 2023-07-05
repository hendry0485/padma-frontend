import { useState, useEffect } from "react";
import {Form, ListGroup, Badge, Button, Container, Row, Col} from "react-bootstrap";
import { BsBuilding, BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Datepicker from "../../components/datepicker";
import { NavLink, Navigate } from "react-router-dom";
import NewModal from "./newModal";
import Portlet from "../../components/portlet";
import PortletNoPadding from "../../components/portletNoPadding";
import PageTitle from "../../components/pageTitle"
import UseAxios from "../../customHooks/useAxios";
import Loader from "../../components/loader";
import DividerText from "../../components/dividerText";
import { styled } from "styled-components";

const InfoRoll = styled.div`
  position:absolute;
  right:0px;
  top:0;
  width:100px;
  text-align:center;
  height:100%;
  background:rgba(100,100,100,0.1);
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align:center;
  border:none;
`

export default function Daftar(props) {
  const linkStyled = {
    position:"absolute",
    right:"0px",
    top:"0",  
    width:"60px",
    textAlign:"center",
    height:"100%",
    background: "rgba(0,0,0,0.1)",
    border:"none",
    textDecoration:"none",
    color:'black',
    padding:'5px 0px'
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

  const tblEvenRow = {
    backgroundColor:'#eee'
  }

  const getDate = new Date();
  const today = (getDate.getDate() < 10 ? '0'+getDate.getDate() : getDate.getDate() )+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const [tanggalFilter, setTanggalFilter] = useState(today);
  const [isFilterChange, setIsFilterChange] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState('');

  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  
  const [fetchParams, setFetchParams] = useState({
    method:"get",
    url:"/transaksi",
    params: {
      tgl_transaksi:tanggalFilter.split('/').reverse().join('-'),
      kode_transaksi_id:3,
    }
  });
 
  const {response, error , loading} = UseAxios(fetchParams);
  
  const {response:gudangList , error:errorGudang, loading:loadingGudang} = UseAxios({
    method:"get",
    url:"/gudang"
  });

  useEffect(() => {
    setData(response);
  }, [response]);  

  useEffect(()=>{
    filterData(textFilter);
  },[data])
  
  const searchData = () =>{
    setFetchParams({
      method:"get",
      url:"/transaksi",
      params: {
        tgl_transaksi:tanggalFilter.split('/').reverse().join('-'),
        kode_transaksi_id:3,
      }
    });
    setIsFilterChange(false);
    handleCloseFilter();

  }

  function getTanggalFilter(value){
    setIsFilterChange(true);
    setTanggalFilter(value); 
    setFetchParams({
      method:"get",
      url:"/transaksi",
      params: {
        tgl_transaksi:tanggalFilter.split('/').reverse().join('-'),
        kode_transaksi:2
        
      }
    })
  }

  const filterData = (val) => {
    setTextFilter(val);
    const nData = JSON.parse(JSON.stringify(data));
    if (val.length > 0) {
      const nList = nData.filter((objList => {
        return Object.keys(objList).some(objProp=>{
          if (objList[objProp] !== null && objList[objProp].length > 0 && !Array.isArray(objList[objProp]) ) {
            return objList[objProp].toLowerCase().includes(val.toLowerCase());  
          }
  
          return false;
        })
      }));
      setFilteredData(nList);
    }else{
      setFilteredData(nData);
    }
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goDetail = (id) => {
    console.log('ya');
    <Navigate to={`/pengeluaran-barang/${id}`}/>
  }

  
  return (
    <>

      <PageTitle icon={props.icon}>
        {props.title.toString().toUpperCase()} <br/>
      </PageTitle>

        
        <Portlet>
          <Row>
            <Col
              className="d-grid" 
              xs={12} 
              md={4}
              >

              <Button className="mt-4" variant="primary">
                + Baru
              </Button>
              <hr/>
              Filter : 
              {
              showFilter ?
                <Form >
                    <>
                      <Datepicker setDateValue={getTanggalFilter} tanggal={tanggalFilter}/>
                      <div className="d-grid gap-2">
                        <Button className='mt-3' onClick={()=>searchData()} size="md" variant={(!isFilterChange ? "secondary" : "warning")}>
                          <BsSearch/> Cari
                        </Button>
                      </div>
                    </>
                </Form>
                :
                <h4 className="">
                  <Badge bg="secondary" onClick={()=>handleShowFilter()} >{tanggalFilter}</Badge>
                </h4>
              }
            </Col>
          </Row>
        </Portlet>
      <Container>
        <Row>
          <Col 
            className="pt-2"
            xs={12} 
            md={8}
            >
            <ListGroup as="ol" className="list-group-flush">
              {
              // optional for search bar
              /* <ListGroup.Item
                style={{
                backgroundColor:(textFilter.length > 0 ? 'lightpink' : 'white')
              }}>
                <Form.Control 
                    type="search"
                    id="searcInput"
                    className="form-control-sm text-center fw-bold"
                    placeholder="&#x1F50D;&#xFE0E; Search.."
                    value={textFilter}
                    onChange={(e)=>filterData(e.target.value)}
                    style={{border:'none', backgroundColor:'transparent'}}
                  />
              </ListGroup.Item> */}
              {

                filteredData != null && 
                filteredData.length > 0 ? 
                filteredData.map((val, index)=>{
                  return(
                      <ListGroup.Item 
                        action variant="light"
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        onClick={()=>goDetail(val.id)}
                        
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
                      <div className="fw-medium">No Data Found</div>
                      <small>--</small>
                    </div>
                  </ListGroup.Item>
              }

                <ListGroup.Item 
                  action variant="light"
                  as="li"
                  className=""
                  > 
                  <div style={{position:'relative'}} 
                    className="d-flex justify-content-between align-items-start mb-1">
                    <div as="Button" style={linkStyled}>
                      <div style={{...btnStyled, width:'60px'}}>
                        6 <small>Item</small>
                      </div>                  
                    </div>
                      
                    <div>
                      <NavLink style={{textDecorationLine:"none"}} >
                        <div className="fs-2">Mega</div>
                      </NavLink>
                      <small>Anthony (1)</small>
                    </div>
                  </div>

                </ListGroup.Item>
                
                <ListGroup.Item 
                  action variant="light"
                  as="li"
                  className="pb-3"
                  > 
                  <div style={{position:'relative'}} 
                    className="d-flex justify-content-between align-items-start mb-1">
                    <div as="Button" style={linkStyled}>
                      <div style={{...btnStyled, width:'60px'}}>
                        edit
                      </div>                  
                    </div>
                      
                    <div>
                      <NavLink style={{textDecorationLine:"none"}} >
                        <div className="fs-2">Mega</div>
                      </NavLink>
                      <small>Anthony (1)</small>
                    </div>
                  </div>
                  <div>
                    <table width={'100%'} style={{fontSize:"14px"}}>
                      <tbody>
                        <tr>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>RJN Black</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>
                        <tr style={tblEvenRow}>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>Heavy Taslan Deep Maroon</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>

                        <tr>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>RJN Blue</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>
                        <tr style={tblEvenRow}>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>Heavy Taslan White</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>

                        <tr>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>RJN Blue</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>
                        <tr style={tblEvenRow}>
                          <td style={{padding:"1px 5px",textAlign:'left'}}>Heavy Taslan White</td>
                          <td style={{padding:"1px 5px"}}>35</td>
                          <td style={{padding:"1px 5px"}}>65</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </ListGroup.Item>

            </ListGroup>
            
          </Col>
        </Row>
      </Container>


      {
        show && 
        <NewModal title="Form Assembly Baru" show={show} gudangList={gudangList} handleShow={handleShow} handleClose={handleClose}/>
      }

      {(loadingGudang) && <Loader text={"load data gudang..."}/>}
    </>
  )
}
