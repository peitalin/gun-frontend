import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { ProductsConnection, ProductsEdge, SoldOutStatus, UserPrivate } from "typings/gqlTypes";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Router
import Link from "next/link";
// Typings
import { Product, ProductEditInput, ProductPrivate } from "typings/gqlTypes";
// Material UI
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewCardRowSmall from "components/ProductPreviewCardRowSmall";
import Typography from "@material-ui/core/Typography";
import PriceDisplayProductEdit from "components/PriceDisplayProductEdit";
import Loading from "components/Loading";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// helpers
import { useRouter } from "next/router";
// MUI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkIcon from '@material-ui/icons/Link';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Graphql
import { EDIT_PRODUCT } from "queries/products-mutations";
import { DELETE_PRODUCT } from "queries/deletions-mutations";
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
import { useApolloClient, useMutation, gql } from "@apollo/client";
import { ProductFragment } from "queries/fragments";
// product edit
import { productToProductEditInput } from "utils/conversions";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
// Copy
import copy from "clipboard-copy";
import { cacheUpdateDeleteProduct, cacheUpdateEditProduct } from "pageComponents/ProductEdit/cacheUpdateEditProduct";



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

  const dispatch = useDispatch();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [loadingPublish, setLoadingPublish] = React.useState(false);
  const open = Boolean(anchorEl);

  const snackbar = useSnackbar();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));


  const [editProduct, editProductResponse] = useMutation<MData, MVar>(
    EDIT_PRODUCT, {
    variables: {
      productEditInput: productToProductEditInput(product)
    },
    onCompleted: (data) => { },
    update: (cache, { data: { editProduct } }) => {
      cacheUpdateEditProduct({
        cache: cache,
        editProduct: editProduct
      })
    },
    // refetchQueries: [props.refetchQuery],
  });

  const [
    deleteProduct,
    deleteProductResponse
  ] = useMutation<MData2, { productId: string }>(
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
    setLoadingPublish(true)
    handleClose()
    // remove files, not a valid field in productEditInput graphql call
    await editProduct({
      variables: {
        productEditInput: {
          ...productToProductEditInput(product),
          isPublished: true
        }
      }
    })
    // await before refetching
    // await props.refetchProducts()
    setLoadingPublish(false)
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
    setLoadingPublish(true)
    handleClose()
    // remove files, not a valid field in productEditInput graphql call
    await editProduct({
      variables: {
        productEditInput: {
          ...productToProductEditInput(product),
          isPublished: false
        }
      }
    })
    // await before refetching
    // await props.refetchProducts()
    setLoadingPublish(false)
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
    setLoadingPublish(true)
    handleClose()
    deleteProduct({
      variables: {
        productId: product.id
      }
    })
    // await before refetching
    await props.refetchProducts()
    setLoadingPublish(false)
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



  let user = useSelector<GrandReduxState, UserPrivate>(s =>
    s.reduxLogin.user
  );
  let productName = product?.currentSnapshot?.title

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
              <Link href="/admin/products/[productId]"
                as={`/admin/products/${product.id}`} // as
              >
                <Tooltip title="Edit Product" placement="top-start">
                  <a className={classes.hoverOpacity}>
                    <ProductPreviewCardRowSmall
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

                <Link href="/admin/products/[productId]"
                  as={`/admin/products/${product.id}`}
                >
                  <a className={classes.copyLink}>
                    <Tooltip title="Edit Product" placement="top-start">
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

              {/* <Tooltip title="Copy Link">
                <a className={classes.copyLink} onClick={handleCopy}>
                  <Typography className={classes.affiliateLink} variant="body1">
                    {
                      (affiliateLink.length > 72 && xsDown)
                      ? affiliateLink.slice(0,72 - 3) + '...'
                      : affiliateLink
                    }
                  </Typography>
                </a>
              </Tooltip> */}
              <PriceDisplayProductEdit
                price={product.featuredVariant.price}
                soldOutStatus={product.soldOutStatus}
              />
            </div>
          </div>

          <div className={mdDown ? classes.rowCell2Mobile : classes.rowCell2}>
            <Typography variant="caption"
              className={clsx(
                (loadingPublish)
                  ? classes.loading
                  : product.isPublished
                    ? classes.published
                    : classes.unpublished,
                !(loadingPublish) && "fadeIn",
                (loadingPublish) && "pulseFast",
              )}
            >
              {
                product.isSuspended
                ? "SUSPENDED"
                : (loadingPublish)
                  ? "PENDING"
                  : product.isPublished
                    ? "PUBLISHED"
                    : "UNPUBLISHED"
              }
            </Typography>
          </div>

          <div className={mdDown ? classes.rowCell3Mobile : classes.rowCell3}>
            <Link href="/admin/products/[productId]"
              as={`/admin/products/${product.id}`} // as
            >
              <a>
                <Tooltip title="Edit Product">
                  <Button
                    variant="text"
                    color="primary"
                    classes={{
                      root: classes.button40,
                    }}
                  >
                    <EditIcon className={clsx(
                      classes.iconOuter,
                      // classes.fillHoverMagenta,
                    )}/>
                  </Button>
                </Tooltip>
              </a>
            </Link>


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
              {
                !hideDelete &&
                <MenuItem onClick={() => setOpenDeleteModal(true)}>
                  Delete
                </MenuItem>
              }
            </Menu>

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

interface MData {
  editProduct: { product: Product }
}
interface MVar {
  productEditInput: ProductEditInput
}
interface MData2 {
  deleteProduct: { products: Product[] }
}
interface MVar2 {
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
  affiliateLink: {
    fontWeight: 600,
    fontSize: "0.8rem",
    color: Colors.grey,
    // whiteSpace: 'pre-wrap',
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // width: '100%', // must set width for textOverflow
    "&:hover": {
      color: Colors.blue,
    },
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
  button40: {
    height: '40px',
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
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
});

const ITEM_HEIGHT = 48;


// export default withStyles(styles)(React.memo(
//   (props: ReactProps) => <ProductRow {...props}/>,
//   // (prevProps, nextProps) => {
//   //   // return prevProps.product === nextProps.product
//   //   return true
//   // }
// ));

export default withStyles(styles)( ProductRow )
