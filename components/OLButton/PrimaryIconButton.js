import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export default function PrimaryIconButton({handleClick,icon}) {
  return (
      <IconButton onClick={handleClick}>
        {icon}
      </IconButton>
  );
}