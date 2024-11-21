'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container } from "react-bootstrap";
import InputMask from "react-input-mask";

const FormularioVenda = () => {
    const [form, setForm] = useState({
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        kmRodados: "",
        preco: "",
        foto: "",
    });

    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validação básica
        if (!form.marca || !form.modelo || !form.ano || !form.kmRodados || !form.preco || !form.foto) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Salvar no localStorage
        const carrosVendidos = JSON.parse(localStorage.getItem("carrosVendidos")) || [];
        carrosVendidos.push(form);
        localStorage.setItem("carrosVendidos", JSON.stringify(carrosVendidos));

        // Redirecionar para a página de listagem
        router.push("/cadastrovendas");
    };

    return (
        <Container>
            <h1 className="my-4">Cadastrar Carro</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        type="text"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        placeholder="Digite a marca do carro"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formModelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                        type="text"
                        name="modelo"
                        value={form.modelo}
                        onChange={handleChange}
                        placeholder="Digite o modelo do carro"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAno">
                    <Form.Label>Ano</Form.Label>
                    <InputMask
                        mask="9999"
                        name="ano"
                        value={form.ano}
                        onChange={handleChange}
                        placeholder="Digite o ano do carro (ex: 2023)"
                        className="form-control"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCor">
                    <Form.Label>Cor</Form.Label>
                    <Form.Control
                        type="text"
                        name="cor"
                        value={form.cor}
                        onChange={handleChange}
                        placeholder="Digite a cor do carro"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formKmRodados">
                    <Form.Label>Kilometragem</Form.Label>
                    <InputMask
                        mask="999,999"
                        maskChar=""
                        name="kmRodados"
                        value={form.kmRodados}
                        onChange={handleChange}
                        placeholder="Digite a quilometragem (ex: 150,000)"
                        className="form-control"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPreco">
                    <Form.Label>Preço</Form.Label>
                    <InputMask
                        mask="R$ 999.999"
                        maskChar=""
                        name="preco"
                        value={form.preco}
                        onChange={handleChange}
                        placeholder="Digite o preço (ex: R$ 95.000)"
                        className="form-control"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFoto">
                    <Form.Label>Foto (URL)</Form.Label>
                    <Form.Control
                        type="url"
                        name="foto"
                        value={form.foto}
                        onChange={handleChange}
                        placeholder="Digite o link para a foto do carro"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </Container>
    );
};

export default FormularioVenda;
