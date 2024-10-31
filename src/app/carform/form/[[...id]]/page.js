'use client'

import Pagina from "@/components/Pagina";
import CarroValidator from "@/validators/CarroValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import InputMask from "react-input-mask";
import { useState } from "react";

const marcasCarros = {
    "Volkswagen": ["Fusca", "Gol", "T-Cross", "Tiguan", "Jetta", "Passat"],
    "Honda": ["Civic", "HR-V", "Fit", "CR-V"],
    "Toyota": ["Corolla", "Hilux", "Etios", "Camry", "Yaris"],
    "Chevrolet": ["Onix", "Tracker", "Cruze", "S10"],
    "Ford": ["Fiesta", "EcoSport", "Ranger", "Mustang", "Fusion"],
    "Renault": ["Kwid", "Sandero", "Duster", "Captur"],
    "Hyundai": ["HB20", "Creta", "Elantra", "Tucson"],
    "Jeep": ["Renegade", "Compass", "Wrangler"],
    "Nissan": ["Kicks", "Versa", "Sentra", "Frontier"],
    "Fiat": ["Palio", "Argo", "Toro", "Cronos"],
    "Kia": ["Seltos", "Sportage", "Cerato", "Rio"],
    "Peugeot": ["208", "3008", "301", "5008"],
    "Citroën": ["C3", "C4", "Aircross", "Aircross"],
    "Mitsubishi": ["L200", "Outlander", "ASX"],
    "Subaru": ["Forester", "Outback", "Impreza"],
    "Mercedes-Benz": ["A-Class", "C-Class", "GLA", "GLC"],
    "BMW": ["1 Series", "3 Series", "X1", "X3"],
    "Audi": ["A3", "A4", "Q3", "Q5"],
    "Volkswagen Commercial": ["Amarok", "Transporter", "Crafter"],
    "Tesla": ["Model S", "Model 3", "Model X", "Model Y"]
};

export default function CarroForm({ params }) {
    const route = useRouter();

    const carros = JSON.parse(localStorage.getItem('carros')) || [];
    const dados = carros.find(item => item.id == params?.id);
    const carro = dados || { marca: '', modelo: '', ano: '', cor: '', quilometragem: '', foto: '' };

    const [fotoPreview, setFotoPreview] = useState(carro.foto || '');
    const [marcaSelecionada, setMarcaSelecionada] = useState(carro.marca || '');

    // Filtra os modelos com base na marca selecionada
    const modelosFiltrados = marcaSelecionada ? marcasCarros[marcaSelecionada] || [] : [];

    function salvar(dados) {
        if (carro.id) {
            Object.assign(carro, dados);
        } else {
            dados.id = v4();
            carros.push(dados);
        }

        localStorage.setItem('carros', JSON.stringify(carros));
        return route.push('/carform');
    }

    function handleFotoChange(event, setFieldValue) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue("foto", reader.result);
                setFotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Pagina titulo="Cadastro de Carros">

            <Formik
                initialValues={carro}
                validationSchema={CarroValidator}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    errors,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="marca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Select
                                name="marca"
                                value={values.marca}
                                onChange={(e) => {
                                    handleChange(e);
                                    setMarcaSelecionada(e.target.value);
                                }}
                                isInvalid={errors.marca}
                            >
                                <option value="">Selecione uma marca</option>
                                {Object.keys(marcasCarros).map((marca) => (
                                    <option key={marca} value={marca}>{marca}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.marca}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="modelo">
                            <Form.Label>Modelo</Form.Label>
                            <Form.Select
                                name="modelo"
                                value={values.modelo}
                                onChange={handleChange}
                                isInvalid={errors.modelo}
                                disabled={!marcaSelecionada} // Desabilita se nenhuma marca for selecionada
                            >
                                <option value="">Selecione um modelo</option>
                                {modelosFiltrados.map((modelo) => (
                                    <option key={modelo} value={modelo}>{modelo}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.modelo}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ano">
                            <Form.Label>Ano</Form.Label>
                            <InputMask
                                mask="9999" // Máscara para o ano
                                value={values.ano}
                                onChange={handleChange('ano')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        name="ano"
                                        isInvalid={errors.ano}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">
                                {errors.ano}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cor">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control
                                type="text"
                                name="cor"
                                value={values.cor}
                                onChange={handleChange}
                                isInvalid={errors.cor}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cor}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="quilometragem">
                            <Form.Label>Quilometragem</Form.Label>
                            <InputMask
                                mask="9.999.999" // Máscara para quilometragem
                                value={values.quilometragem}
                                onChange={handleChange('quilometragem')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        name="quilometragem"
                                        isInvalid={errors.quilometragem}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">
                                {errors.quilometragem}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="placa">
                            <Form.Label>Placa</Form.Label>
                            <InputMask
                                mask="aaa-9*99" // Máscara para placas padrão Brasil
                                value={values.placa}
                                onChange={handleChange('placa')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        name="placa"
                                        isInvalid={errors.placa}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">
                                {errors.placa}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="foto">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFotoChange(e, setFieldValue)}
                            />
                            {fotoPreview && (
                                <div className="mt-3">
                                    <img src={fotoPreview} alt="Prévia da Foto" style={{ width: "150px" }} />
                                </div>
                            )}
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/carform" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
