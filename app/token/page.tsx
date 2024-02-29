'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Token = () => {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/todos'),
  });
  return <div>Token page</div>;
};
export default Token;
