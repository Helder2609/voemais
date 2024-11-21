'use client';
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Image from 'next/image';

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="py-3" style={{ height: '80px' }} expand="lg">
                <Container>
                    {/* Menu Hamburguer */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Logo Centralizada */}
                    <Navbar.Brand href="/principal" className="mx-auto" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <Image
                            src="/imgs/b.png" // Caminho atualizado
                            alt="Logo Fiat"
                            width={200} // Ajuste o tamanho
                            height={250} // Ajuste o tamanho
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </Navbar.Brand>

                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Itens de Navegação no Dropdown */}
                        <Nav className="me-auto">
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/carform">Carros</NavDropdown.Item>
                                <NavDropdown.Item href="/manutencao">Agendamentos</NavDropdown.Item>
                                <NavDropdown.Item href="/concessionarias">Concessionarias</NavDropdown.Item>
                                <NavDropdown.Item href="/vendas">Vendas</NavDropdown.Item>
                                <NavDropdown.Item href="/compra">Comprar</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    {/* Botão Entrar ou Cadastrar */}
                    <button className="btn btn-outline-light">
                        Entrar ou Cadastrar-se
                    </button>
                </Container>
            </Navbar>

            {/* Conteúdo principal */}
            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    );
}
