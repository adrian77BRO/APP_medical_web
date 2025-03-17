import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from '../components/Header';
import { Table } from '../components/Table'

export const Appoinments: React.FC = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className='p-3'>
                        <Row>
                            <Col>
                                <h1 className='text-center m-3'>Citas por atender</h1>
                                <Table />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};