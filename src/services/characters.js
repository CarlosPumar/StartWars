import { BASE_URL } from '../constants/endPoints';
import axios from 'axios';

const baseUrl = `${BASE_URL}/people/`;

const getAll = async () => {
  let stop = false;
  let data = [];

  let url = baseUrl;

  do {
    const request = await axios.get(url);
    data = data.concat(request.data.results);

    if (request.data.next === null) {
      stop = true;
    } else {
      url = request.data.next;
    }
  } while (!stop);

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
