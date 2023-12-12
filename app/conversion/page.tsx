'use client';

import { useState } from 'react';
import InputFieldDefault from '@/app/_components/InputField/InputField';
import web3 from '@/app/_library/web3';
import { FormValues } from '../_types/formValue';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const initialValues: FormValues = {
  wei: '1000000000000000000',
  kwei: '1000000000000000',
  mwei: '1000000000000',
  gwei: '1000000000',
  szabo: '1000000',
  finney: '1000',
  ether: '1',
  kether: '0.001',
  mether: '0.000001',
  gether: '0.000000001',
  tether: '0.000000000001',
};

const Conversion = () => {
  const [formValue, setFormValue] = useState<FormValues>(initialValues);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (value.length > 0) {
      const _data = web3.conversion(value, name);
      setFormValue(_data);
    } else {
      setFormValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h5" mb={2}>
        Conversion
      </Typography>
      <Stack spacing={1} maxWidth={'600px'} width={'100%'}>
        <InputFieldDefault name={'wei'} onChange={handleOnChange} label={'Wei'} value={formValue.wei} />
        <InputFieldDefault name={'kwei'} onChange={handleOnChange} label={'KWei'} value={formValue.kwei} />
        <InputFieldDefault name={'mwei'} onChange={handleOnChange} label={'MWei'} value={formValue.mwei} />
        <InputFieldDefault name={'gwei'} onChange={handleOnChange} label={'GWei'} value={formValue.gwei} />
        <InputFieldDefault name={'szabo'} onChange={handleOnChange} label={'Szabo'} value={formValue.szabo} />
        <InputFieldDefault name={'finney'} onChange={handleOnChange} label={'Finney'} value={formValue.finney} />
        <InputFieldDefault name={'ether'} onChange={handleOnChange} label={'Ether'} value={formValue.ether} />
        <InputFieldDefault name={'kether'} onChange={handleOnChange} label={'KEther'} value={formValue.kether} />
        <InputFieldDefault name={'mether'} onChange={handleOnChange} label={'MEther'} value={formValue.mether} />
        <InputFieldDefault name={'gether'} onChange={handleOnChange} label={'GEther'} value={formValue.gether} />
        <InputFieldDefault name={'tether'} onChange={handleOnChange} label={'TEther'} value={formValue.tether} />
      </Stack>
    </Paper>
  );
};
export default Conversion;
