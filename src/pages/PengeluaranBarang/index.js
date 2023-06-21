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
  
  const [fetchParams, setFetchParams] = useState({
    method:"get",
    url:"/transaksi",
    params: {
      tgl_transaksi:tanggalFilter.split("/").reverse().join("-"),
      kode_transaksi:2
    }
  });
 
  const {response: data, error , loading} = UseAxios(fetchParams);
  
  const {response:gudangList , error:errorGudang, loading:loadingGudang} = UseAxios({
    method:"get",
    url:"/gudang"
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
        kode_transaksi:2
        
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
        {props.title.toString()}

        <div className="col-xs">
          <div className="d-none d-sm-block mt-2 fw-bold fs-3">{props.title.toString().toUpperCase()}</div>
        </div>
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
                  <div className="d-grid gap-2">
                    <Button className='mt-3' size="md" variant={(!isFilterChange ? "secondary" : "warning")}>
                      <BsSearch/> Cari
                    </Button>
                  </div>
                </>
            </Form>

              <div  className='col d-grid'>
                <Button onClick={()=>{setShow(true)}} className='col mt-3' size="md" variant="primary">
                  Penjualan Baru 
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
                          <NavLink as="Button" to="/pengeluaran-barang/edit">
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
        <NewModal title="Form Penjualan Baru" show={show} gudangList={gudangList} handleShow={handleShow} handleClose={handleClose}/>
      }

      {(loadingGudang) && <Loader text={"load data gudang..."}/>}
    </>
  )
}
