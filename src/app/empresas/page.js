'use client'

import Pagina from "@/components/Pagina"
<<<<<<< HEAD
import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
=======
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { FaEdit, FaPlusCircle, FaRegEdit, FaTrash } from "react-icons/fa";
>>>>>>> a04d136295bb94d38c4222ef47eff92a7fa04092

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
<<<<<<< HEAD
        }
    }
=======


        }
    }

>>>>>>> a04d136295bb94d38c4222ef47eff92a7fa04092

    return (
        <Pagina titulo="Empresas">

            <Link
                href="/empresas/form"
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
<<<<<<< HEAD
                                <Link href={`/empresas/form/${item.id}`}>
                                    <FaRegEdit title="Editar" className="text-primary" />
                                </Link>
                                <MdDelete
                                    title="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)}
                                />
=======

                                <Link href={`/empresas/create/edit/${item.id}`}>
                                <FaRegEdit titte="Editar"  className="text-primary me-2" />
                                
                                </Link>

                                <FaTrash titte="Excluir"
                                    className="text-danger"
                                    onClick={() => excluir(item.id)} />
>>>>>>> a04d136295bb94d38c4222ef47eff92a7fa04092
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