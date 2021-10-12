import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ProductsConnection, ProductsEdge, SoldOutStatus, UserPrivate } from "typings/gqlTypes";
// Router
import Link from "next/link";
// Typings
import { Product, ProductEditInput, ProductPrivate } from "typings/gqlTypes";
// Material UI
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewThumb from "components/ProductPreviewThumb";
import Typography from "@material-ui/core/Typography";
import PriceDisplayProductEdit from "components/PriceDisplayProductEdit";
import Loading from "components/Loading";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// helpers
import { useRouter } from "next/router";
// MUI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import {
  PUBLISH_PRODUCT,
  UNPUBLISH_PRODUCT,
  MARK_PRODUCT_SOLD,
} from "queries/products-mutations";
import { DELETE_PRODUCT } from "queries/deletions-mutations";
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
import { useApolloClient, useMutation, gql } from "@apollo/client";
// product edit
import { productToProductEditInput } from "utils/conversions";
import ConfirmDeleteModal from "components/ConfirmActionModal";
// Copy
import copy from "clipboard-copy";
import { cacheUpdateDeleteProduct, cacheUpdateDashboardProduct } from "pageComponents/ProductEdit/cacheUpdateEditProduct";



const ProductRow = (props: ReactProps) => {

  const {
    classes,
    product,
    loading,
    hideDelete = false,
    hideEdit = false,
    hidePublish = false,
    hideUnpublish = false,
    hideViewButton = false,
    hideShareLinkButton = false,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openMarkProductSoldModal, setOpenMarkProductSoldModal] = React.useState(false);

  const [loadingState, setLoadingState] = React.useState(false);
  const open = Boolean(anchorEl);

  const snackbar = useSnackbar();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));


  const [publishProduct, publishProductResponse] = useMutation<MData3, MVar3>(
    PUBLISH_PRODUCT, {
    variables: {
      productId: product?.id
    },
    onCompleted: (data) => { },
    update: (cache, { data: { publishProduct } }) => {
      console.log("incomingProduct.id: ", publishProduct?.product?.id)
      console.log("incomingProduct.isPublished: ", publishProduct?.product?.isPublished)
      cacheUpdateDashboardProduct({
        cache: cache,
        product: publishProduct?.product
      })
    },
  });

  const [unpublishProduct, unpublishProductResponse] = useMutation<MData4, MVar4>(
    UNPUBLISH_PRODUCT, {
    variables: {
      productId: product?.id
    },
    onCompleted: (data) => { },
    update: (cache, { data: { unpublishProduct } }) => {
      console.log("incomingProduct.id: ", unpublishProduct?.product?.id)
      console.log("incomingProduct.isPublished: ", unpublishProduct?.product?.isPublished)
      cacheUpdateDashboardProduct({
        cache: cache,
        product: unpublishProduct?.product
      })
    },
  });

  const [markProductSold, markProductSoldResponse] = useMutation<MData5, MVar5>(
    MARK_PRODUCT_SOLD, {
    variables: {
      productId: product?.id
    },
    onCompleted: (data) => { },
    update: (cache, { data: { markProductSold } }) => {
      console.log("incomingProduct.id: ", markProductSold?.product?.id)
      console.log("incomingProduct.isPublished: ", markProductSold?.product?.isPublished)
      cacheUpdateDashboardProduct({
        cache: cache,
        product: markProductSold?.product
      })
    },
  });


  const [
    deleteProduct,
    deleteProductResponse
  ] = useMutation<MData2, MVar2>(
    DELETE_PRODUCT, {
    variables: {
      productId: product.id
    },
    onCompleted: (data) => {
    },
    update: (cache, { data: { deleteProduct } }) => {
      console.log("deleteProduct: ", deleteProduct)
      cacheUpdateDeleteProduct({
        cache: cache,
        deletedProductId: deleteProduct?.products?.[0]?.id ?? product?.id
      })
    },
    // refetchQueries: [props.refetchQuery],
  })

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePublish = async() => {
    if (product.soldOutStatus !== SoldOutStatus.AVAILABLE) {
      snackbar.enqueueSnackbar(
        `${product.soldOutStatus} product cannot be published.`,
        { variant: "info"}
      )
      return
    }
    setLoadingState(true)
    handleClose()

    await publishProduct({
      variables: {
        productId: product?.id
      }
    })
    // await before refetching
    // await props.refetchProducts()
    setLoadingState(false)
  };

  const handleUnpublish = async() => {
    if (
      product.soldOutStatus !== SoldOutStatus.AVAILABLE
      && product.soldOutStatus !== SoldOutStatus.ABANDONED
    ) {
      snackbar.enqueueSnackbar(
        `${product.soldOutStatus} product cannot be unpublished.`,
        { variant: "info"}
      )
      return
    }
    setLoadingState(true)
    handleClose()

    await unpublishProduct({
      variables: {
        productId: product?.id
      }
    })
    // await before refetching
    // await props.refetchProducts()
    setLoadingState(false)
  };

  const handleMarkProductSold = async() => {
    if (
      product.soldOutStatus !== SoldOutStatus.AVAILABLE
      && product.soldOutStatus !== SoldOutStatus.ABANDONED
    ) {
      snackbar.enqueueSnackbar(
        `${product.soldOutStatus} product cannot be marked sold.`,
        { variant: "info"}
      )
      return
    }
    setLoadingState(true)
    handleClose()

    await markProductSold({
      variables: {
        productId: product?.id
      }
    })
    // await before refetching
    // await props.refetchProducts()
    setLoadingState(false)
  };

  const handleDelete = async() => {
    if (
      product.soldOutStatus !== SoldOutStatus.AVAILABLE
      && product.soldOutStatus !== SoldOutStatus.ABANDONED
    ) {
      snackbar.enqueueSnackbar(
        `${product.soldOutStatus} product cannot be deleted.`,
        { variant: "info"}
      )
      return
    }
    setLoadingState(true)
    handleClose()
    deleteProduct({
      variables: {
        productId: product.id
      }
    })
    // await before refetching
    await props.refetchProducts()
    setLoadingState(false)
  };


  const handleCopy = async () => {
    snackbar.enqueueSnackbar(
      "Copied product link!",
      { variant: "info" }
    )
    await copy(
      process.env.NODE_ENV === "development"
      ? `dev.gunmarketplace.com.au/p/${product.id}`
      : `gunmarketplace.com.au/p/${product.id}`
    )
  };


  let productName = product?.currentSnapshot?.title
  let viewCount = (product as ProductPrivate)?.uniqueProductViews?.aggregate?.count ?? 0

  let dealerMissing = !product.currentSnapshot?.dealerId


  if (!product?.featuredVariant) {
    return <Loading />
  } else {
    return (
      <ErrorBounds className={clsx(
        classes.root,
        mdDown ? classes.flexRowWithBorderMobile : classes.flexRowWithBorder,
      )}>
        <div className={
          mdDown ? classes.innerRowMobile : classes.innerRow
        }>
          <div className={mdDown ? classes.rowCell1Mobile : classes.rowCell1}>
            {
              product.featuredVariant.previewItems[0] &&
              <Link href="/p/[productId]"
                as={`/p/${product.id}`} // as
              >
                <Tooltip title="View Product" placement="top-start">
                  <a className={classes.hoverOpacity}>
                    <ProductPreviewThumb
                      previewItem={product.featuredVariant.previewItems[0]}
                      height={
                        mdDown
                          ? 35
                          : 45
                      }
                      width={
                        mdDown
                          ? 35*1.6
                          : 45*1.6
                      }
                    />
                  </a>
                </Tooltip>
              </Link>
            }
            <div className={clsx(classes.flexCol, classes.marginLeft)}>

              <Link href="/p/[productId]"
                as={`/p/${product.id}`}
              >
                <a className={classes.copyLink}>
                  <Tooltip title="View Product" placement="top-start">
                    <Typography className={classes.name} variant="subtitle1">
                      {
                        (productName.length > 45 && xsDown)
                        ? productName.slice(0, 45 - 3) + '...'
                        : productName
                      }
                    </Typography>
                  </Tooltip>
                </a>
              </Link>

              {
                (viewCount > 0) &&
                <Tooltip title="Views from registered buyers">
                  <Typography className={classes.viewsByBuyers} variant="body1">
                    { `Views: ${viewCount}` }
                  </Typography>
                </Tooltip>
              }

              <PriceDisplayProductEdit
                price={product.featuredVariant.price}
                soldOutStatus={product.soldOutStatus}
                isSuspended={product.isSuspended}
              />
            </div>
          </div>

          <div className={mdDown ? classes.rowCell2Mobile : classes.rowCell2}>
            <Typography variant="caption"
              className={clsx(
                (loadingState)
                  ? classes.loading
                  : product.isPublished
                    ? classes.published
                    : classes.unpublished,
                !(loadingState) && "fadeIn",
                (loadingState) && "pulseFast",
              )}
            >
              { displayProductStatus(product, loadingState) }
            </Typography>
          </div>

          <div className={mdDown ? classes.rowCell3Mobile : classes.rowCell3}>

            <Tooltip title="Add a Dealer"
              placement="top"
              arrow={true}
              open={dealerMissing}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <div>
                <Link href="/admin/products/[productId]"
                  as={`/admin/products/${product.id}`} // as
                >
                  <a>
                    <Tooltip title="Edit Product">
                      <Button
                        variant="text"
                        color="primary"
                        classes={{
                          root: dealerMissing
                            ? classes.button40Highlight
                            : classes.button40,
                        }}
                      >
                        <EditIcon className={clsx(
                          dealerMissing ? classes.iconOuterHighlight : classes.iconOuter,
                          // classes.fillHoverMagenta,
                        )}/>
                      </Button>
                    </Tooltip>
                  </a>
                </Link>
              </div>
            </Tooltip>


            {
              !hideShareLinkButton &&
              <Tooltip title="Copy Product Link">
                <Button
                  classes={{
                    root: classes.button40,
                  }}
                  variant="text"
                  color="primary"
                  onClick={handleCopy}
                >
                  <LinkIcon className={clsx(
                    classes.iconOuter,
                    // classes.fillHoverBlue,
                  )}/>
                </Button>
              </Tooltip>
            }

            <Tooltip title="More Options">
              <Button
                classes={{ root: classes.button40b }}
                variant="text"
                color="primary"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </Button>
            </Tooltip>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {
                !hidePublish &&
                <MenuItem onClick={handlePublish}>
                  Publish
                </MenuItem>
              }
              {
                !hideUnpublish &&
                <MenuItem onClick={handleUnpublish}>
                  Unpublish
                </MenuItem>
              }

              {
                !hideViewButton &&
                <Link href="/p/[productId]"
                  as={`/p/${product.id}`}
                >
                  <a>
                    <MenuItem>
                      View Product Page
                    </MenuItem>
                  </a>
                </Link>
              }

              <MenuItem onClick={() => setOpenMarkProductSoldModal(true)}>
                <>
                  Mark as Sold
                  <ErrorOutlineIcon className={classes.warningIcon} />
                </>
              </MenuItem>

              {
                !hideDelete &&
                <MenuItem onClick={() => setOpenDeleteModal(true)}>
                  <>
                    Delete
                    <ErrorOutlineIcon className={classes.warningIcon} />
                  </>
                </MenuItem>
              }

            </Menu>

            <ConfirmDeleteModal
              title={"Do you wish to mark this product sold?"}
              showModal={openMarkProductSoldModal}
              setShowModal={() => setOpenMarkProductSoldModal(s => !s)}
              onConfirmFunction={handleMarkProductSold}
            />
            <ConfirmDeleteModal
              title={"Do you wish to delete this product?"}
              showModal={openDeleteModal}
              setShowModal={() => setOpenDeleteModal(s => !s)}
              onConfirmFunction={handleDelete}
            />
          </div>

        </div>
      </ErrorBounds>
    );
  }
}


