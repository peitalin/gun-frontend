import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius, BorderRadius2x } from "layout/AppTheme";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatchign events to <form>
// Validation is triggered during dispatch to <form>

const ProductCreateForm: React.FC<ProductCreateFormProps> = (props) => {

  const { classes, disableForm, children } = props;
  const { onSubmit } = props; // submits to Formik validation

  // with a callback to Formik.onSubmit prop
  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <form
      onSubmit={onSubmit}
      id={'on-submit-form'}
      className={clsx(
        smDown ? classes.formOuterContainerSm : classes.formOuterContainer,
      )}
    >
      {
        disableForm
        ? <>
            <div className={classes.coverGrey}/>
            <div className={disableForm ? classes.disableForm : null}>
              {children}
            </div>
          </>
        : <>{children}</>
      }
    </form>
  )
}



interface ProductCreateFormProps extends WithStyles<typeof styles> {
  disableForm?: boolean;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

const styles = (theme: Theme) => createStyles({
  formOuterContainer: {
    // background: "transparent",
    // border: `1px solid ${Colors.lightGrey}`,
    borderRadius: BorderRadius2x,
    // padding: '2rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  formOuterContainerSm: {
    // background: "transparent",
    borderRadius: BorderRadius2x,
    padding: '1rem 0rem 1rem 0rem',
    position: 'relative', // needed for coverGrey, position: absolute
  },
  coverGrey: {
    height: '100%',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: "#222",
    borderRadius: BorderRadius,
  },
  disableForm: {
    opacity: 0.5
  },
})

export default withStyles(styles)( ProductCreateForm );
