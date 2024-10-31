'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CarMaintenanceScheduler = () => {
  const [startDate, setStartDate] = useState(new Date());

  const MaintenanceSchema = Yup.object().shape({
    serviceType: Yup.string().required('Selecione um tipo de serviço'),
    date: Yup.date().required('Data é obrigatória'),
    time: Yup.string().required('Hora é obrigatória'),
  });

  const handleSubmit = (values) => {
    // Simulação de envio de dados
    alert(`Agendamento realizado com sucesso!\nTipo de Serviço: ${values.serviceType}\nData: ${values.date.toLocaleDateString()}\nHora: ${values.time}`);
  };

  return (
    <div>
      <h3>Agendamento de Manutenção de Carros</h3>
      <Formik
        initialValues={{ serviceType: '', date: startDate, time: '' }}
        validationSchema={MaintenanceSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors }) => (
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Tipo de Serviço</InputGroup.Text>
              <FormControl as={Field} name="serviceType" placeholder="Ex: Troca de Óleo" isInvalid={!!errors.serviceType} />
              <FormControl.Feedback type="invalid">{errors.serviceType}</FormControl.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Data</InputGroup.Text>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setFieldValue('date', date);
                }}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data"
              />
              <FormControl.Feedback type="invalid">{errors.date}</FormControl.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Hora</InputGroup.Text>
              <FormControl as={Field} name="time" placeholder="Ex: 14:30" isInvalid={!!errors.time} />
              <FormControl.Feedback type="invalid">{errors.time}</FormControl.Feedback>
            </InputGroup>

            <Button type="submit" variant="primary">
              Agendar Manutenção
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CarMaintenanceScheduler;
