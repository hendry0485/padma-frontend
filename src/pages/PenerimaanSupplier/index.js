import { useState } from "react";
import {Form, ListGroup, Badge, Button, InputGroup, Row, Col} from "react-bootstrap";
import { BsBuilding, BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Datepicker from "../../components/datepicker";
import { NavLink } from "react-router-dom";
import NewModal from "./newModal";
import Portlet from "../../components/portlet";
import PageTitle from "../../components/pageTitle"
import UseAxios from "../../customHooks/useAxios";
import Loader from "../../components/loader";

export default function Daftar(props) {
  const getDate = new Date();
  const today = (getDate.getDate() < 10 ? '0'+getDate.getDate() : getDate.getDate() )+'/'+((getDate.getMonth()+1) < 10 ? '0' : "" )+(getDate.getMonth() + 1) + '/' + getDate.getFullYear();
  
  const [tanggalFilter, setTanggalFilter] = useState(today);
  const [isFilterChange, setIsFilterChange] = useState(false);
  const [supplier, setSupplier] = useState(0);
  // const [data, setData] = useState([])
  const [fetchParams, setFetchParams] = useState({
    method:"get",
    url:"/transaksi",
    params: {
      tgl_transaksi:tanggalFilter.split("/").reverse().join("-"),
      supplier_id:supplier,
      kode_transaksi_id:1
    }
  });
 
  const {response: data, error , loading} = UseAxios(fetchParams);
  
  const {response:gudangList , error:errorGudang, loading:loadingGudang} = UseAxios({
    method:"get",
    url:"/gudang"
  });

  const {response:supplierList , error:errorSupplier, loading:loadingSupplier} = UseAxios({
    method:"get",
    url:"/supplier"
  });

  // useEffect(() => {
  //   setData(data);
  // }, [response]);  
  

  function getTanggalFilter(value){
    setIsFilterChange(true);
    setTanggalFilter(value); 
    setFetchParams({
      method:"get",
      url:"/transaksi",
      params: {
        tgl_transaksi:value.split("/").reverse().join("-"),
        supplier_id:supplier,
        kode_transaksi_id:1
      }
    })
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testArr = Array.from(Array(10).keys());
  
  return (
    <>
      <PageTitle>
        {props.title.toString().toUpperCase()}
      </PageTitle>
      
      <Portlet>
        <Row>
          <Col
            className="pt-4" 
            xs={12} 
            md={4}
            >
            <Form >
                <>
                  <Datepicker setDateValue={getTanggalFilter} tanggal={tanggalFilter}/>
                  <InputGroup className="mt-3">
                    <InputGroup.Text><BsBuilding/></InputGroup.Text>
                    <Form.Select defaultValue={supplier} onChange={(e)=>setSupplier(e.target.value)} id="supplierSelect">
                      <option value="">Semua</option>
                      <option value="1">Kahatex (Cijerah)</option>
                      <option value="2">Kahatex (Rancaekek) </option>
                    </Form.Select>
                  </InputGroup>
                  <div className="d-grid gap-2">
                    <Button className='mt-3' size="md" variant={(!isFilterChange ? "secondary" : "warning")}>
                      <BsSearch/> Cari
                    </Button>
                  </div>
                </>
            </Form>
              {/* <NavLink  className='col d-grid' as="Button" to="/penerimaan-supplier/new">
                <Button className='mt-3' size="md" variant="primary">
                  Penerimaan Baru
                </Button>
              </NavLink> */}

              <div  className='col d-grid'>
                <Button onClick={()=>{setShow(true)}} className='col mt-3' size="md" variant="primary">
                  Penerimaan Baru 
                </Button>
              </div>
          </Col>
        </Row>
      </Portlet>
      <Portlet>
        <Row>
        <Col 
            className="pt-4"
            xs={12} 
            md={8}
            >
            <Form.Control 
                    type="search"
                    id="searcInput"
                    className="form-control-sm text-center"
                    placeholder="filter.."
                  />
            <ListGroup as="ol" className="listdiv">
              {
                /*testArr.map((val, index)=>{
                  return(

                      <ListGroup.Item 
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        > 
                        <div className="px-2">
                          <div className="fw-bold">Y3021</div>
                          <small>PT. KAHATEX (Cijerah)</small>
                        </div>
                        <div className="px-2">
                          <b>1000</b> Yard <br/> 10 Roll
                          
                        </div>
                        <div className="">
                          <NavLink as="Button" to="/penerimaan-supplier/edit">
                            <Button size="sm" variant="secondary"><FaEdit/></Button>
                          </NavLink>
                        </div>
                      </ListGroup.Item>
                  )
                })*/

                data != null && 
                data.length > 0 ? 
                data.map((val, index)=>{
                  return(
                      <ListGroup.Item 
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        > 
                        <div className="px-2">
                          <div className="fw-bold">{val.no_ref}</div>
                          <small>{val.customer_nama}</small>
                        </div>
                        <div className="px-2">
                          <b>{val.total_qty}</b> {val.nama_satuan} <br/> {val.total_unit} Roll
                          
                        </div>
                        <div className="">
                          <NavLink as="Button" to="/penerimaan-supplier/edit">
                            <Button size="sm" variant="secondary"><FaEdit/></Button>
                          </NavLink>
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
            </ListGroup>
            
          </Col>
        </Row>
      </Portlet>


      {
        show && 
        <NewModal title="Form Penerimaan Baru" show={show} gudangList={gudangList} supplierList={supplierList} handleShow={handleShow} handleClose={handleClose}/>
      }

      {(loadingGudang ||  loadingSupplier) && <Loader text={"load data gudang & supplier..."}/>}
    </>
  )
}
