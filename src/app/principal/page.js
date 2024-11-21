'use client';
import { Container, Nav, NavDropdown, Navbar, Carousel, Card, Row, Col } from "react-bootstrap";

export default function Pagina(props) {
    const carImages = [
        "https://garagem360.com.br/wp-content/uploads/2018/12/polo.jpg",
        "https://www.cnvw.com.br/_next/image?url=https%3A%2F%2Fcnvw-assets.nyc3.digitaloceanspaces.com%2Fpublic%2Fblog%2FpMnU0IXnRuiyPdOiDXlU0nP5QTWBwI-metaQ29uaGXDp2EgYWxndW5zIGNhcnJvcyBmYW1vc29zIGRhIFZvbGtzd2FnZW4ucG5n-.png&w=3840&q=75",
        "https://uploads.metroimg.com/wp-content/uploads/2022/09/13161630/VW-Virtus-6.jpg",
        "https://vw-digital-cdn-br.itd.vw.com.br/assets/newsroom-cdn-br-ps/c7564515-ebeb-464f-94fa-fddc484a68f5_low.jpg",
        "https://relatostar.com.br/2020/wp-content/uploads/2021/03/PoloNovo.jpg",
    ];

    return (
        <>
            <div style={{ backgroundColor: '#343a40', padding: '30px 0' }}>
                <Navbar bg="dark" variant="dark" className="py-3" style={{ height: '80px' }} expand="lg">
                    <Container>
                        {/* Menu Hamburguer */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        {/* Logo Centralizada */}
                        <Navbar.Brand href="/">
                            <img
                                src="/imgs/aaa.png"
                                alt="Logo Fiat"
                                style={{
                                    height: '150px',
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
                                    <NavDropdown.Item href="/customizacao">Customização</NavDropdown.Item>
                                    <NavDropdown.Item href="/vendas">Vendas</NavDropdown.Item>
                                    <Nav.Link href="/compra" className="text-white">Comprar</Nav.Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

                        {/* Botão Entrar ou Cadastrar */}
                        <button className="btn btn-outline-light">
                            Entrar ou Cadastrar-se
                        </button>
                    </Container>
                </Navbar>

                {/* Carrossel de Imagens */}
                <Container className="my-4">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/imgs/car.jpeg"
                                alt="Primeiro carro"
                                style={{ height: '650px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/imgs/suv.jpg"
                                alt="Segundo carro"
                                style={{ height: '650px', objectFit: 'cover' }}
                            />
                            <Carousel.Caption>
                                <h3>SUV de Luxo</h3>
                                <p>Espaço, conforto e tecnologia avançada.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/imgs/vitus.jpg"
                                alt="Terceiro carro"
                                style={{ height: '650px', objectFit: 'cover' }}
                            />
                            <Carousel.Caption>
                                <h3>Compacto Econômico</h3>
                                <p>Perfeito para o dia a dia na cidade.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>

                {/* Carrossel de Cards */}
                <Container>
                    <h2 className="text-center mb-4 text-white">Nossos Modelos</h2>
                    <Carousel indicators={false} controls={true}>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Carousel.Item key={idx}>
                                <Row className="g-4">
                                    {Array.from({ length: 5 }).map((_, cardIdx) => (
                                        <Col key={cardIdx}>
                                            <Card className="h-100">
                                                <Card.Img
                                                    variant="top"
                                                    src={carImages[cardIdx % carImages.length]}
                                                    alt={`Carro ${idx * 5 + cardIdx + 1}`}
                                                    style={{ height: '150px', objectFit: 'cover' }}
                                                />
                                                <Card.Body>
                                                    <Card.Title>polo {idx * 5 + cardIdx + 1}</Card.Title>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted">
                                                        A partir de R$ {100_000 + (idx * 5 + cardIdx) * 5_000}
                                                    </small>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            </div>

            {/* Rodapé (Footer) */}
            <footer style={{ backgroundColor: '#222', padding: '30px 0', color: '#fff' }}>
                <Container>
                    <Row>
                        <Col md={4} className="text-center text-md-start">
                            <h5>Contato</h5>
                            <p>Email: helder@gmail.com</p>
                            <p>Telefone: (61) 1111-2222</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <h5>Links</h5>
                            <Nav>
                                <Nav.Link href="/carform" className="text-white">Carros</Nav.Link>
                                <Nav.Link href="/manutencao" className="text-white">Agendamentos</Nav.Link>
                                <Nav.Link href="/customizacao" className="text-white">Customização</Nav.Link>
                                <Nav.Link href="/vendas" className="text-white">Vendas</Nav.Link>
                                <Nav.Link href="/compra" className="text-white">Comprar</Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={4} className="text-center text-md-end">
                            <h5>Siga-nos</h5>
                            <Nav>
                                <Nav.Link href="https://facebook.com" target="_blank" className="text-white">Facebook</Nav.Link>
                                <Nav.Link href="https://twitter.com" target="_blank" className="text-white">Twitter</Nav.Link>
                                <Nav.Link href="https://instagram.com" target="_blank" className="text-white">Instagram</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        <p>&copy; 2024 Helder. Todos os direitos reservados.</p>
                    </div>
                </Container>
            </footer>

            <Container className="my-3">
                {props.children}
            </Container>
        </>
    );
}
