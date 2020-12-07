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

// Product Preview Card
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsive";
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
    asModal,
    closeModal,
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
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        console.log("ahh! you missed the dropzone")
        e.preventDefault()
      }}
    >
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


      <div className={clsx(classes.productColumn60, classes.maxWidth)}>
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
              <PreviewCardResponsive
                product={props.productPreviewSticky}
                // cardsPerRowLayout={4}
                // boxShadow={true}
                // refetch={wishlistConnectionResponse.refetch}
                loadCarouselPics={props.loadCarouselPics}
                setLoadCarouselPics={props.setLoadCarouselPics}
                productIndex={0}
                // previewImageEmptyMessage={"Preview Listing"}
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
  loadCarouselPics?: object;
  setLoadCarouselPics?: React.Dispatch<React.SetStateAction<{}>>;
  asModal?: boolean;
  closeModal?(): void;
}


export default withStyles(styles)( ProductCreateLayout );
