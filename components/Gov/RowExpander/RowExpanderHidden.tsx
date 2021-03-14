import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { fade, lighten, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';



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
        <Collapse in={open} timeout="auto" unmountOnExit>
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
    backgroundColor: theme.palette.type === 'dark'
      ? lighten(Colors.uniswapGreyNavy, 0.01)
      : lighten(Colors.slateGrey, 0.01),
  },
  backgroundGrey: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
  },
  backgroundGrey2: {
    backgroundColor: theme.palette.type === 'dark'
      ? fade(Colors.uniswapGrey, 0.7)
      : Colors.slateGreyDarker,
  },
});



export default withStyles(styles)( RowExpanderHidden );