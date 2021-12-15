import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { alpha, lighten, Theme } from '@mui/material/styles';

import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

import Collapse from '@mui/material/Collapse';



const RowExpanderHidden: React.FC<ReactProps> = (props) => {

  const {
    index,
    open,
    classes,
  } = props;

  let isEvenRow = index % 2 === 0

  return (
    <div className={clsx(
      classes.hiddenRowRoot,
      open && isEvenRow && classes.backgroundGrey,
      open && !isEvenRow && classes.backgroundGrey2,
    )}>
      <div style={{ padding: 0 }}>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          component={'div'}
        >
          {props.children}
        </Collapse>
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  index: number
  open: boolean;
}


const styles = (theme: Theme) => createStyles({
  hiddenRowRoot: {
    backgroundColor: theme.palette.mode === 'dark'
      ? lighten(Colors.uniswapGreyNavy, 0.01)
      : lighten(Colors.slateGrey, 0.01),
  },
  backgroundGrey: {
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
  },
  backgroundGrey2: {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(Colors.uniswapGrey, 0.7)
      : Colors.slateGreyDarker,
  },
});



export default withStyles(styles)( RowExpanderHidden );