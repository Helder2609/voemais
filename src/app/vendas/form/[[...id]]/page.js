'use client';
import { useState } from 'react';
import Pagina from "@/components/Pagina";
import { Form, Button } from "react-bootstrap";
import NumberFormat from 'react-number-format';

export default function CadastroVenda() {
    const [carro, setCarro] = useState({
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        preco: "",
        kmRodados: "",
        foto: ""
    });

    const [mensagem, setMensagem] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarro({ ...carro, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCarro({ ...carro, foto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!carro.marca || !carro.modelo || !carro.ano || !carro.cor || !carro.preco || !carro.kmRodados) {
            setMensagem("Por favor, preencha todos os campos.");
            return;
        }
        if (parseFloat(carro.preco.replace(/\./g, '').replace(',', '.')) <= 0) {
            setMensagem("O preço deve ser um valor positivo.");
            return;
        }
        if (parseFloat(carro.kmRodados) < 0) {
            setMensagem("A kilometragem não pode ser negativa.");
            return;
        }
        const carrosVendidos = JSON.parse(localStorage.getItem('carrosVendidos')) || [];
        carrosVendidos.push(carro);
        localStorage.setItem('carrosVendidos', JSON.stringify(carrosVendidos));

        setMensagem("Carro cadastrado com sucesso!");
        setCarro({
            marca: "",
            modelo: "",
            ano: "",
            cor: "",
            preco: "",
            kmRodados: "",
            foto: ""
        });
    };

    return (
        <Pagina titulo="Cadastro de Venda de Carros">
            <h2>Venda de Carro</h2>
            {mensagem && <div className="alert alert-info">{mensagem}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        type="text"
                        name="marca"
                        value={carro.marca}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="modelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                        type="text"
                        name="modelo"
                        value={carro.modelo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ano">
                    <Form.Label>Ano</Form.Label>
                    <Form.Control
                        type="text"
                        name="ano"
                        value={carro.ano}
                        onChange={handleChange}
                        placeholder="Ex: 2022"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cor">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control
                        type="text"
                        name="cor"
                        value={carro.cor}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kmRodados">
                    <Form.Label>Kilometragem (km)</Form.Label>
                    <NumberFormat
                        name="kmRodados"
                        value={carro.kmRodados}
                        onValueChange={({ value }) => setCarro({ ...carro, kmRodados: value })}
                        thousandSeparator={true}
                        decimalScale={0}
                        placeholder="Ex: 15000"
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="preco">
                    <Form.Label>Preço (R$)</Form.Label>
                    <NumberFormat
                        name="preco"
                        value={carro.preco}
                        onValueChange={({ value }) => setCarro({ ...carro, preco: value })}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        prefix={'R$ '}
                        placeholder="Ex: R$ 30.000,00"
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="foto">
                    <Form.Label>Escolha a Foto</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {carro.foto && (
                        <img
                            src={carro.foto}
                            alt="Pré-visualização da foto"
                            style={{ width: "100px", height: "auto", marginTop: "10px" }}
                        />
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cadastrar Carro
                </Button>
            </Form>
        </Pagina>
    );
}
