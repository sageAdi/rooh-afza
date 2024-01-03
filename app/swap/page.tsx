'use client';

import PageTitle from '../_components/PageTitle/PageTitle';
import Box from '@mui/material/Box';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  MenuItem,
  SelectChangeEvent,
  Stack,
  TextField,
  listClasses,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomSelect from '../_components/CustomSelect/CustomSelect';
import { inTokens, outTokens } from './script';

const CustomTextField = ({ onChange }: { onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <TextField
      inputMode="decimal"
      placeholder="0.0"
      type="number"
      onChange={onChange}
      sx={{
        width: '60%',
        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
        '& .MuiOutlinedInput-input': {
          textAlign: 'right',
          padding: '10px 12px',
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '-moz-appearance': 'textfield',
        },
      }}
    />
  );
};

export default function Swap() {
  const [inTokensList, setInTokensLIst] = useState([{}]);
  const [outTokensList, setOutTokensList] = useState([{}]);
  const [chainId, setChainId] = useState(1);

  useEffect(() => {
    const getInTokens = async () => {
      const tokenList = await inTokens(chainId);
      setInTokensLIst(tokenList);
    };

    getInTokens();
  });

  const onChangeTransferFrom = (e: SelectChangeEvent) => {
    e.preventDefault();

    const getOutTokens = async () => {
      const tokenList = await outTokens(chainId, e.target.value, 'walletAddress');
      setOutTokensList(tokenList);
    };

    getOutTokens();
  };

  const onChangeFromToken = (e: SelectChangeEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ p: 2, m: 1, minHeight: '100%' }}>
      <PageTitle title={'Swap'} />
      <Card sx={{ maxWidth: 550 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={inTokensList[0]?.symbol} onChange={onChangeFromToken}>
                {inTokensList.map((token: any) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField />
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={outTokensList[0]?.symbol} onChange={onChangeTransferFrom}>
                {outTokensList.map((token: any) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField />
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth>
            Preview
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
