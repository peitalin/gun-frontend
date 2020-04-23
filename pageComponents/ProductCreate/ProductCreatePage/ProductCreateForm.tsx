import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Subcomponents
import SellingTipsMobile from "./SellingTipsMobile";

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "../SSR/UploadInputPlaceholder";

// Typings
import {
  ID,
  ProductCreateInput,
  Product,
  UserPrivate,
} from "typings/gqlTypes";
import {
  DzuPreviewOrder,
  DzuFilePreview
} from "typings/dropzone";
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
    <div className={clsx(classes.root)}>
      <div className={classes.maxWidth}>
        <div className={
          smDown ? classes.pageMarginSm : classes.pageMargin
        }>

          {
            asModal &&
            <div className={clsx(
              classes.flexCol,
              classes.orderTitle,
              classes.spaceBetween
            )}>
              <div className={classes.flexEnd}>
                <IconButton onClick={closeModal}>
                  <ClearIcon/>
                </IconButton>
              </div>
            </div>
          }

          {
            smDown &&
            <SellingTipsMobile/>
          }

          <form
            onSubmit={onSubmit}
            id={'on-submit-form'}
            className={clsx(
              smDown ? classes.formOuterContainerSm : classes.formOuterContainer,
            )}
          >
            {
              disableForm &&
              <div className={classes.coverGrey}/>
            }
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}


interface ProductCreateFormProps extends WithStyles<typeof styles> {
  asModal?: boolean;
  closeModal(): void;
  disableForm?: boolean;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export default withStyles(styles)( ProductCreateForm );
