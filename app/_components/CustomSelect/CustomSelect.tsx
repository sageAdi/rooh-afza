import { Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

type CustomSelectInputProps = {
  children: React.ReactNode;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
};

const CustomSelect = ({ children, value, onChange }: CustomSelectInputProps) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        backgroundColor: 'rgb(248, 250, 252)',
        borderRadius: '8px',
        border: 'none',
        boxShadow: '0 0 #0000 ,0 0 #0000,0px 4px 6px -1px rgba(0, 0, 0, .05), 0px 2px 4px -1px rgba(0, 0, 0, .05)',
        height: '2.5rem',
        px: '8px',
        '.MuiSelect-select': {
          padding: 0,
        },
        '&:hover': {
          boxShadow: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },

        transition: 'box-shadow cubic-bezier(.4,0,.2,1) 0.15s',
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            mt: 1.5,
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            boxShadow: '0 0 #0000 ,0 0 #0000,0px 4px 6px -1px rgba(0, 0, 0, .05), 0px 2px 4px -1px rgba(0, 0, 0, .05)',
          },
        },
      }}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
