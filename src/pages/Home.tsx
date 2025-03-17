import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ListJobs } from '../components/ListJobs';
import { Header } from '../components/Header';
import { getUsername } from '../storage/user';

export const Home: React.FC = () => {
    const username = getUsername();

    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className='p-3'>
                        <Row>
                            <Col>
                                <h2 className='text-center m-3'>Servicios médicos de {username}</h2>
                                <ListJobs />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};