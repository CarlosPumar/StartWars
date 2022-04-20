import { BASE_URL } from '../constants/endPoints';
import axios from 'axios';

const baseUrl = `${BASE_URL}/people/`;

const getAll = async (url = baseUrl) => {
  const request = await axios.get(url);
  return request.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
