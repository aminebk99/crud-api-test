import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
}

const TableUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/users');
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const searchTermLowerCase = search.toLowerCase();
        const filtered = users.filter((user) => {
            const { username, email, firstname, lastname } = user;
            return (
                username.toLowerCase().includes(searchTermLowerCase) ||
                email.toLowerCase().includes(searchTermLowerCase) ||
                firstname.toLowerCase().includes(searchTermLowerCase) ||
                lastname.toLowerCase().includes(searchTermLowerCase)
            );
        });
        setFilteredUsers(filtered);
    }, [search, users]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/users/${id}`);
            // Remove the deleted user from both the users and filteredUsers state
            setUsers(users.filter((user) => user.id !== id));
            setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Container className="mt-5 d-flex flex-column w-100 align-items-center justify-content-center">
                <Container className="p-0 w-100 mb-5">
                    <Form.Control
                        type="search"
                        className="w-100"
                        placeholder="Search Here..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">First Name</th>
                            <th className="text-center">Last Name</th>
                            <th className="text-center">Username</th>
                            <th className="text-center">E-mail</th>
                            <th className="text-center">View</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center">No matching users found</td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="text-center">{user.id}</td>
                                    <td className="text-center">{user.firstname}</td>
                                    <td className="text-center">{user.lastname}</td>
                                    <td className="text-center">{user.username}</td>
                                    <td className="text-center">{user.email}</td>
                                    <td className="text-center">
                                    <Link to={`/user/${user.id}`}>
                                        <Button variant="primary">View</Button>
                                    </Link>
                                    </td>
                                    <td className="text-center">
                                        <Button variant="warning">Edit</Button>
                                    </td>
                                    <td className="text-center">
                                        <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default TableUsers;
