import Typography from '@mui/material/Typography';
import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Typography variant="h5" mb={2}>
      {title}
    </Typography>
  );
};

export default PageTitle;
