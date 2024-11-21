'use client';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Pagina from "@/components/Pagina";

const AgendamentoCarro = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        modeloCarro: '',
        data: '',
        horario: '',
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação simples de campos obrigatórios
        if (!formData.nome || !formData.email || !formData.modeloCarro || !formData.data || !formData.horario) {
            setAlertMessage('Por favor, preencha todos os campos.');
            setSuccess(false);
            return;
        }

        // Aqui você pode salvar os dados em localStorage ou enviar para uma API
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(formData);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        setAlertMessage('Agendamento realizado com sucesso!');
        setSuccess(true);
        setFormData({
            nome: '',
            email: '',
            modeloCarro: '',
            data: '',
            horario: '',
        });
    };

    return (
        <Pagina>
            <Container>
                <h2>Agendamento de Test Drive</h2>

                {alertMessage && (
                    <Alert variant={success ? 'success' : 'danger'}>
                        {alertMessage}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                placeholder="Seu nome"
                            />
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Seu e-mail"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Modelo do Carro</Form.Label>
                            <Form.Control
                                type="text"
                                name="modeloCarro"
                                value={formData.modeloCarro}
                                onChange={handleInputChange}
                                placeholder="Ex.: Honda Civic"
                            />
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label>Data do Test Drive</Form.Label>
                            <Form.Control
                                type="date"
                                name="data"
                                value={formData.data}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Horário</Form.Label>
                            <Form.Control
                                type="time"
                                name="horario"
                                value={formData.horario}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>

                    <Button type="submit">Agendar Test Drive</Button>
                </Form>
            </Container>
        </Pagina>
    );
};

export default AgendamentoCarro;
