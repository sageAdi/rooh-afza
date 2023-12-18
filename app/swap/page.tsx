'use client';

import Paper from '@mui/material/Paper';
import PageTitle from '../_components/PageTitle/PageTitle';
import Box from '@mui/material/Box';
import { Card, CardContent, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import tokens from './data';
import { useState } from 'react';

const Swap = () => {
  const [transferFrom, setTransferFrom] = useState('BTC');
  const onChangeTransferFrom = (e: SelectChangeEvent) => {
    setTransferFrom(e.target.value);
  };
  return (
    <Box sx={{ p: 2, m: 1, minHeight: '100%' }}>
      <PageTitle title={'Swap'} />
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
            <Select value={transferFrom} onChange={onChangeTransferFrom}>
              {tokens.map((token) => (
                <MenuItem key={token.symbol} value={token.symbol}>
                  {token.name}
                </MenuItem>
              ))}
            </Select>
            <TextField />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Swap;
