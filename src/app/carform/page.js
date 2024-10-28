'use client'

import Pagina from "@/components/Pagina"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
    const [carros, setCarros] = useState([]);

    useEffect(() => {
        setCarros(JSON.parse(localStorage.getItem('carros')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            const dados = carros.filter(item => item.id != id);
            localStorage.setItem('carros', JSON.stringify(dados));
            setCarros(dados);
        }
    }

    return (
        <Pagina titulo="Carros">
            <Link
                href="/carform/form"
                className="btn btn-primary mb-3"
            >
                <FaPlusCircle /> Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Foto</th> {/* Nova coluna para a foto */}
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                        <th>Cor</th>
                        <th>Quilometragem</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
