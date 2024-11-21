// 'use client';

// import { useState } from 'react';
// import { Container, Button, Form, Card, InputGroup } from 'react-bootstrap';
// import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa'; // Adicionando ícones para os campos
// import { useAuth } from '../contexts/AuthContext'; // Importando o hook de autenticação

// const CadastroClientePage = () => {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [telefone, setTelefone] = useState('');
//   const [senha, setSenha] = useState('');
//   const [confirmarSenha, setConfirmarSenha] = useState('');
//   const { login } = useAuth(); // Acessando a função login do contexto

//   // Função para aplicar a máscara de telefone
//   const handleTelefoneChange = (e) => {
//     let value = e.target.value;
//     value = value.replace(/\D/g, ''); // Remover todos os caracteres não numéricos
//     if (value.length <= 2) {
//       value = `(${value}`;
//     } else if (value.length <= 6) {
//       value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
//     } else {
//       value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
//     }
//     setTelefone(value);
//   };

//   const handleCadastro = (e) => {
//     e.preventDefault();
//     if (senha !== confirmarSenha) {
//       alert('As senhas não coincidem!');
//       return;
//     }
//     if (senha.length < 6) {
//       alert('A senha deve ter pelo menos 6 caracteres.');
//       return;
//     }

//     // "Logando" o usuário após o cadastro
//     const usuario = { nome, email, telefone }; // Aqui você pode incluir mais informações do usuário
//     login(usuario);

//     // Redirecionando ou exibindo mensagem (dependendo do seu framework de roteamento)
//     console.log('Cadastro realizado com sucesso!', usuario);
//     alert('Cadastro realizado e usuário logado!');
//     // Redirecionar para outra página (dependendo do seu roteador)
//     // Example: router.push('/dashboard');
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <Card className="p-4 shadow-lg rounded" style={{ maxWidth: '500px', width: '100%' }}>
//         <Card.Body>
//           <h3 className="text-center mb-4">Cadastro de Cliente</h3>

//           <Form onSubmit={handleCadastro}>
//             <Form.Group controlId="formNome" className="mb-3">
//               <Form.Label>Nome</Form.Label>
//               <InputGroup>
//                 <InputGroup.Text><FaUser /></InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="Digite seu nome"
//                   value={nome}
//                   onChange={(e) => setNome(e.target.value)}
//                   required
//                 />
//               </InputGroup>
//             </Form.Group>

//             <Form.Group controlId="formEmail" className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <InputGroup>
//                 <InputGroup.Text><FaEnvelope /></InputGroup.Text>
//                 <Form.Control
//                   type="email"
//                   placeholder="Digite seu email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </InputGroup>
//             </Form.Group>

//             <Form.Group controlId="formTelefone" className="mb-3">
//               <Form.Label>Telefone</Form.Label>
//               <InputGroup>
//                 <InputGroup.Text><FaPhone /></InputGroup.Text>
//                 <Form.Control
//                   type="text"
//                   placeholder="(XX) XXXXX-XXXX"
//                   value={telefone}
//                   onChange={handleTelefoneChange}
//                   required
//                 />
//               </InputGroup>
//             </Form.Group>

//             <Form.Group controlId="formSenha" className="mb-3">
//               <Form.Label>Senha</Form.Label>
//               <InputGroup>
//                 <InputGroup.Text><FaLock /></InputGroup.Text>
//                 <Form.Control
//                   type="password"
//                   placeholder="Digite sua senha"
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
//                   required
//                 />
//               </InputGroup>
//             </Form.Group>

//             <Form.Group controlId="formConfirmarSenha" className="mb-4">
//               <Form.Label>Confirmar Senha</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Confirme sua senha"
//                 value={confirmarSenha}
//                 onChange={(e) => setConfirmarSenha(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100 mb-3">
//               Cadastrar
//             </Button>

//             <div className="text-center">
//               <p>
//                 Já tem uma conta?{' '}
//                 <a href="/login" className="text-primary">
//                   Faça Login
//                 </a>
//               </p>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default CadastroClientePage;
