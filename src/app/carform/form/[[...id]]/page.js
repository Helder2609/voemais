'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa o hook useRouter
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaPlus, FaCalendar, FaDollarSign } from "react-icons/fa";

const tiposManutencao = [
    { nome: "Troca de óleo", custo: 120 },
    { nome: "Alinhamento e balanceamento", custo: 150 },
    { nome: "Revisão completa", custo: 800 },
    { nome: "Substituição de pneus", custo: 400 },
];

const ManutencaoFormPage = () => {
    const [veiculo, setVeiculo] = useState("");
    const [data, setData] = useState("");
    const [odometro, setOdometro] = useState("");
    const [custoTotal, setCustoTotal] = useState("");
    const [itens, setItens] = useState([{ nome: "", custo: "" }]);
    const router = useRouter(); // Inicializa o router

    const adicionarItem = () => {
        setItens([...itens, { nome: "", custo: "" }]);
    };

    const atualizarItem = (index, campo, valor) => {
        const novosItens = [...itens];
        novosItens[index][campo] = valor;
        setItens(novosItens);
    };

    const calcularCustoTotal = () => {
        const total = itens.reduce((soma, item) => soma + (parseFloat(item.custo) || 0), 0);
        setCustoTotal(total.toFixed(2));
    };

    const handleSelecionarTipo = (index, valor) => {
        const tipoSelecionado = tiposManutencao.find((tipo) => tipo.nome === valor);
        if (tipoSelecionado) {
            atualizarItem(index, "nome", tipoSelecionado.nome);
            atualizarItem(index, "custo", tipoSelecionado.custo.toFixed(2));
        } else {
            atualizarItem(index, "nome", valor);
            atualizarItem(index, "custo", "");
        }
        calcularCustoTotal();
    };

    const salvarManutencaoNoLocalStorage = (novaManutencao) => {
        const manutencoesExistentes = JSON.parse(localStorage.getItem("manutencoes")) || [];
        manutencoesExistentes.push(novaManutencao);
        localStorage.setItem("manutencoes", JSON.stringify(manutencoesExistentes));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificação para garantir que todos os campos obrigatórios estão preenchidos
        if (!veiculo || !data || !odometro || custoTotal <= 0) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const novaManutencao = {
            id: Date.now(), // Gera um ID único com base no timestamp
            veiculo,
            data,
            odometro,
            custoTotal: parseFloat(custoTotal),
            itens,
        };

        salvarManutencaoNoLocalStorage(novaManutencao);

        alert("Manutenção salva com sucesso!");
        router.push("/carform"); // Redireciona para a página de listagem
    };

    return (
        <Container className="mt-4 p-4 shadow-lg rounded bg-white" style={{ maxWidth: "600px" }}>
            <h4 className="text-center mb-4">Cadastrar nova manutenção</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="veiculo" className="mb-3">
                    <Form.Label>Selecione o veículo:</Form.Label>
                    <Form.Control
                        as="select"
                        value={veiculo}
                        onChange={(e) => setVeiculo(e.target.value)}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="PWU-6785">PWU-6785</option>
                        <option value="ABC-1234">ABC-1234</option>
                    </Form.Control>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="data">
                            <Form.Label>Data da manutenção:</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaCalendar /></InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="odometro">
                            <Form.Label>Odômetro:</Form.Label>
                            <Form.Control
                                type="text"
                                value={odometro}
                                onChange={(e) => setOdometro(e.target.value)}
                                placeholder="Ex: 32.456 KM"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="custoTotal">
                            <Form.Label>Custo total:</Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaDollarSign /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={`R$ ${custoTotal}`}
                                    readOnly
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="mt-4">Itens de manutenção:</h5>
                {itens.map((item, index) => (
                    <Row key={index} className="align-items-center mb-3">
                        <Col xs={7}>
                            <Form.Control
                                as="select"
                                value={item.nome}
                                onChange={(e) => handleSelecionarTipo(index, e.target.value)}
                                required
                            >
                                <option value="">Selecione um tipo...</option>
                                {tiposManutencao.map((tipo) => (
                                    <option key={tipo.nome} value={tipo.nome}>
                                        {tipo.nome}
                                    </option>
                                ))}
                                <option value="Outro">Outro...</option>
                            </Form.Control>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                type="number"
                                placeholder="Custo"
                                value={item.custo}
                                onChange={(e) => {
                                    atualizarItem(index, "custo", e.target.value);
                                    calcularCustoTotal();
                                }}
                                required
                                disabled={item.nome !== "Outro"}
                            />
                        </Col>
                    </Row>
                ))}
                <Button variant="outline-success" className="mb-3 d-flex align-items-center" onClick={adicionarItem}>
                    <FaPlus className="me-2" /> Adicionar outro item
                </Button>

                <Button variant="primary" type="submit" className="w-100">
                    Salvar manutenção
                </Button>
            </Form>
        </Container>
    );
};

export default ManutencaoFormPage;
