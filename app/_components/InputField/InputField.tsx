import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChangeEventHandler, useState } from 'react';
import { Tooltip } from '@mui/material';

const CustomInputField = ({
  name,
  onChange,
  value,
  label,
}: {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: any;
  label: string;
}) => {
  const [tooltip, setTooltip] = useState('Click to Copy');
  return (
    <TextField
      size="small"
      onChange={onChange}
      value={value}
      type={'number'}
      name={name}
      sx={{
        '& .MuiInputBase-root': {
          padding: 0,
          borderRadius: '0.5rem',
          lineHeight: 1,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          padding: 0,
        },
      }}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position={'start'}>
            <Tooltip title={tooltip} placement="top" arrow translate="yes">
              <IconButton
                sx={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.5rem 0 0 0.5rem',
                }}
                onClick={() => navigator.clipboard.writeText(value)}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position={'end'}>
            <Box
              sx={{
                backgroundColor: '#f8f9fa',
                height: '2.4rem',
                borderRadius: '0 0.5rem 0.5rem 0',
                display: 'flex',
                alignItems: 'center',
                width: '6.5rem',
              }}
            >
              <Typography align={'center'} width={'100%'}>
                {label}
              </Typography>
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomInputField;
