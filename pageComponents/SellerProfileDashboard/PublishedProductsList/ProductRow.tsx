import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import { Product } from "typings/gqlTypes";
// Material UI
import ErrorBounds from "components/ErrorBounds";
import Button from "@material-ui/core/Button";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import Typography from "@material-ui/core/Typography";
import PriceDisplay7 from "components/PriceDisplay7";
import Loading from "components/Loading";
import SnackbarA from "components/Snackbars/SnackbarA";
// helpers
import { useRouter } from "next/router";
// MUI
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { publishProduct, unpublishProduct } from "queries/requests";
import { useApolloClient } from "@apollo/react-hooks";
// product edit
import {
  productToProductEditInput,
  removeFilesFromProductEditInput,
} from "utils/conversions";
import { DELETE_PRODUCT } from "queries/deletions-mutations";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import { getProductIdOrSlug } from "utils/links";



const ProductRow = (props: ReactProps) => {

  const {
    classes,
    product,
    hideDelete = false,
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
  const open = Boolean(anchorEl);
  const [copiedLink, setCopiedLink] = React.useState(false);

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const handlePublish = async() => {
    let res = await publishProduct(
      removeFilesFromProductEditInput(
        productToProductEditInput(product, true)
      ),
      apolloClient
    )
    await props.refetchProducts()
  };

  const handleUnpublish = async() => {
    // remove files, not a valid field in productEditInput graphql call
    let res = await unpublishProduct(
      removeFilesFromProductEditInput(
        productToProductEditInput(product, true)
      ),
      apolloClient
    )
    await props.refetchProducts()
  };


  const handleDelete = async() => {
    await apolloClient.mutate({
      mutation: DELETE_PRODUCT,
      variables: {
        productId: product.id
      },
    })
    await props.refetchProducts()
  };

  const copyText = () => {
    var copyText = document.getElementById(
      `copy_text_${product.id}`
    ) as HTMLInputElement;
    if (copyText) {
      copyText.select();
      document.execCommand("copy");
      setCopiedLink(true)
      // console.log("copied: ", copyText.value);
    } else {
      console.log("No element to copy");
    }
  }

  if (!option(product).featuredVariant()) {
    return <Loading />
  } else {
    return (
      <ErrorBounds className={clsx(
        classes.root,
        classes.flexRowWithBorder,
      )}>
        <div className={clsx(classes.flexRow, classes.flexGrow)}>
          <div className={classes.flexCol}>
          {
            product.featuredVariant.previewItems[0] &&
            <ProductPreviewCardRow
              previewItem={product.featuredVariant.previewItems[0]}
              height={
                mdDown
                  ? 50
                  : 80
              }
              width={
                mdDown
                  ? 50*1.5
                  : 80*1.5
              }
            />
          }
          </div>

          <div className={clsx(classes.flexCol, classes.flexGrow)}>
            <div className={clsx(classes.flexCol, classes.flexGrow, classes.marginLeft)}>
              <Link
                href="/p/[productIdOrSlug]"
                as={`/p/${getProductIdOrSlug(product)}`}
              >
                <a>
                  <Typography className={classes.name} variant="subtitle1">
                    {product.name}
                  </Typography>
                </a>
              </Link>
              <Typography className={classes.tagline} variant="body1">
                {product.tagline}
              </Typography>
              <PriceDisplay7
                priceDetails={product.featuredVariant.priceDetails}
                hideSavings={true}
                quantityAvailable={product.featuredVariant.currentStockLevel && product.featuredVariant.currentStockLevel.quantityAvailable}
                isSoldOut={product.featuredVariant.isSoldOut}
              />
              <Typography className={classes.published} variant="caption">
                {product.isPublished ? "PUBLISHED" : "UNPUBLISHED"}
              </Typography>
            </div>

            <div className={clsx(classes.flexColFlexEnd, classes.marginLeft)}>

              <Button
                classes={{
                  root: classes.editButton
                }}
                variant={"text"}
                color={"primary"}
                onClick={() => {
                  router.push(
                    "/seller/published-products/[productId]", // href
                    `/seller/published-products/${product.id}` // as
                  )
                }}
              >
                Edit
              </Button>

              {
                !hideViewButton &&
                <Button
                  variant={"outlined"}
                  classes={{
                    root: classes.viewButton
                  }}
                  onClick={() => {
                    router.push(
                      "/p/[productIdOrSlug]", // href
                      `/p/${getProductIdOrSlug(product)}` // as
                    )
                  }}
                >
                  View
                </Button>
              }

              {
                !hideShareLinkButton &&
                <Button
                  classes={{
                    root: classes.viewButton
                  }}
                  variant="text"
                  color="primary"
                  onClick={copyText}
                >
                  Share Link
                </Button>
              }
              <input
                className={classes.productNameCopy}
                type="text"
                value={`https://www.relaydownloads.com/p/${getProductIdOrSlug(product)}`}
                onChange={() => {}}
                id={`copy_text_${product.id}`}
              />

            </div>
          </div>

          <SnackbarA
            open={copiedLink}
            closeSnackbar={() => setCopiedLink(false)}
            message={`Copied product link!`}
            variant={"info"}
            autoHideDuration={3000}
          />

          <div className={clsx(classes.flexCol, classes.flexStart)}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.iconButton}
            >
              <MoreVertIcon />
            </IconButton>
          </div>

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
      </ErrorBounds>
    );
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  hideDelete?: boolean;
  hidePublish?: boolean;
  hideUnpublish?: boolean;
  hideViewButton?: boolean;
  hideShareLinkButton?: boolean,
  refetchProducts?(): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '0.5rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flexColFlexEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    marginRight: '0rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f2f2f2',
    position: 'relative',
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  name: {
    fontWeight: 600,
    color: Colors.charcoal,
    fontSize: "1rem",
    lineHeight: '1rem',
    marginBottom: '0.25rem',
  },
  tagline: {
    fontWeight: 600,
    fontSize: "0.8rem",
    color: Colors.grey,
  },
  published: {
    fontWeight: 500,
    fontSize: "0.7rem",
    color: Colors.grey,
  },
  editButton: {
    width: '100%',
    marginTop: '0.5rem',
    marginRight: '.5rem',
    minWidth: '150px',
    maxWidth: '250px',
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
    minWidth: '150px',
    maxWidth: '250px',
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
  productNameCopy: {
    opacity: 0,
    width: '10px', // must have a in width to copy?
  },
});

const ITEM_HEIGHT = 48;
const options = [
  'Suspend',
  'Delete',
  'Unpublish',
  'Publish',
];


export default withStyles(styles)(React.memo(
  (props: ReactProps) => <ProductRow {...props}/>,
  // (prevProps, nextProps) => {
  //   // return prevProps.product === nextProps.product
  //   return true
  // }
));
