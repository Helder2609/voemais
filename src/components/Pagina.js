'use client'
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="/imgs/logo.png" // Altere para o caminho da sua imagem
                            alt="Logo"
                            style={{ width: '150px', height: 'auto' }} // Ajuste o tamanho conforme necessário
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Backend" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/backend/empresas">
                               Empresas
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                        <Nav.Link href="/empresas">Empresas</Nav.Link>
                        <Nav.Link href="/aeroportos">Aeroportos</Nav.Link>
                        <Nav.Link href="/voos">Voos</Nav.Link>
                        <Nav.Link href="/passagens">Passagens</Nav.Link>
                        <Nav.Link href="/passageiros">Passageiros</Nav.Link>
                        <Nav.Link href="/carform">Carros</Nav.Link>
                        <Nav.Link href="/manutencao">Agendamentos </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    )
}
