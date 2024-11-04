'use client'
import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [carros, setCarros] = useState([]);
    const [customizacoes, setCustomizacoes] = useState([]);
    const [carroSelecionado, setCarroSelecionado] = useState(null);
    const [exibirCustomizacoes, setExibirCustomizacoes] = useState(false);

    useEffect(() => {
        setCarros(JSON.parse(localStorage.getItem('carros')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = carros.filter(item => item.id != id);
            localStorage.setItem('carros', JSON.stringify(dados));
            setCarros(dados);
            if (carroSelecionado === id) setExibirCustomizacoes(false);
        }
    }

    function carregarCustomizacoes(id) {
        const customizacoesSalvas = JSON.parse(localStorage.getItem(`customizacoes_${id}`)) || [];
        setCustomizacoes(customizacoesSalvas);
        setCarroSelecionado(id);
        setExibirCustomizacoes(true);
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
                    {carros.map((item, i) => (
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
                                    variant="secondary"
                                    onClick={() => carregarCustomizacoes(item.id)}
                                >
                                    Ver Customizações
                                </Button>
                                <Link href={`/customizacao/form/${item.id}`} className="btn btn-secondary ms-2">
                                    Customizar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Seção de customizações para o carro selecionado */}
            <Collapse in={exibirCustomizacoes}>
                <div>
                    <h3 className="mt-4">Customizações para o Carro {carros.find(carro => carro.id === carroSelecionado)?.modelo}</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tipo</th>
                                <th>Descrição</th>
                                <th>Data</th>
                                <th>Custo</th>
                                <th>Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customizacoes.map((customizacao, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{customizacao.tipo}</td>
                                    <td>{customizacao.descricao}</td>
                                    <td>{customizacao.data}</td>
                                    <td>R$ {customizacao.custo}</td>
                                    <td>
                                        {customizacao.foto && (
                                            <img
                                                src={customizacao.foto}
                                                alt="Foto da Customização"
                                                style={{ width: "75px", height: "auto" }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        </Pagina>
    );
}
