import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Alert, Button, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const DetailsUsers = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        username: "",
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/users/${id}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
            setError('User not found');
        }
    };

    return (
        <>
            <Container className="mt-5">
                {error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <>
                        <Row className="w-100">
                            <Col xl={8}>
                                <h3>Details User</h3>
                            </Col>
                            <Col xl={2}>
                                <Link to={"/"}>
                                <Button>Back</Button>
                                </Link>
                            </Col>
                        </Row>
                        <h3><span>ID: {user.id}</span></h3>
                        <h3><span>First Name: {user.firstname}</span></h3>
                        <h3><span>Last Name: {user.lastname}</span></h3>
                        <h3><span>Email: {user.email}</span></h3>
                        <h3><span>Username: {user.username}</span></h3>
                    </>
                )}
            </Container>
        </>
    );
};

export default DetailsUsers;
