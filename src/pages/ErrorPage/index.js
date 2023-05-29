import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouteError } from "react-router"
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div id="error-page" className="p-5">
                        <h1>Oops!</h1>
                        <p>Sorry, an unexpected error has occurred.</p>
                        <p>
                            <i>{error.statusText || error.message}</i>
                        </p>
                        <NavLink>
                            <Button variant="secondary" to="Login" >Go Home</Button>
                        </NavLink>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}
