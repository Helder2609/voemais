'use client'; // Adicione esta linha no início do arquivo

import Pagina from '@/components/Pagina';
import { useState, useEffect } from 'react'; // Usar useState
import { Button, Card, Col, Container, Row, Form, Alert } from 'react-bootstrap';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api'; // Importando o GoogleMap e outros componentes necessários
import { QRCodeCanvas } from 'qrcode.react';
import { Pie } from 'react-chartjs-2';

const ComprarCarro = () => {
    const [carros, setCarros] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); // Estado para armazenar o carro selecionado
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        metodoPagamento: '',
        concessionaria: '', // Adicionando o estado para a concessionária
        numeroCartao: '',
        nomeTitular: '',
        validade: '',
        codigoSeguranca: '',
        boleto: '',
        pix: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [selectedConcessionaria, setSelectedConcessionaria] = useState(null); // Estado para controlar concessionária selecionada

    // Lista de concessionárias com coordenadas para diferentes regiões de Brasília
    const concessionarias = [
        { id: 1, nome: 'Concessionária 1 - Ceilândia', cidade: 'Ceilândia', latitude: -15.7820, longitude: -48.0160 },
        { id: 2, nome: 'Concessionária 2 - Taguatinga', cidade: 'Taguatinga', latitude: -15.8484, longitude: -48.0273 },
        { id: 3, nome: 'Concessionária 3 - Asa Sul', cidade: 'Asa Sul', latitude: -15.7802, longitude: -47.9292 },
        { id: 4, nome: 'Concessionária 4 - Asa Norte', cidade: 'Asa Norte', latitude: -15.7437, longitude: -47.8977 },
        { id: 5, nome: 'Concessionária 5 - Guará', cidade: 'Guará', latitude: -15.7831, longitude: -47.9763 },
    ];

    // Dados fictícios para o gráfico de vendas por cidade em Brasília (quantidade de vendas por cidade)
    const [vendasPorCidade, setVendasPorCidade] = useState({
        'Plano Piloto': 250,   // Aumentei para 250
        'Ceilândia': 180,      // Aumentei para 180
        'Taguatinga': 130,     // Aumentei para 130
        'Águas Claras': 110,   // Aumentei para 110
        'Samambaia': 95,       // Aumentei para 95
        'Planaltina': 70,      // Aumentei para 70
        'Sobradinho': 55,      // Aumentei para 55
    });

    // Carregar os carros disponíveis do localStorage
    useEffect(() => {
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        console.log(carrosExistentes); // Verifique se todos os carros têm um id único
        setCarros(carrosExistentes);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação simples de campos obrigatórios
        if (!formData.nome || !formData.email || !formData.metodoPagamento || !formData.concessionaria) {
            setAlertMessage('Por favor, preencha todos os campos.');
            setSuccess(false);
            return;
        }

        setAlertMessage('Compra realizada com sucesso!');
        setSuccess(true);

        // Atualizar as vendas ao finalizar a compra
        if (selectedCar && selectedConcessionaria) {
            const novaCidade = selectedConcessionaria.cidade;
            const novasVendas = { ...vendasPorCidade, [novaCidade]: (vendasPorCidade[novaCidade] || 0) + 1 };
            setVendasPorCidade(novasVendas);
        }

        // Aqui você pode salvar os dados ou realizar um processamento adicional
        setFormData({
            nome: '',
            email: '',
            metodoPagamento: '',
            concessionaria: '', // Limpa o campo da concessionária
            numeroCartao: '',
            nomeTitular: '',
            validade: '',
            codigoSeguranca: '',
            boleto: '',
            pix: '',
        });
        setSelectedCar(null); // Limpa o carro selecionado após a compra

        // Remover o carro do localStorage e atualizar o estado
        const carrosAtualizados = carros.filter((carro) => carro.id !== selectedCar.id); // Filtra o carro comprado
        setCarros(carrosAtualizados);
        localStorage.setItem('cars', JSON.stringify(carrosAtualizados)); // Atualiza o localStorage
    };

    // Função para selecionar o carro
    const handleSelectCar = (carro) => {
        setSelectedCar(carro);
    };

    // Gerar chave PIX (exemplo simples)
    const gerarQRCodePIX = () => {
        const chavePIX = '12345678900@pix.br'; // Substitua pela chave PIX real ou gerada dinamicamente
        return chavePIX;
    };

    const handleSelectConcessionaria = (concessionaria) => {
        setSelectedConcessionaria(concessionaria);
        setFormData({ ...formData, concessionaria: concessionaria.id }); // Atualiza o estado com a concessionária selecionada
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
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFB6C1' // Cores predefinidas
                ],
                borderColor: '#fff',
                borderWidth: 1,
            }],
        };

        // Configuração para o gráfico
        return (
            <div>
                <h3>Vendas por Cidade em Brasília</h3>
                <Pie data={chartData} options={{ responsive: true }} />
            </div>
        );
    };

    return (
        <Pagina>
            <Container>
                <h2>Comprar Carro</h2>

                {alertMessage && (
                    <Alert variant={success ? 'success' : 'danger'}>
                        {alertMessage}
                    </Alert>
                )}

                {/* Exibir apenas o carro selecionado com o formulário de compra */}
                {selectedCar ? (
                    <div className="mt-5">
                        <h3>Detalhes do Carro Selecionado</h3>
                        <Row>
                            {/* Exibir o card com as informações do carro */}
                            <Col md={6}>
                                <Card>
                                    <Card.Img variant="top" src={selectedCar.foto} />
                                    <Card.Body>
                                        <Card.Title>{selectedCar.marca} {selectedCar.modelo}</Card.Title>
                                        <Card.Text>
                                            <strong>Preço:</strong> R$ {selectedCar.preco}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Ano:</strong> {selectedCar.ano}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Quilometragem:</strong> {selectedCar.quilometragem} km
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Card de informações adicionais ao lado */}
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Formulário de Compra</Card.Title>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nome"
                                                    value={formData.nome}
                                                    onChange={handleInputChange}
                                                    placeholder="Seu nome"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Seu e-mail"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Método de Pagamento</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="metodoPagamento"
                                                    value={formData.metodoPagamento}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="cartao">Cartão de Crédito</option>
                                                    <option value="boleto">Boleto Bancário</option>
                                                    <option value="pix">PIX</option>
                                                </Form.Control>
                                            </Form.Group>

                                            {/* Campos Condicionais */}
                                            {formData.metodoPagamento === 'cartao' && (
                                                <>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Número do Cartão</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="numeroCartao"
                                                            value={formData.numeroCartao}
                                                            onChange={handleInputChange}
                                                            placeholder="Número do cartão"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Nome do Titular</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="nomeTitular"
                                                            value={formData.nomeTitular}
                                                            onChange={handleInputChange}
                                                            placeholder="Nome do titular"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Validade</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="validade"
                                                            value={formData.validade}
                                                            onChange={handleInputChange}
                                                            placeholder="MM/AA"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Código de Segurança</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="codigoSeguranca"
                                                            value={formData.codigoSeguranca}
                                                            onChange={handleInputChange}
                                                            placeholder="Código de segurança"
                                                        />
                                                    </Form.Group>
                                                </>
                                            )}

                                            {formData.metodoPagamento === 'boleto' && (
                                                <Form.Group className="mb-3">
                                                    <Form.Label>CPF</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="boleto"
                                                        value={formData.boleto}
                                                        onChange={handleInputChange}
                                                        placeholder="CPF"
                                                    />
                                                </Form.Group>
                                            )}

                                            {formData.metodoPagamento === 'pix' && (
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Chave PIX</Form.Label>
                                                    <QRCodeCanvas value={gerarQRCodePIX()} />
                                                </Form.Group>
                                            )}

                                            <Button variant="primary" type="submit">
                                                Finalizar Compra
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <Row>
                        {carros.map((carro, index) => (
                            <Col md={4} key={carro.id || index}> {/* Usa index como fallback, caso carro.id não esteja disponível */}
                                <Card>
                                    <Card.Img variant="top" src={carro.foto} />
                                    <Card.Body>
                                        <Card.Title>{carro.marca} {carro.modelo}</Card.Title>
                                        <Card.Text>
                                            <strong>Preço:</strong> R$ {carro.preco}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSelectCar(carro)}
                                        >
                                            Selecionar Carro
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                )}

                {selectedCar && (
                    <div className="mt-5">
                        <h3>Selecione uma Concessionária no Mapa</h3>
                        <LoadScript googleMapsApiKey="AIzaSyAy5QL0bpHsVnrFSleW-U8GtPwk4puhwoU">
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '400px' }}
                                center={{ lat: -15.7801, lng: -47.9292 }}
                                zoom={11}
                            >
                                {concessionarias.map((concessionaria) => (
                                    <Marker
                                        key={concessionaria.id}
                                        position={{ lat: concessionaria.latitude, lng: concessionaria.longitude }}
                                        onClick={() => handleSelectConcessionaria(concessionaria)}
                                    >
                                        {selectedConcessionaria?.id === concessionaria.id && (
                                            <InfoWindow>
                                                <div>{concessionaria.nome} - {concessionaria.cidade}</div>
                                            </InfoWindow>
                                        )}
                                    </Marker>
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                )}

            </Container>
        </Pagina>
    );
};

export default ComprarCarro;
