'use client';
import { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { PatternFormat } from 'react-number-format';
import { useRouter, useSearchParams } from "next/navigation";
import Pagina from "@/components/Pagina";

const CarroFormPage = () => {
    const [carro, setCarro] = useState({
        id: '',
        marca: '',
        modelo: '',
        ano: '',
        cor: '',
        preco: '',
        quilometragem: '',
        descricao: '',
        foto: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const carroId = searchParams.get("id"); // Obtém o ID da URL

    // Carregar dados do carro para edição
    useEffect(() => {
        if (carroId) {
            carregarCarroParaEdicao(carroId);
        }
    }, [carroId]);

    const carregarCarroParaEdicao = (id) => {
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        const carroExistente = carrosExistentes.find(c => c.id === parseInt(id));
        if (carroExistente) {
            setCarro(carroExistente);
            setImagePreview(carroExistente.foto);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarro({ ...carro, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                setCarro(prev => ({ ...prev, foto: base64Image }));
                setImagePreview(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const cadastrarCarro = () => {
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        const novoId = carrosExistentes.length > 0 
            ? carrosExistentes[carrosExistentes.length - 1].id + 1 
            : 1;
        const novoCarro = { ...carro, id: novoId };
        carrosExistentes.push(novoCarro);
        localStorage.setItem('cars', JSON.stringify(carrosExistentes));
    };

    const editarCarro = () => {
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        const carrosAtualizados = carrosExistentes.map(c =>
            c.id === parseInt(carro.id) ? carro : c
        );
        localStorage.setItem('cars', JSON.stringify(carrosAtualizados));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (carroId) {
            editarCarro();
        } else {
            cadastrarCarro();
        }
        router.push("/vendas");
    };

    return (
        <Pagina>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h2>{carroId ? "Editar Carro" : "Cadastrar Novo Carro"}</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="marca"
                                value={carro.marca}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label>Modelo</Form.Label>
                            <Form.Control
                                type="text"
                                name="modelo"
                                value={carro.modelo}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Ano</Form.Label>
                            <PatternFormat
                                className="form-control"
                                name="ano"
                                value={carro.ano}
                                onValueChange={(values) =>
                                    setCarro({ ...carro, ano: values.value })
                                }
                                format="####"
                                placeholder="Ex.: 2024"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label>Cor</Form.Label>
                            <Form.Control
                                type="text"
                                name="cor"
                                value={carro.cor}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Preço</Form.Label>
                            <PatternFormat
                                className="form-control"
                                name="preco"
                                value={carro.preco}
                                onValueChange={(values) =>
                                    setCarro({ ...carro, preco: values.value })
                                }
                                format="R$ ###.###,##"
                                placeholder="Ex.: R$ 30.000,00"
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} md={6}>
                            <Form.Label>Quilometragem</Form.Label>
                            <PatternFormat
                                className="form-control"
                                name="quilometragem"
                                value={carro.quilometragem}
                                onValueChange={(values) =>
                                    setCarro({ ...carro, quilometragem: values.value })
                                }
                                format="###.### km"
                                placeholder="Ex.: 150.000 km"
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                name="foto"
                                onChange={handleImageChange}
                                required={!carroId}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                            {imagePreview && <Image src={imagePreview} alt="Preview" fluid />}
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descricao"
                            value={carro.descricao}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {carroId ? "Salvar Alterações" : "Cadastrar"}
                    </Button>
                </Form>
            </Container>
        </Pagina>
    );
};

export default CarroFormPage;
