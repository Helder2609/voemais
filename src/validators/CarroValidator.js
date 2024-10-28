import * as Yup from 'yup';

const CarroValidator = Yup.object().shape({
    marca: Yup.string()
        .required('Marca é obrigatória')
        .min(2, 'Marca deve ter pelo menos 2 caracteres'),
    modelo: Yup.string()
        .required('Modelo é obrigatório')
        .min(2, 'Modelo deve ter pelo menos 2 caracteres'),
    ano: Yup.number()
        .required('Ano é obrigatório')
        .min(1886, 'Ano deve ser maior que 1886')  // Primeiro carro foi inventado em 1886
        .max(new Date().getFullYear(), `Ano deve ser até ${new Date().getFullYear()}`),
    cor: Yup.string()
        .required('Cor é obrigatória')
        .min(3, 'Cor deve ter pelo menos 3 caracteres'),
    quilometragem: Yup.string()
        .required('Quilometragem é obrigatória')
        .min(0, 'Quilometragem não pode ser negativa')
        .max(2000000, 'Quilometragem deve ser menor que 2.000.000 km'),
});

export default CarroValidator;
