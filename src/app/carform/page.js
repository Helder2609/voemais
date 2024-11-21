'use client'
import Pagina from "@/components/Pagina"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [carros, setCarros] = useState([]);
    const [manutencoes, setManutencoes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalAdicionar, setShowModalAdicionar] = useState(false); // Modal para adicionar manutenção
    const [carroSelecionado, setCarroSelecionado] = useState(null);
    const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);
    const [dataManutencao, setDataManutencao] = useState("");
    const [odometro, setOdometro] = useState("");
    const [itens, setItens] = useState([ // Itens com valores predefinidos
        { nome: 'Troca de óleo', custo: 150 },
        { nome: 'Alinhamento e balanceamento', custo: 100 },
        { nome: 'Troca de pastilhas de freio', custo: 200 }
    ]);
    const [custoTotal, setCustoTotal] = useState(0);

    useEffect(() => {
        // Carregar os carros do localStorage
        const carrosExistentes = JSON.parse(localStorage.getItem('cars')) || [];
        setCarros(carrosExistentes);
    }, []);

    useEffect(() => {
        // Carregar as manutenções do localStorage
        const manutencoesExistentes = JSON.parse(localStorage.getItem('manutencoes')) || [];
        setManutencoes(manutencoesExistentes);
    }, []);

    // Atualiza o custo total conforme os itens selecionados
    useEffect(() => {
        const total = itens.reduce((acc, item) => acc + item.custo, 0);
        setCustoTotal(total);
    }, [itens]);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = carros.filter(item => item.id !== id);
            localStorage.setItem('cars', JSON.stringify(dados));
            setCarros(dados);
        }
    }

    function excluirManutencao(id) {
        if (confirm('Deseja realmente excluir esta manutenção?')) {
            const manutencoesAtualizadas = manutencoes.filter(manutencao => manutencao.id !== id);
            localStorage.setItem('manutencoes', JSON.stringify(manutencoesAtualizadas));
            setManutencoes(manutencoesAtualizadas);
        }
    }

    function exibirManutencao(carro) {
        setCarroSelecionado(carro);
        setShowModal(true);
    }

    function fecharModal() {
        setShowModal(false);
        setCarroSelecionado(null);
    }

    function editarManutencao(manutencao) {
        setManutencaoSelecionada(manutencao);
        setDataManutencao(manutencao.data);
        setOdometro(manutencao.odometro);
        setItens(manutencao.itens);
        setCustoTotal(manutencao.custoTotal);
        setShowModalEditar(true);
    }

    function fecharModalEditar() {
        setShowModalEditar(false);
    }

    function salvarAlteracoesManutencao(e) {
        e.preventDefault();

        // Atualizar a manutenção selecionada
        const manutencaoAtualizada = {
            ...manutencaoSelecionada,
            data: dataManutencao,
            odometro: odometro,
            itens: itens,
            custoTotal: custoTotal
        };

        // Atualizar o array de manutenções no localStorage
        const manutencoesAtualizadas = manutencoes.map(manutencao =>
            manutencao.id === manutencaoSelecionada.id ? manutencaoAtualizada : manutencao
        );

        localStorage.setItem('manutencoes', JSON.stringify(manutencoesAtualizadas));

        setManutencaoSelecionada(null);
        setShowModalEditar(false);
        setShowModal(true); // Reabrir o modal de manutenções com as alterações
    }

    function adicionarManutencao() {
        setShowModalAdicionar(true);
    }

    function fecharModalAdicionar() {
        setShowModalAdicionar(false);
    }

    function salvarNovaManutencao(e) {
        e.preventDefault();

        const novaManutencao = {
            id: new Date().getTime(), // Gerando um ID único
            carroId: carroSelecionado.id,
            data: dataManutencao,
            odometro: odometro,
            itens: itens,
            custoTotal: custoTotal,
        };

        // Adicionar nova manutenção ao array de manutenções
        const manutencoesAtualizadas = [...manutencoes, novaManutencao];
        localStorage.setItem('manutencoes', JSON.stringify(manutencoesAtualizadas));

        // Atualizar estado das manutenções
        setManutencoes(manutencoesAtualizadas);
        setShowModalAdicionar(false);
    }

    return (
        <Pagina titulo="Carros">

            <Link href="/carform/form" className="btn btn-primary mb-3">
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Foto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Cor</th>
                        <th>Quilometragem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {carros.length > 0 ? (
                        carros.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={`/carform/form/${item.id}`}>
                                        <FaRegEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <MdDelete
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />
                                </td>
                                <td>
                                    {item.foto && (
                                        <img
                                            src={item.foto}
                                            alt="Foto do Carro"
                                            style={{ width: "95px", height: "auto" }}
                                        />
                                    )}
                                </td>
                                <td>{item.marca}</td>
                                <td>{item.modelo}</td>
                                <td>{item.ano}</td>
                                <td>{item.cor}</td>
                                <td>{item.quilometragem} km</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => exibirManutencao(item)} // Abrir modal de manutenções
                                    >
                                        Ver Manutenções
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Nenhum carro cadastrado.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal para Exibir e Editar Manutenções */}
            <Modal show={showModal} onHide={fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Manutenções do Carro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {carroSelecionado ? (
                        <div>
                            <h5>Manutenções de: {carroSelecionado.marca} {carroSelecionado.modelo} ({carroSelecionado.ano})</h5>
                            <Button
                                variant="success"
                                onClick={adicionarManutencao} // Abrir modal para adicionar nova manutenção
                            >
                                Adicionar Manutenção
                            </Button>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Odômetro</th>
                                        <th>Itens</th>
                                        <th>Custo Total</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {manutencoes.filter(m => m.carroId === carroSelecionado.id).map((manutencao) => (
                                        <tr key={manutencao.id}>
                                            <td>{manutencao.data}</td>
                                            <td>{manutencao.odometro}</td>
                                            <td>{manutencao.itens.map(item => item.nome).join(', ')}</td>
                                            <td>{manutencao.custoTotal}</td>
                                            <td>
                                                <FaRegEdit
                                                    title="Editar"
                                                    className="text-primary"
                                                    onClick={() => editarManutencao(manutencao)}
                                                />
                                                <MdDelete
                                                    title="Excluir"
                                                    className="text-danger"
                                                    onClick={() => excluirManutencao(manutencao.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <p>Carro não encontrado.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModal}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Editar Manutenção */}
            <Modal show={showModalEditar} onHide={fecharModalEditar}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Manutenção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={salvarAlteracoesManutencao}>
                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                value={dataManutencao}
                                onChange={(e) => setDataManutencao(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Odômetro</Form.Label>
                            <Form.Control
                                type="number"
                                value={odometro}
                                onChange={(e) => setOdometro(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Itens</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={itens.map(item => item.nome)}
                                onChange={(e) => {
                                    const selectedItens = Array.from(e.target.selectedOptions, option => {
                                        const item = itens.find(item => item.nome === option.value);
                                        // Verifica se o item foi encontrado
                                        return {
                                            nome: option.value,
                                            custo: item ? item.custo : 0 // Se o item não for encontrado, define o custo como 0
                                        };
                                    });
                                    setItens(selectedItens);
                                }}
                            >
                                {['Troca de óleo', 'Alinhamento e balanceamento', 'Troca de pastilhas de freio'].map(item => (
                                    <option key={item}>{item}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Custo Total</Form.Label>
                            <Form.Control type="number" value={custoTotal} readOnly />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Salvar Alterações
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalEditar}>Fechar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Adicionar Manutenção */}
            <Modal show={showModalAdicionar} onHide={fecharModalAdicionar}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Manutenção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={salvarNovaManutencao}>
                        <Form.Group className="mb-3">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                value={dataManutencao}
                                onChange={(e) => setDataManutencao(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Odômetro</Form.Label>
                            <Form.Control
                                type="number"
                                value={odometro}
                                onChange={(e) => setOdometro(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Itens</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={itens.map(item => item.nome)}
                                onChange={(e) => {
                                    const selectedItens = Array.from(e.target.selectedOptions, option => {
                                        const item = itens.find(i => i.nome === option.value);
                                        return {
                                            nome: option.value,
                                            custo: item ? item.custo : 0
                                        };
                                    });
                                    setItens(selectedItens);
                                }}
                            >
                                {[
                                    { nome: 'Troca de óleo', custo: 150 },
                                    { nome: 'Alinhamento e balanceamento', custo: 100 },
                                    { nome: 'Troca de pastilhas de freio', custo: 200 }
                                ].map(item => (
                                    <option key={item.nome} value={item.nome}>
                                        {item.nome} - R$ {item.custo}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Custo Total</Form.Label>
                            <Form.Control type="number" value={custoTotal} readOnly />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Salvar Manutenção
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalAdicionar}>Fechar</Button>
                </Modal.Footer>
            </Modal>

        </Pagina>
    );
}