const displayProductStatus = (product: Product, loadingState: boolean) => {
  if (product.isSuspended) {
    return "SUSPENDED"
  }
  if (
    product.soldOutStatus === SoldOutStatus.SOLD_OUT
    || product.isSoldElsewhere
  ) {
    return "SOLD"
  }
  if (product.soldOutStatus === SoldOutStatus.ABANDONED) {
    return "ABANDONED"
  }
  if (product.isDeleted) {
    return "DELETED"
  }
  if (loadingState) {
    return "PENDING"
  }
  if (product.isPublished) {
    return "PUBLISHED"
  } else {
    return "UNPUBLISHED"
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  loading?: boolean;
  hideDelete?: boolean;
  hideEdit?: boolean;
  hidePublish?: boolean;
  hideUnpublish?: boolean;
  hideViewButton?: boolean;
  hideShareLinkButton?: boolean,
  refetchProducts?(): Promise<void>;
  refetchQuery: { query: any, variables: any };
}

interface MData2 {
  deleteProduct: { products: Product[] }
}
interface MVar2 {
  productId: string
}

interface MData3 {
  publishProduct: { product: Product }
}
interface MVar3 {
  productId: string
}
interface MData4 {
  unpublishProduct: { product: Product }
}
interface MVar4 {
  productId: string
}
interface MData5 {
  markProductSold: { product: Product }
}
interface MVar5 {
  productId: string
}



const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  innerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  innerRowMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
    width: "100%",
  },
  rowCell1: {
    width: "60%",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
    minWidth: 300,
  },
  rowCell2: {
    width: "10%",
    flexGrow: 1,
    padding: '0.5rem',
    minWidth: 100,
  },
  rowCell3: {
    width: "30%",
    flexGrow: 1,
    paddingLeft: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    minWidth: 150,
  },
  rowCell1Mobile: {
    width: "100%",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: "0.5rem",
  },
  rowCell2Mobile: {
    width: "100%",
    flexGrow: 1,
    paddingRight: '0rem',
    paddingBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rowCell3Mobile: {
    width: "100%",
    flexGrow: 1,
    paddingLeft: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexRowFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: '0.5rem',
    marginBottom: '1rem',
    marginRight: '0rem',
    paddingBottom: '1rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGrey}`,
    position: 'relative',
  },
  flexRowWithBorderMobile: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: '0.5rem',
    marginBottom: '1rem',
    marginRight: '0rem',
    paddingBottom: '0.5rem',
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGrey}`,
    position: 'relative',
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  name: {
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.charcoal,
    fontSize: "1rem",
    lineHeight: '1rem',
    marginBottom: '0.25rem',
    // fix retard long titles
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    overflow: 'hidden',
    height: '100%',
    width: '100%', // must set width for textOverflow
    maxWidth: 300,

    // whiteSpace: 'pre-wrap',
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // width: '100%', // must set width for textOverflow
    "&:hover": {
      color: Colors.blue,
    },
  },
  viewsByBuyers: {
    fontWeight: 600,
    fontSize: "0.8rem",
    color: Colors.grey,
    // whiteSpace: 'pre-wrap',
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // width: '100%', // must set width for textOverflow
    // "&:hover": {
    //   color: Colors.blue,
    // },
  },
  published: {
    fontWeight: 500,
    fontSize: "0.7rem",
    color: Colors.green,
    // color: theme.palette.type === 'dark'
    //   ? Colors.green
    //   : Colors.lightBlue,
  },
  unpublished: {
    color: Colors.grey,
  },
  loading: {
    color: Colors.yellow,
  },
  editButton: {
    width: '100%',
    marginTop: '0.5rem',
    marginRight: '.5rem',
    minWidth: '120px',
    maxWidth: '200px',
    border: '1px solid #EDF0F2',
    height: 40,
    flexGrow: 1,
    "&:hover": {
      border: `1px solid ${Colors.mediumGrey}`,
    },
    backgroundColor: Colors.slateGrey,
  },
  viewButton: {
    width: '100%',
    marginTop: '0.5rem',
    marginRight: '.5rem',
    minWidth: '120px',
    maxWidth: '200px',
    border: '1px solid #dadada',
    height: 40,
    flexGrow: 1,
    "&:hover": {
    }
  },
  iconButton: {
    right: 0,
    top: 0,
  },
  iconOuter: {
    fill: theme.palette.primary.main,
  },
  iconOuterHighlight: {
    fill: Colors.ultramarineBlue,
  },
  button40: {
    height: '40px',
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  button40Highlight: {
    height: '40px',
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    border: `2px solid ${Colors.ultramarineBlue}`,
  },
  button40b: {
    height: '40px',
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
    marginRight: '0rem',
    marginBottom: '0.5rem',
  },
  fillHoverBlue: {
    "&:hover": {
      fill: Colors.blue,
    },
  },
  fillHoverMagenta: {
    "&:hover": {
      fill: Colors.magenta,
    },
  },
  copyLink: {
    cursor: "pointer",
  },
  hoverOpacity: {
    "&:hover": {
      opacity: 0.7,
    },
  },
  warningIcon: {
    marginLeft: '0.25rem',
  },
});

const ITEM_HEIGHT = 48;



export default withStyles(styles)( ProductRow )
