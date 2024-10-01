'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { FaEdit, FaPlusCircle, FaRegEdit, FaTrash } from "react-icons/fa";

export default function Page() {

    const [empresas, setEmpresas] = useState([])

    useEffect(() => {
        setEmpresas(JSON.parse(localStorage.getItem('empresas')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = empresas.filter(item => item.id != id)
            localStorage.setItem('empresas', JSON.stringify(dados))
            setEmpresas(dados)


        }
    }


    return (
        <Pagina titulo="Empresas">

            <Link
                href="/empresas/create"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((item, i) => (
                        <tr key={item.id}>
                            <td>

                                <Link href={`/empresas/create/edit/${item.id}`}>
                                <FaRegEdit titte="Editar"  className="text-primary me-2" />
                                
                                </Link>

                                <FaTrash titte="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)} />
                            </td>
                            <td>{item.nome}</td>
                            <td>
                                <a href={item.site} target="_blank">
                                    <img src={item.logo} width={100} />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}