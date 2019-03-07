import { number, object } from 'yup';

const schema = object().shape({
  amount: number().positive()
});

export default schema;
