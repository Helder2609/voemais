// src/app/carMaintenance/agendamentos.js
'use client';

import Pagina from "@/components/Pagina";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AgendamentosPage = () => {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        setAgendamentos(JSON.parse(localStorage.getItem('agendamentos')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o agendamento?')) {
            const dados = agendamentos.filter(item => item.id !== id);
            localStorage.setItem('agendamentos', JSON.stringify(dados));
            setAgendamentos(dados);
        }
    }

    return (
        <Pagina titulo="Agendamentos de Manutenção">
            <Link
                href="/manutencao/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo Agendamento
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo de Serviço</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Localização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((item, i) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/carMaintenance/edit/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
                            </td>
                            <td>{item.serviceType}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.time}</td>
                            <td>{`Lat: ${item.latitude}, Lng: ${item.longitude}`}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
};

export default AgendamentosPage;
