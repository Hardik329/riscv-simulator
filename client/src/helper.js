import axios from 'axios'
import { BASE_URL } from './constants';

export const getData = async(setData) => {
    axios
      .get(BASE_URL+"data")
      .then((res) => res.data)
      .then((data) => {
        setData({ registers: data.register, memory: data.memory });
      })
      .catch((err) => console.log(err));
  };
