'use client';

import { useState, useEffect } from 'react';
import { Container, Button, Form, Card, ListGroup, InputGroup } from 'react-bootstrap';
import { FaCar, FaTools, FaCalendarAlt, FaClipboardList, FaDollarSign } from 'react-icons/fa'; // Ícones

const PaginaManutencao = () => {
  const [carro, setCarro] = useState(null);
  const [manutencao, setManutencao] = useState({
    tipo: '',
    descricao: '',
    data: '',
    custo: '',
  });
  const [historicoManutencao, setHistoricoManutencao] = useState([]);

  // Função para carregar o carro do localStorage
  const carregarCarro = () => {
    const carroSalvo = JSON.parse(localStorage.getItem('carro')); // Supondo que o carro esteja salvo como "carro"
    if (carroSalvo) {
      setCarro(carroSalvo);
      setHistoricoManutencao(carroSalvo.historicoManutencao || []); // Carregar histórico se existir
    }
  };

  useEffect(() => {
    carregarCarro();
  }, []);

  const handleAdicionarManutencao = (e) => {
    e.preventDefault();

    if (carro) {
      // Adicionar a manutenção ao histórico
      const novaManutencao = {
        tipo: manutencao.tipo,
        descricao: manutencao.descricao,
        data: manutencao.data,
        custo: manutencao.custo,
      };

      const novoHistorico = [...historicoManutencao, novaManutencao];
      setHistoricoManutencao(novoHistorico);

      // Atualizar o histórico de manutenções do carro no localStorage
      const carroAtualizado = { ...carro, historicoManutencao: novoHistorico };
      localStorage.setItem('carro', JSON.stringify(carroAtualizado));

      // Resetar os campos do formulário de manutenção
      setManutencao({
        tipo: '',
        descricao: '',
        data: '',
        custo: '',
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body>
          {carro ? (
            <>
              <h3 className="text-center mb-4">Manutenção do Carro: {carro.marca} {carro.modelo}</h3>

              <Form onSubmit={handleAdicionarManutencao}>
                {/* Tipo de Manutenção */}
                <Form.Group controlId="formTipoManutencao" className="mb-3">
                  <Form.Label>Tipo de Manutenção</Form.Label>
                  <Form.Control
                    as="select"
                    value={manutencao.tipo}
                    onChange={(e) => setManutencao({ ...manutencao, tipo: e.target.value })}
                    required
                  >
                    <option>Troca de Óleo</option>
                    <option>Revisão Completa</option>
                    <option>Troca de Pneus</option>
                    <option>Balanceamento</option>
                    <option>Outros</option>
                  </Form.Control>
                </Form.Group>

                {/* Descrição da Manutenção */}
                <Form.Group controlId="formDescricaoManutencao" className="mb-3">
                  <Form.Label>Descrição da Manutenção</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Descrição detalhada da manutenção"
                    value={manutencao.descricao}
                    onChange={(e) => setManutencao({ ...manutencao, descricao: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Data da Manutenção */}
                <Form.Group controlId="formDataManutencao" className="mb-3">
                  <Form.Label>Data da Manutenção</Form.Label>
                  <Form.Control
                    type="date"
                    value={manutencao.data}
                    onChange={(e) => setManutencao({ ...manutencao, data: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Custo da Manutenção */}
                <Form.Group controlId="formCustoManutencao" className="mb-3">
                  <Form.Label>Custo</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Custo da Manutenção"
                      value={manutencao.custo}
                      onChange={(e) => setManutencao({ ...manutencao, custo: e.target.value })}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Adicionar Manutenção
                </Button>
              </Form>

              <h4 className="mt-5">Histórico de Manutenções</h4>
              <ListGroup>
                {historicoManutencao.length > 0 ? (
                  historicoManutencao.map((manutencao, index) => (
                    <ListGroup.Item key={index}>
                      <h5>{manutencao.tipo}</h5>
                      <p><strong>Data:</strong> {manutencao.data}</p>
                      <p><strong>Descrição:</strong> {manutencao.descricao}</p>
                      <p><strong>Custo:</strong> R${manutencao.custo}</p>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>
                    <p>Sem manutenções registradas.</p>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </>
          ) : (
            <p>Carro não encontrado no cadastro.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PaginaManutencao;
