'use client';
import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/navigation";

const CarrosVendidosPage = () => {
    const [carrosVendidos, setCarrosVendidos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Carregar os carros do localStorage
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        setCarrosVendidos(carrosExistentes);
    }, []);

    const excluirCarro = (carro) => {
        const carrosAtualizados = carrosVendidos.filter(c => c.id !== carro.id);
        setCarrosVendidos(carrosAtualizados);
        localStorage.setItem('cars', JSON.stringify(carrosAtualizados)); // Atualizar localStorage
    };

    const editarCarro = (carro) => {
        // Enviar o ID para a página de edição para localizar o carro a ser editado
        router.push(`/vendas/form?id=${carro.id}`);
    };

    return (
        <Pagina>
            <Container>
                <h2>Carros Cadastrados</h2>
                <Link href="/vendas/form" className="btn btn-success mb-3">
                    <FaPlusCircle /> Adicionar Carro
                </Link>
                <Row>
                    {carrosVendidos.length > 0 ? (
                        carrosVendidos.map((carro) => (
                            <Col key={carro.id} sm={12} md={6} lg={4}>
                                <Card>
                                    <Card.Img variant="top" src={carro.foto} />
                                    <Card.Body>
                                        <Card.Title>{carro.marca} {carro.modelo}</Card.Title>
                                        <Card.Text>Ano: {carro.ano}</Card.Text>
                                        <Card.Text>Ano: {carro.preco}</Card.Text>
                                        <Card.Text>Quilometragem: {carro.quilometragem} km</Card.Text>
                                        <Button variant="primary" onClick={() => editarCarro(carro)}>Editar</Button>
                                        <Button variant="danger" onClick={() => excluirCarro(carro)}>Excluir</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Nenhum carro cadastrado.</p>
                    )}
                </Row>
            </Container>
        </Pagina>
    );
};

export default CarrosVendidosPage;
