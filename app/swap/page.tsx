'use client';

import PageTitle from '../_components/PageTitle/PageTitle';
import Box from '@mui/material/Box';
import {
  Avatar,
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
import { useEffect, useState } from 'react';
import CustomSelect from '../_components/CustomSelect/CustomSelect';
import { inTokens, quote, swap } from './script';
import { useAccount } from 'wagmi';
import { chain } from '@/store';
import { useQuery } from '@tanstack/react-query';

const CustomTextField = ({
  value,
  onChange,
}: {
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      inputMode="decimal"
      placeholder="0.0"
      type="number"
      value={value}
      onChange={onChange}
      sx={{
        width: '40%',
        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
        '& .MuiOutlinedInput-input': {
          textAlign: 'right',
          padding: '10px 12px',
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          MozAppearance: 'textfield',
        },
      }}
    />
  );
};

export default function Swap() {
  const [inAmount, setInAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [slippage, setSlippage] = useState(0);
  const { address } = useAccount();
  const [inToken, setInToken] = useState<any>('');
  const [outToken, setOutToken] = useState<any>('');

  const { data: inTokensList, isLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: () => inTokens(chain.value),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!chain.value,
  });

  const { data: qouteAmount } = useQuery({
    queryKey: ['quote', chain.value, inToken?.address, outToken?.address, inAmount],
    queryFn: () =>
      quote(
        chain.value,
        inToken?.address,
        outToken?.address,
        BigInt(Math.pow(10, inToken?.decimals) * parseFloat(inAmount)).toString(),
      ),
    enabled: !!inAmount,
    retry: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (qouteAmount?.toAmount) {
      const amount = parseFloat(qouteAmount?.toAmount) / Math.pow(10, outToken?.decimals);
      setOutAmount(amount.toString());
    }
  }, [outToken?.decimals, qouteAmount?.toAmount]);
  useEffect(() => {
    if (inTokensList) {
      setInToken(inTokensList[0]);
      setOutToken(inTokensList[1]);
    }
  }, [inTokensList]);

  const onChangeFromToken = (e: SelectChangeEvent) => {
    e.preventDefault();
    setInToken(e.target.value);
    console.log(e.target.value);
  };

  const onChangeToToken = async (e: SelectChangeEvent) => {
    e.preventDefault();
    setOutToken(e.target.value);
  };

  const onChangeInAmount = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await swap({ chainId: chain.value, inToken, outToken, inAmount, address, slippage });
  };

  if (isLoading) return 'Loading';
  console.log(inTokensList);

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Box sx={{ p: 2, m: 2 }}>
      <PageTitle title={'Swap'} />
      <Card sx={{ maxWidth: 'sm', width: '100%' }}>
        <CardContent>
          <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={inToken} onChange={onChangeFromToken} width="150px">
                {inTokensList?.map((token: any) => (
                  <MenuItem key={token.symbol} value={token}>
                    <Box display={'flex'} alignItems={'center'} gap={0.5}>
                      <Avatar sx={{ width: 30, height: 30 }} src={token.logoURI}>
                        Avatar
                      </Avatar>
                      {token.symbol}
                    </Box>
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField value={inAmount} onChange={onChangeInAmount} />
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <CustomSelect value={outToken} onChange={onChangeToToken} width="150px">
                {inTokensList?.map((token: any) => (
                  <MenuItem key={token.symbol} value={token}>
                    <Box display={'flex'} alignItems={'center'} gap={0.5}>
                      <Avatar sx={{ width: 30, height: 30 }} src={token.logoURI}>
                        Avatar
                      </Avatar>
                      {token.symbol}
                    </Box>
                  </MenuItem>
                ))}
              </CustomSelect>
              <CustomTextField value={outAmount} />
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
    // </HydrationBoundary>
  );
}
