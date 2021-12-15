import React from "react";
import clsx from "clsx";
import { Colors, isThemeDark } from "layout/AppTheme";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const ProductClaimFormLayout: React.FC<ProductClaimFormProps> = (props) => {

  const { classes, children } = props;
  const { onSubmit } = props; // submits to Formik validation
  // with a callback to Formik.onSubmit prop
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={smDown ? classes.rootSm : classes.root}>
      <div className={classes.maxWidth500}>
        <div className={classes.pageMargin}>
        </div>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}


interface ProductClaimFormProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rootSm: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '2rem',
  },
  maxWidth500: {
    // maxWidth: 500,
    width: '100%',
  },
  pageMargin: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '0rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
})


export default withStyles(styles)( ProductClaimFormLayout );

