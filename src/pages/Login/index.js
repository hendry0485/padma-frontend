import { useFormik } from "formik";
import { Container, FloatingLabel } from "react-bootstrap";
import {Form, Button, Row, Col} from "react-bootstrap";
import {FaSave} from 'react-icons/fa';
import "./loginContainer.css"


const Login = () => {
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
    onSubmit : (values,{setSubmitting}) => {
        setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        }, 400);
    },
    });

  return (
    <>
        <div id="loginContainer" >
            <div id="loginImage"></div>
            <div id="boxContainer">
                <h1>LOGIN PAGE</h1>
                <div className="form-container" >
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
                                <Button type="submit" disabled={formik.isSubmitting} className='mt-4' size="lg" variant="primary ">
                                LOGIN 
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login;
