import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    default: 'é inválido',
    required: '*Campo obrigatório',
    oneOf: 'deve ser um dos seguintes valores: ${values}',
    notOneOf: 'não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'deve ter exatamente ${length} caracteres',
    min: 'deve ter pelo menos ${min} caracteres',
    max: 'deve ter no máximo ${max} caracteres',
    email: '*Formato de email inválido',
    url: 'deve ter um formato de URL válida',
    trim: 'não deve conter espaços no início ou no fim.',
    lowercase: 'deve estar em maiúsculo',
    uppercase: 'deve estar em minúsculo',
    matches: 'A data deve ter o seguinte formato: DD/MM/YYYY',
  },
  number: {
    min: 'deve ser no mínimo ${min}',
    max: 'deve ser no máximo ${max}',
    lessThan: 'deve ser menor que ${less}',
    moreThan: 'deve ser maior que ${more}',
    notEqual: 'não pode ser igual à ${notEqual}',
    positive: 'deve ser um número posítivo',
    negative: 'deve ser um número negativo',
    integer: 'deve ser um número inteiro',
  },
});

export default Yup.object().shape({
  nameNaver: Yup.string().required(),
  age: Yup.string()
    .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
    .required(),
  projects: Yup.string().required(),
  title: Yup.string().required(),
  companyTime: Yup.string()
    .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
    .required(),
  projects: Yup.string().required(),
  path: Yup.string().required(),
});
