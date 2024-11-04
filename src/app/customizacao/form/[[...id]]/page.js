'use client'
import { useEffect, useState } from 'react';
import Pagina from "@/components/Pagina";
import { Form, Button } from "react-bootstrap";

export default function Customizacao({ id }) {
    const [carro, setCarro] = useState(null);
    const [customizacoes, setCustomizacoes] = useState([]);
    const [novaCustomizacao, setNovaCustomizacao] = useState({
        tipo: "",
        descricao: "",
        data: "",
        custo: "",
        foto: ""
    });

    // Mapeia os tipos de customização a seus respectivos custos
    const tiposDeCustomizacao = {
        "Pintura Especial": 1500,
        "Envelopamento": 1200,
        "Som Automotivo": 800,
        "Suspensão Abaixada": 1000,
        "Rodas Esportivas": 2000,
        "Teto Solar": 3000,
        "Interior em Couro": 2500,
        "Escapamento Esportivo": 1500,
        "Faróis de LED": 600,
        "Turbo ou Supercharger": 4000,
        "Insulfilm": 500,
        "Kit de Aerofólio": 700,
        "Película Protetora de Pintura": 1000,
        "Personalização de Bancos": 900
    };

    useEffect(() => {
        if (!id) return;

        const carros = JSON.parse(localStorage.getItem('carros')) || [];
        const carroEncontrado = carros.find(item => item.id == id);
        setCarro(carroEncontrado);

        const customizacoesSalvas = JSON.parse(localStorage.getItem(`customizacoes_${id}`)) || [];
        setCustomizacoes(customizacoesSalvas);
    }, [id]);

    function salvarCustomizacao() {
        const atualizadas = [...customizacoes, novaCustomizacao];
        setCustomizacoes(atualizadas);
        localStorage.setItem(`customizacoes_${id}`, JSON.stringify(atualizadas));
        setNovaCustomizacao({
            tipo: "",
            descricao: "",
            data: "",
            custo: "",
            foto: ""
        });
    }

    function handleTipoChange(e) {
        const tipo = e.target.value;
        setNovaCustomizacao({
            ...novaCustomizacao,
            tipo,
            custo: tiposDeCustomizacao[tipo] || "" // Define o custo com base no tipo selecionado
        });
    }

    return (
        <Pagina titulo={`Customizações do Carro ${carro?.modelo || ""}`}>
            <h2>Adicionar Customização</h2>
            <Form>
                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Tipo de Customização</Form.Label>
                    <Form.Control
                        as="select"
                        value={novaCustomizacao.tipo}
                        onChange={handleTipoChange}
                    >
                        <option value="">Selecione um tipo</option>
                        {Object.keys(tiposDeCustomizacao).map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="descricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={novaCustomizacao.descricao}
                        onChange={e => setNovaCustomizacao({ ...novaCustomizacao, descricao: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="data">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        type="date"
                        value={novaCustomizacao.data}
                        onChange={e => setNovaCustomizacao({ ...novaCustomizacao, data: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="custo">
                    <Form.Label>Custo</Form.Label>
                    <Form.Control
                        type="number"
                        value={novaCustomizacao.custo}
                        readOnly // O campo de custo é somente leitura
                    />
                </Form.Group>
                <Button variant="primary" onClick={salvarCustomizacao}>
                    Salvar Customização
                </Button>
            </Form>

            <h2 className="mt-4">Customizações Anteriores</h2>
            <ul>
                {customizacoes.map((customizacao, index) => (
                    <li key={index}>
                        <strong>Tipo:</strong> {customizacao.tipo} <br />
                        <strong>Descrição:</strong> {customizacao.descricao} <br />
                        <strong>Data:</strong> {customizacao.data} <br />
                        <strong>Custo:</strong> R$ {customizacao.custo} <br />
                    </li>
                ))}
            </ul>
        </Pagina>
    );
}
