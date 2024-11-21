'use client'; // Indica que o código deve ser executado no lado do cliente

import { useState, useEffect } from 'react';
import { Container, Button, Table, Form, InputGroup, Spinner, Modal } from 'react-bootstrap';
import Link from 'next/link'; // Para navegação
import Pagina from '@/components/Pagina'; // Assumindo que você tenha esse componente de layout
import { FaEdit, FaTrash } from 'react-icons/fa'; // Para ícones de editar e excluir

const ListagemConcessionariasPage = () => {
  const [concessionarias, setConcessionarias] = useState([]); // Armazena as concessionárias
  const [searchTerm, setSearchTerm] = useState(''); // Para filtro de pesquisa
  const [loading, setLoading] = useState(true); // Para controlar o carregamento
  const [currentPage, setCurrentPage] = useState(1); // Para controle de paginação
  const [showModal, setShowModal] = useState(false); // Para controlar o modal de confirmação
  const [concessionariaToDelete, setConcessionariaToDelete] = useState(null); // Para armazenar a concessionária a ser excluída
  const itemsPerPage = 5; // Número de itens por página

  // Carregar concessionárias do localStorage quando a página for carregada
  useEffect(() => {
    setLoading(true); // Inicia o carregamento

    // Verifica se já existe concessionárias no localStorage
    const storedConcessionarias = JSON.parse(localStorage.getItem('concessionarias'));

    if (!storedConcessionarias || storedConcessionarias.length === 0) {
      // Se não houver concessionárias, cria algumas de exemplo
      const initialConcessionarias = [
        {
          id: 1,
          nome: 'Concessionária XYZ',
          cidade: 'São Paulo',
          estado: 'SP',
        },
        {
          id: 2,
          nome: 'Concessionária ABC',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
        },
        {
          id: 3,
          nome: 'Concessionária Motors',
          cidade: 'Belo Horizonte',
          estado: 'MG',
        },
        {
          id: 4,
          nome: 'Carros & Cia',
          cidade: 'Curitiba',
          estado: 'PR',
        },
        {
          id: 5,
          nome: 'Auto Show',
          cidade: 'Porto Alegre',
          estado: 'RS',
        },
      ];

      // Armazena as concessionárias iniciais no localStorage
      localStorage.setItem('concessionarias', JSON.stringify(initialConcessionarias));
      setConcessionarias(initialConcessionarias);
    } else {
      setConcessionarias(storedConcessionarias); // Caso já existam no localStorage
    }

    setLoading(false); // Finaliza o carregamento
  }, []);

  // Função para excluir uma concessionária
  const excluirConcessionaria = () => {
    const updatedConcessionarias = concessionarias.filter(c => c.id !== concessionariaToDelete);
    setConcessionarias(updatedConcessionarias);
    localStorage.setItem('concessionarias', JSON.stringify(updatedConcessionarias));
    setShowModal(false); // Fecha o modal de confirmação
  };

  // Função para abrir o modal de confirmação
  const handleOpenModal = (id) => {
    setConcessionariaToDelete(id);
    setShowModal(true);
  };

  // Função para filtrar concessionárias com base no termo de busca
  const filteredConcessionarias = concessionarias.filter(concessionaria => {
    const nome = concessionaria.nome || '';
    const cidade = concessionaria.cidade || '';
    const estado = concessionaria.estado || '';
    const searchLower = searchTerm.toLowerCase();

    return nome.toLowerCase().includes(searchLower) ||
      cidade.toLowerCase().includes(searchLower) ||
      estado.toLowerCase().includes(searchLower);
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConcessionarias.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredConcessionarias.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagina>
      <Container>
        <h2>Lista de Concessionárias</h2>

        {/* Botão para cadastrar nova concessionária */}
        <Link href="/concessionarias/form">
          <Button variant="primary" className="mb-3">
            Cadastrar Nova Concessionária
          </Button>
        </Link>

        {/* Filtro de pesquisa */}
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nome, cidade ou estado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {/* Exibe uma animação de carregamento enquanto a página está sendo carregada */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {filteredConcessionarias.length === 0 ? (
              <p>Não há concessionárias cadastradas.</p>
            ) : (
              <>
                {/* Tabela de concessionárias */}
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cidade</th>
                      <th>Estado</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((concessionaria) => (
                      <tr key={concessionaria.id}>
                        <td>{concessionaria.nome}</td>
                        <td>{concessionaria.cidade}</td>
                        <td>{concessionaria.estado}</td>
                        <td>
                          <Link href={`/concessionarias/form?id=${concessionaria.id}`}>
                            <Button variant="warning" size="sm" className="me-2">
                              <FaEdit /> Editar
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleOpenModal(concessionaria.id)}
                          >
                            <FaTrash /> Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Paginação */}
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span className="mx-2">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {/* Modal de Confirmação de Exclusão */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir esta concessionária?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={excluirConcessionaria}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Pagina>
  );
};

export default ListagemConcessionariasPage;
