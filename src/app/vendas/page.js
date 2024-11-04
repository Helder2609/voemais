// src/app/cadastroVenda.js
'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

const CarrosVendidosPage = () => {
    const [carrosVendidos, setCarrosVendidos] = useState([]);

    useEffect(() => {
        setCarrosVendidos(JSON.parse(localStorage.getItem('carrosVendidos')) || []);
    }, []);

    return (
        <Pagina titulo="Carros Cadastrados">
            <Link
                href="/vendas/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Cadastrar Novo Carro
            </Link>

            <Row xs={1} md={2} lg={3}>
                {carrosVendidos.length === 0 ? (
                    <p>Nenhum carro cadastrado.</p>
                ) : (
                    carrosVendidos.map((carro, index) => (
                        <Col key={index} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={carro.foto} alt={`Foto de ${carro.marca} ${carro.modelo}`} />
                                <Card.Body>
                                    <Card.Title>{carro.marca} {carro.modelo}</Card.Title>
                                    <Card.Text>
                                        <strong>Ano:</strong> {carro.ano} <br />
                                        <strong>Cor:</strong> {carro.cor} <br />
                                        <strong>Kilometragem:</strong> {carro.kmRodados} km <br />
                                        <strong>Preço:</strong> R$ {carro.preco} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Pagina>
    );
};

export default CarrosVendidosPage;
