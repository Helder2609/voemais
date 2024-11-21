'use client'; // Adicione esta linha no início do arquivo

import Pagina from '@/components/Pagina';
import { useState, useEffect } from 'react'; // Importe o useState e useEffect
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import Link from 'next/link'; // Importa o Link para navegação
import { Pie } from 'react-chartjs-2'; // Importa o componente Pie do Chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'; // Importa os módulos necessários do Chart.js

// Registrar os módulos necessários para o gráfico
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ComprarCarro = () => {
    const [carros, setCarros] = useState([]);
    const [showGraph, setShowGraph] = useState(false); // Controle para mostrar o gráfico
    const [selectedCar, setSelectedCar] = useState(null); // Carro selecionado
    const [graphData, setGraphData] = useState(null); // Dados do gráfico

    // Dados fictícios para o gráfico de vendas por cidade em Brasília (quantidade de vendas por cidade)
    const vendasPorCidade = {
        'Plano Piloto': 250,   // Aumentei para 250
        'Ceilândia': 180,      // Aumentei para 180
        'Taguatinga': 130,     // Aumentei para 130
        'Águas Claras': 110,   // Aumentei para 110
        'Samambaia': 95,       // Aumentei para 95
        'Planaltina': 70,      // Aumentei para 70
        'Sobradinho': 55,      // Aumentei para 55
    };

    // Carregar os carros disponíveis do localStorage
    useEffect(() => {
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        // Verifique os carros carregados
        console.log(carrosExistentes);
        setCarros(carrosExistentes);
    }, []);

    // Função para selecionar o carro e armazenar no localStorage
    const handleSelectCar = (carro) => {
        localStorage.setItem('carroSelecionado', JSON.stringify(carro.id));
        setSelectedCar(carro);
        showSalesGraph(); // Mostrar o gráfico de vendas ao clicar na foto
    };

    // Função para mostrar o gráfico de vendas por cidade
    const showSalesGraph = () => {
        const cities = Object.keys(vendasPorCidade);
        const sales = Object.values(vendasPorCidade);

        const chartData = {
            labels: cities, // Cidades no eixo X
            datasets: [{
                label: 'Vendas por Cidade em Brasília',
                data: sales,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFB6C1' // Conjunto de cores predefinidas
                ],
                borderColor: '#fff',
                borderWidth: 1,
            }],
        };
        setGraphData(chartData);
        setShowGraph(true); // Mostrar o gráfico
    };

    // Função para finalizar a compra e remover o carro da lista
    const handleCompra = () => {
        if (selectedCar) {
            // Remover o carro da lista de carros
            const novosCarros = carros.filter(carro => carro.id !== selectedCar.id);
            setCarros(novosCarros);
            localStorage.setItem('cars', JSON.stringify(novosCarros)); // Atualiza o localStorage

            // Limpar o carro selecionado
            setSelectedCar(null);

            // Fechar o gráfico
            setShowGraph(false);
        }
    };

    return (
        <Pagina>
            <Container>
                <h2>Comprar Carro</h2>

                <Row>
                    {carros.map((carro) => {
                        const uniqueKey = carro.id || `${carro.marca}-${carro.modelo}-${Math.random()}`;
                        return (
                            <Col md={4} key={uniqueKey}>  {/* Garante uma chave única */}
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={carro.foto}
                                        onClick={() => handleSelectCar(carro)}
                                    />
                                    <Card.Body>
                                        <Card.Title>{carro.marca} {carro.modelo}</Card.Title>
                                        <Card.Text>
                                            <strong>Preço:</strong> R$ {carro.preco}
                                        </Card.Text>
                                        <Link href="/compra/form">
                                            <Button variant="primary">
                                                Comprar
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* Modal para exibir o gráfico ao clicar na foto do carro */}
                <Modal show={showGraph} onHide={() => setShowGraph(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Vendas por Cidade em Brasília</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {graphData ? (
                            <Pie data={graphData} options={{ responsive: true }} />
                        ) : (
                            <p>Carregando dados do gráfico...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowGraph(false)}>
                            Fechar
                        </Button>
                        <Button variant="success" onClick={handleCompra}>
                            Finalizar Compra
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Pagina>
    );
};

export default ComprarCarro;
