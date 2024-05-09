import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Logo(props) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="../../"/>
      </svg>
    </SvgIcon>
  );
}

export default Logo;
