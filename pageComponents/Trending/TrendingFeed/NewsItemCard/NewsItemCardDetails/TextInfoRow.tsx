import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";



const TextInfoRow: React.FC<ReactProps> = (props) => {

  const {
    classes,
    className,
    title,
    value
  } = props;

  return (
    <div className={classes.textInfoRowRoot}>
      <div className={clsx(classes.title, className)}>
        {title}
      </div>
      <div className={clsx(classes.value, className)}>
        {value}
      </div>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  value?: string;
  className?: any;
}

const styles = (theme: Theme) => createStyles({
  textInfoRowRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexBasis: '30%',
    minWidth: 120,
    fontSize: "0.8rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    textTransform: "uppercase",
  },
  value: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: "0.9rem",
    flexBasis: '70%',
    flexGrow: 1,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyLighterBlack,
  },
});


export default withStyles(styles)(TextInfoRow);
