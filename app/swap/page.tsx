'use client';

import Paper from '@mui/material/Paper';
import PageTitle from '../_components/PageTitle/PageTitle';
import Box from '@mui/material/Box';
import { Card, CardContent, Divider, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import tokens from './data';
import { useState } from 'react';
import CustomSelect from '../_components/CustomSelect/CustomSelect';
import { getNetwork } from '@wagmi/core';
import oneInchSwap from '../_scripts/swap';

const CustomTextField = ({ onChange }: { onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <TextField
      inputMode="decimal"
      placeholder="0.0"
      type="number"
      onChange={onChange}
      sx={{
        width: '400px',
        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
        '& .MuiOutlinedInput-input': { textAlign: 'right', padding: '10px 6px' },
      }}
    />
  );
};

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
          <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={transferFrom} onChange={onChangeTransferFrom}>
                {tokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField />
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={transferFrom} onChange={onChangeTransferFrom}>
                {tokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Swap;
