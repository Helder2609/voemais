'use client'
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

const ManutencaoFormPage = () => {
    const [carroId, setCarroId] = useState("");
    const [data, setData] = useState("");
    const [tipo, setTipo] = useState("");
    const [custo, setCusto] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!carroId || !data || !tipo || !custo) {
            alert("Preencha todos os campos.");
            return;
        }

        const novaManutencao = {
            id: Date.now(),
            carroId,
            data,
            tipo,
            custo
        };

        // Carregar manutenções do localStorage
        const manutencoes = JSON.parse(localStorage.getItem('manutencoes')) || [];
        manutencoes.push(novaManutencao);
        localStorage.setItem('manutencoes', JSON.stringify(manutencoes));

        // Redirecionar para a página de manutenções
        router.push("/manutencao");
    };

    return (
        <Container>
            <h2>Adicionar Manutenção</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="carroId" className="mb-3">
                    <Form.Label>Carro</Form.Label>
                    <Form.Control as="select" value={carroId} onChange={(e) => setCarroId(e.target.value)} required>
                        <option value="">Selecione um carro</option>
                        {/* Mapeie os carros cadastrados para as opções */}
                        {JSON.parse(localStorage.getItem('carros'))?.map(carro => (
                            <option key={carro.id} value={carro.id}>{carro.marca} {carro.modelo}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="data" className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="tipo" className="mb-3">
                    <Form.Label>Tipo de Manutenção</Form.Label>
                    <Form.Control
                        type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        placeholder="Ex: Troca de óleo"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="custo" className="mb-3">
                    <Form.Label>Custo</Form.Label>
                    <Form.Control
                        type="number"
                        value={custo}
                        onChange={(e) => setCusto(e.target.value)}
                        placeholder="R$"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Salvar Manutenção
                </Button>
            </Form>
        </Container>
    );
};

export default ManutencaoFormPage;
