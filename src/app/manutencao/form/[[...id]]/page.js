// src/components/CarMaintenanceForm.js
'use client';

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import InputMask from "react-input-mask";
import { useState } from "react";

const CarMaintenanceForm = () => {
    const route = useRouter();
    const [successMessage, setSuccessMessage] = useState('');

    const MaintenanceSchema = Yup.object().shape({
        serviceType: Yup.string().required('Tipo de serviço é obrigatório'),
        date: Yup.date().required('Data é obrigatória').nullable(),
        time: Yup.string().required('Hora é obrigatória'),
        latitude: Yup.number().required('Latitude é obrigatória'),
        longitude: Yup.number().required('Longitude é obrigatória'),
    });

    function handleSubmit(values) {
        values.id = uuidv4();
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(values);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        setSuccessMessage('Agendamento realizado com sucesso!');
        setTimeout(() => {
            route.push('/carMaintenance/scheduled'); // Redireciona para a página de agendamentos
        }, 2000);
    }

    return (
        <Pagina titulo="Agendamento de Manutenção">

            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <Formik
                initialValues={{
                    serviceType: '',
                    date: '',
                    time: '',
                    latitude: '',
                    longitude: '',
                }}
                validationSchema={MaintenanceSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="serviceType">
                            <Form.Label>Tipo de Serviço</Form.Label>
                            <Form.Control
                                type="text"
                                name="serviceType"
                                value={values.serviceType}
                                onChange={handleChange}
                                isInvalid={errors.serviceType}
                            />
                            <Form.Control.Feedback type="invalid">{errors.serviceType}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={values.date}
                                onChange={handleChange}
                                isInvalid={errors.date}
                            />
                            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={values.time}
                                onChange={handleChange}
                                isInvalid={errors.time}
                            />
                            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            <InputMask
                                mask="9.999999" // Máscara para latitude
                                value={values.latitude}
                                onChange={handleChange('latitude')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        name="latitude"
                                        isInvalid={errors.latitude}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">{errors.latitude}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            <InputMask
                                mask="9.999999" // Máscara para longitude
                                value={values.longitude}
                                onChange={handleChange('longitude')}
                            >
                                {(inputProps) => (
                                    <Form.Control
                                        {...inputProps}
                                        type="text"
                                        name="longitude"
                                        isInvalid={errors.longitude}
                                    />
                                )}
                            </InputMask>
                            <Form.Control.Feedback type="invalid">{errors.longitude}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Agendar Manutenção
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => route.push('/carMaintenance/scheduled')}>
                                <MdOutlineArrowBack /> Voltar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
};

export default CarMaintenanceForm;
