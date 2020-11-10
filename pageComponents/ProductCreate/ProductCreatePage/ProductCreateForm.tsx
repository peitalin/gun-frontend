import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatchign events to <form>
// Validation is triggered during dispatch to <form>

const ProductCreateForm: React.FC<ProductCreateFormProps> = (props) => {

  const { classes, asModal, closeModal, disableForm, children } = props;
  const { onSubmit } = props; // submits to Formik validation

  // with a callback to Formik.onSubmit prop
  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
  asModal?: boolean;
  closeModal(): void;
  disableForm?: boolean;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export default withStyles(styles)( ProductCreateForm );
