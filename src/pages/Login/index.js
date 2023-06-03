import { useFormik } from "formik";
import { Alert, Container, FloatingLabel, InputGroup } from "react-bootstrap";
import {Form, Button, Row, Col} from "react-bootstrap";
import Logo from "./Logo.png";
import "./loginContainer.css";
import DividerText from "../../components/dividerText";
import { useState } from "react";
import BarcodeReaderCamera from "../../components/barcodeReaderCamera";
import { IoCameraOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useAuthUser } from "../../customHooks/useAuthUser";
import axios from "../../api/axios";
import { useEffect } from "react";



const Login = () => {

    const [userCode, setUserCode] = useState("");
    const [loginCode, setLoginCode] = useState(false);
    const [toggleCode, setToggleCode] = useState(true)
    const [errMessage, setErrMessage] = useState('');
    const {login} = useAuthUser();

    const validate = values => {
        const errors = {}; 
        if (!values.username) {
            errors.username = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    }
    const formik = useFormik({
        initialValues:{
            username: '',
            password: '',
        },
        validate,
        onSubmit : async (values) => {
            setErrMessage("");
            try {
                await axios.get(
                  "/users",{
                    params:{
                        username:values.username,
                        PIN:values.password
                    }
                  }
                ).then(function (response) {
                  if (response.data.length > 0) {
                    setErrMessage("");
                    login(values.username);
                    // login(response.data.username);
                }else{
                    console.log(values);
                    setErrMessage("Username And Password no match");
                  }
                })
                .catch(function (error) {
                    setErrMessage(error);
                })
                .finally(function () {
                  // always executed
                });  
                // setUser(data);
                // navigate("/dashboard",{replace:true});
            } catch (err) {
                if (!err?.response) {
                    setErrMessage("No Server Response");
                }
            }
        },
    });

    const [show, setShow] = useState(false);

    const handleCloseModal = (val) => {
        setUserCode(val);
        if (val !== '') {
            setShow(false);
        }
    };

    useEffect(() => {
      if (userCode.length > 0) {
        if (userCode.toString() == "50604159") {
            login("admin32");
        }
      }
    }, [userCode])
    

    const handleShow = () => {
        setUserCode("");
        setShow(true);
    }

  return (
    <>
        <div id="loginContainer">
            <div id="loginImage">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-light">
                                <div className="title">Pelita Abadi</div>
                                <small>Login to Account</small>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="formContainer">
                <Container>
                    <Row>
                        <Col>
                            {errMessage.length > 0 ? <Alert variant="danger">
                                {errMessage}
                            </Alert> : <></>}
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group>
                                    {/* username */}
                                    <FloatingLabel 
                                        controlId="floatingUsername"
                                        label="Username"
                                        className="mb-3">
                                        <Form.Control 
                                            value={formik.values.username}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name="username"
                                            type="input"
                                            placeholder="username"
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type={formik.errors.username ? "invalid" : ""}>
                                        {formik.errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    {/* password */}
                                    <FloatingLabel 
                                        controlId="floatingPassword"
                                        label="Password"
                                        className="mb-3">
                                        <Form.Control 
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name="password"
                                            // onChange={(e)=>{setNoRef(e.target.value)}}
                                            type="password"
                                            placeholder="password"
                                        />
                                    {formik.errors.password ? <div className='form-error'>{formik.errors.password}</div> : null}
                                    </FloatingLabel>
                                </Form.Group>
                                

                                        
                                <Row>
                                    <Col className="d-grid">
                                        <Button type="submit" onClick={()=>setLoginCode(false)} disabled={formik.isSubmitting} className='mt-4' size="lg" variant="primary ">
                                        LOGIN 
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>

                    <Row >
                        <Col>
                            <DividerText>
                                atau
                            </DividerText>
                            <InputGroup>
                                <Form.Control 
                                    value={userCode}
                                    onChange={(e)=>setUserCode(e.target.value)}
                                    name="userCode"
                                    type={toggleCode ? "password" : "input"}
                                    placeholder="input kode user*"
                                    size="lg"
                                    aria-describedby="basic-addon2"
                                />

                                <InputGroup.Text onClick={()=>setToggleCode(!toggleCode)}>
                                    {toggleCode && <IoEyeOffOutline/>}
                                    {!toggleCode && <IoEyeOutline/>}
                                </InputGroup.Text>
                                <InputGroup.Text id="basic-addon2" onClick={handleShow}><IoCameraOutline/></InputGroup.Text>
                            </InputGroup>
                            
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>

        {show && <BarcodeReaderCamera handleClose={()=>setShow(false)} setCode={(val)=>handleCloseModal(val)}/>}
    </>
  )
}

export default Login;
