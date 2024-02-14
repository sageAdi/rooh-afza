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
} from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import CustomSelect from '../_components/CustomSelect/CustomSelect';
import { inTokens, quote, swap } from './script';
import { useWeb3ModalState } from '@web3modal/wagmi/react';
import { useAccount, useSendTransaction } from 'wagmi';

const CustomTextField = ({ onChange }: { onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <TextField
      inputMode="decimal"
      placeholder="0.0"
      type="number"
      onChange={onChange}
      sx={{
        width: '40%',
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
  const [inTokensList, setInTokensList] = useState([{}]);
  const [outTokensList, setOutTokensList] = useState([{}]);
  const [inAmount, setInAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [slippage, setSlippage] = useState(0);
  const { open, selectedNetworkId } = useWeb3ModalState();
  const [chainId, setChainId] = useState(1);
  const { address, isDisconnected } = useAccount();

  useEffect(() => {
    if (open) setChainId(Number(selectedNetworkId) && 137);
    const getInTokens = async () => {
      const tokenList: any = await inTokens(chainId);
      setInTokensList(tokenList);
    };
    getInTokens().then((r) => console.log('Successfully getInTokens'));
  }, [setChainId, selectedNetworkId, open, chainId]);

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction();

  const onChangeFromToken = (e: SelectChangeEvent) => {
    e.preventDefault();
    setFromAddress(inTokensList.find((token: any) => token.symbol === e.target.value)?.address);
    setOutTokensList(inTokensList.filter((token: any) => token.symbol !== e.target.value));
  };

  const onChangeToToken = async (e: SelectChangeEvent) => {
    e.preventDefault();
    setToAddress(outTokensList.find((token: any) => token.symbol === e.target.value)?.address);
    const response: any = await quote(chainId, fromAddress, toAddress, inAmount);
    setOutAmount(response?.toAmount);
  };

  const onChangeInAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await swap({ chainId, fromAddress, toAddress, inAmount, address, slippage });
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 2,
        m: 1,
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <PageTitle title={'Swap'} />
      <Card sx={{ maxWidth: 'max-content' }}>
        <CardContent>
          <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={" "} onChange={onChangeFromToken}>
                {inTokensList.map((token: any) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField onChange={onChangeInAmount} />
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={outAmount} onChange={onChangeToToken}>
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
          <Button variant="contained" fullWidth onSubmit={handleSubmit}>
            Preview
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
