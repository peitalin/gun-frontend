import React from "react";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ProductClaimFormLayout: React.FC<ProductClaimFormProps> = (props) => {

  const { classes, children } = props;
  const { onSubmit } = props; // submits to Formik validation
  // with a callback to Formik.onSubmit prop
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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

export default withStyles(styles)( ProductClaimFormLayout );

