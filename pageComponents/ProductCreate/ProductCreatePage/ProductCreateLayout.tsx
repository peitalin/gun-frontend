import React from "react";
import clsx from "clsx";
import { createStyles, Theme, fade } from "@material-ui/core/styles";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// Product Preview Card
import ProductCardResponsive from "components/ProductCardResponsive";
import PreventDragDropContainer from "./PreventDragDropContainer";
import Tooltip from '@material-ui/core/Tooltip';
import {
  ID,
  ProductCreateInput,
  Product,
  Categories,
  UserPrivate,
  ProductVariantInput,
  StorePrivate,
} from "typings/gqlTypes";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatchign events to <form>
// Validation is triggered during dispatch to <form>

const ProductCreateLayout: React.FC<ProductCreateFormProps> = (props) => {

  const {
    classes,
    children
  } = props;

  // with a callback to Formik.onSubmit prop
  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div
      className={clsx(
        classes.root,
        classes.flexRowCenter,
        smDown ? classes.pageMarginSm : classes.pageMargin,
        "prevent-accidental-drag-drop-product-create-form"
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        console.log("ahh! you missed the dropzone")
        e.preventDefault()
      }}
    >

      <div className={clsx(classes.productColumn60)}>
        {children}
      </div>

      <div className={clsx(classes.productColumn40, 'fadeIn')}>
        {
          !mdDown &&
          <Tooltip title="Preview the Product Page" placement="bottom-start">
            <div className={clsx(
              classes.stickyProductPreviewContainer,
              'fadeIn',
            )}>
              <ProductCardResponsive
                product={props.productPreviewSticky}
                // cardsPerRowLayout={4}
                // boxShadow={true}
                previewImageEmptyMessage={`Step: ${props.activeStep + 1}`}
                // onClick={() => setOpenPreviewPage(true)}
              />
            </div>
          </Tooltip>
        }
      </div>
    </div>
  )
}



interface ProductCreateFormProps extends WithStyles<typeof styles> {
  productPreviewSticky: Product;
  activeStep: number
  setActiveStep?(a?: any): void
}

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  stickyProductPreviewContainer: {
    position: 'sticky',
    top: '7rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
    cursor: "pointer",
    // from SellingTips to product card preview
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  pageMargin: {
    margin: '0rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  pageMarginSm: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '2rem',
    paddingLeft: '0rem',
    paddingRight: '0rem',
  },
})

export default withStyles(styles)( ProductCreateLayout );
