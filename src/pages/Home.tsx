import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ListJobs } from '../components/ListJobs';

export const Home: React.FC = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className='p-3'>
                        <Row>
                            <Col>
                                <h1 className='text-center m-3'>Servicios médicos</h1>
                                <ListJobs />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};