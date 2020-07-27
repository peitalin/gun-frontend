import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
// styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { connect } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Typings
import { Product, Order, OrderItem, ID  } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import OrderDetails from "./OrderDetails";
// File requests
import DownloadItem from "./DownloadItem";
import Link from "next/link";
// mediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { getStoreIdOrSlug } from "utils/links";



const DownloadCard: React.FC<DownloadCardProps> = (props) => {

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { classes, product, order, orderItemId } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <div className={clsx(classes.flexRowWithBorder, "fadeIn")}>
      <ErrorBounds className={classes.root}>

        <div className={clsx(
          classes.flexRow,
          (!order && !product) ? "pulse" : null,
        )}>
          <div className={clsx(
            classes.flexCol,
            props.isRefunded ? classes.refundedGrayscale : null,
          )}>
            {
              smDown
              ? <ProductPreviewCardRow
                  previewItem={option(product).chosenVariant.previewItems[0](null)}
                  height={55}
                  width={88}
                />
              : <ProductPreviewCardRow
                  previewItem={option(product).chosenVariant.previewItems[0](null)}
                  height={80}
                  width={128}
                />
            }
          </div>

          <div className={clsx(
            classes.flexCol,
            classes.width100,
            classes.marginLeft,
          )}>
            <div className={clsx(
              classes.flexCol,
              'fadeIn',
              props.isRefunded ? classes.refundedGrayscale : null,
            )}>
              <Typography className={classes.name} variant="body2">
                {option(product).title("")}
              </Typography>
              <Typography className={classes.tagline} variant="body2">
                {option(product).model("")}
              </Typography>
              <Typography className={classes.variant} variant="body2">
                {
                  `${option(product).chosenVariant.variantName("")}`
                }
              </Typography>
              <Link
                href="/s/[storeId]"
                as={`/s/${option(product).store.id()}`}
              >
                <a>
                  <Typography className={classes.storeName} variant="body2">
                    {option(product).store.name()}
                  </Typography>
                </a>
              </Link>
            </div>

            <div className={classes.flexRowFlexEnd}>
              <Button
                className={classes.orderDetailsButton}
                variant={"outlined"}
                color={"primary"}
                disabled={!order}
                onClick={() => setShowOrderDetails(true)}
              >
                <Typography
                  className={classes.orderDetailsButtonText}
                  variant={"body2"}
                >
                  Order Details
                </Typography>
              </Button>
            </div>

          </div>
        </div>
        <OrderDetails
          order={order}
          displayModal={showOrderDetails}
          closeModal={() => setShowOrderDetails(false)}
        />
      </ErrorBounds>

      {/* <div className={clsx(
        classes.fileCol,
        option(product).chosenVariant.files([]).length && classes.downloadsBorder,
        props.isRefunded ? classes.refundedGrayscale : null,
      )}>
      {
        option(product).chosenVariant.files() &&
        !props.isRefunded &&
        product.chosenVariant.files.map(file => {
          return (
            <DownloadItem
              key={file.id}
              file={file}
              orderItemId={orderItemId}
              productId={product.id}
              variantId={option(product).chosenVariant.variantId()}
              isRefunded={props.isRefunded}
            />
          )
        })
      }
      </div> */}

    </div>
  )
}

type DownloadCardProps = ReactProps & ReduxProps;

interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  orderItemId: ID;
  product: Product;
  isRefunded: boolean;
}
interface ReduxProps {
  toggleGiftDownloadModal(payload: boolean): void;
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState ) => {
  return {}
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    toggleGiftDownloadModal: (payload: boolean) => dispatch(
      Actions.reduxModals.TOGGLE_GIFT_DOWNLOAD_MODAL(payload)
    ),
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },
  width100: {
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexRowOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    margin: "0.5rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    marginRight: '0rem',
    paddingBottom: '1rem',
    // borderBottom: `1px solid ${Colors.lightGrey}`,
  },
  flexRowFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: Colors.charcoal,
    marginBottom: "0.25rem",
  },
  tagline: {
    fontWeight: 600,
    color: Colors.darkGrey,
    marginBottom: "0.25rem",
  },
  variant: {
    fontWeight: 600,
    color: Colors.darkGrey,
    marginBottom: "0.25rem",
  },
  storeName: {
    fontWeight: 600,
    color: Colors.grey,
    marginBottom: "0.25rem",
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  fileCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: "1rem",
    padding: '0.5rem',
    minHeight: 62,
  },
  downloadsBorder: {
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: "4px",
  },
  orderDetailsButton: {
    marginRight: '0.75rem',
    height: '35px',
    minWidth: '120px',
    border: '1px solid #dadada',
    "&:hover": {
      border: '1px solid #aaaaaa',
    }
  },
  orderDetailsButtonText: {
    fontSize: '0.7rem',
    color: Colors.darkGrey,
    fontWeight: 600,
  },
  refundedGrayBlur: {
    filter: 'grayscale(1) blur(0.75px)',
  },
  refundedGrayscale: {
    filter: 'grayscale(1)',
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)( DownloadCard ));
