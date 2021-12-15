import React from "react";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "./commonStyles";
// Icons
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const ProductEditFormLayout: React.FC<ProductEditFormProps> = (props) => {

  const { classes, children } = props;
  const { onSubmit } = props; // submits to Formik validation
  // with a callback to Formik.onSubmit prop
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={smDown ? classes.rootSm : classes.root}>
      <div className={classes.maxWidth500}>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}


interface ProductEditFormProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export default withStyles(styles)( ProductEditFormLayout );

