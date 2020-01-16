import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { Product, CartItem, QuantityLabel, CartItemPurchasableStatus, VariantsLabel } from "typings/gqlTypes";
import RemoveCartItemButton from "components/RemoveCartItemButton";
import PriceDisplay2 from "components/PriceDisplay2";
import Link from "next/link";
// helpers
import { getYouTubeVimeoImagePreview } from "utils/strings";



const OrderItemPreview: React.FC<ReactProps> = (props) => {

  // state
  const [imgLoaded, setImgLoaded] = React.useState(false);
  // props
  const { classes, cartItem } = props;
  const { product } = cartItem;
  const { tagline, name } = product;
  const { previewItems } = option(product).chosenVariant();

  let previewItem = option(previewItems)[0]();

  // Figure out what to show for quantity and variant
  const hasVariants = product.currentVariants.length > 1;
  const variantName = product.chosenVariant.variantName;
  const hasQuantity = product.isQuantityEnabled;
  const quantity = cartItem.quantity || 1;
  let quantityText = "";
  if (hasQuantity) {
    switch (product.quantityLabel) {
      case QuantityLabel.SEATS: {
        quantityText = quantity === 1 ? "1 seat" : `${quantity} seats`
      }
      break;

      case QuantityLabel.QUANTITY: {
        quantityText = `Qty ${quantity}`
      }
      break;
    }
  }
  let variantAndQuantityText = ""
  if (hasVariants && hasQuantity) {
    variantAndQuantityText = `${variantName} • ${quantityText}`;
  } else if (hasVariants && !hasQuantity) {
    variantAndQuantityText = variantName;
  } else if (!hasVariants && hasQuantity) {
    variantAndQuantityText = quantityText;
  }

  // Determine what warning states should be shown, if any
  const productUpdatedAfterAdding = cartItem.createdAt < cartItem.product.updatedAt;
  const notPurchasable = cartItem.purchasableStatus !== CartItemPurchasableStatus.AVAILABLE;

  const warningText = printWarning(
    cartItem,
    product,
    notPurchasable,
    productUpdatedAfterAdding,
  );

  return (
    <ErrorBounds>
      <div className={clsx(
          classes.root,
        )}
      >
        <div className={clsx(classes.flexRow, classes.relative)}>
          <div className={clsx(classes.flexCol, classes.flexItem30)}>
          {
            option(previewItems)[0]() &&
            <Link
              href="/download/[productId]"
              as={`/download/${product.id}`}
            >
              <a className={classes.imageContainer}>
                {
                  option(previewItems)[0].image.original.id()
                  ? <img
                      className={classes.imagePreview}
                      // onLoad={() => setImgLoaded(true)}
                      src={option(previewItem).image.original.url()}
                      alt={option(previewItem).id()}
                    />
                  : <img
                      className={classes.imagePreview}
                      // onLoad={() => setImgLoaded(true)}
                      src={getYouTubeVimeoImagePreview(option(previewItem).youTubeEmbedLink())}
                      alt={option(previewItem).id()}
                    />
                }
              </a>
            </Link>
          }
          </div>
          <div className={classes.flexItem70}>
            <Typography variant="body1" className={classes.name}>
              <span>{name}</span>
            </Typography>
            {(hasVariants || hasQuantity) &&
              <Typography variant="body2" className={classes.variant}>
                <span>{variantAndQuantityText}</span>
              </Typography>
            }
            <Typography variant="caption">
              <PriceDisplay2
                priceDetails={props.cartItem.priceDetails}
                quantityAvailable={props.cartItem.product.chosenVariant.currentStockLevel && props.cartItem.product.chosenVariant.currentStockLevel.quantityAvailable}
                isSoldOut={props.cartItem.product.chosenVariant.isSoldOut}
                hideSavings={true}
              />
            </Typography>
          </div>
          <div className={classes.removeCartItemButtonBox}>
            <RemoveCartItemButton cartItem={cartItem}/>
          </div>
        </div>
        {(notPurchasable || productUpdatedAfterAdding) &&
          <Typography variant="caption">
            <span>{warningText}</span>
          </Typography>
        }
        {props.children}
      </div>
    </ErrorBounds>
  )
}

export const printWarning = (
  cartItem: CartItem,
  product: Product,
  notPurchasable: boolean,
  productUpdatedAfterAdding: boolean,
) => {
  let warningText = ""
  if (notPurchasable) {
    switch(cartItem.purchasableStatus) {
      case CartItemPurchasableStatus.QUANTITY_TOO_HIGH: {
        switch (product.quantityLabel) {
          case QuantityLabel.SEATS: {
            warningText = "That number of seats is not available – try selecting fewer"
          }
          break;

          case QuantityLabel.QUANTITY: {
            warningText = "That quantity is not available – try selecting fewer"
          }
          break;
        }
      }
      break;

      case CartItemPurchasableStatus.SOLD_OUT: {
        warningText = "This item is sold out"
      }
      break;

      case CartItemPurchasableStatus.VARIANT_UNAVAILABLE: {
        switch (product.variantsLabel) {
          case VariantsLabel.LICENSE: {
            warningText = "This license is no longer available"
          }
          break;

          case VariantsLabel.VARIANT: {
            warningText = "This variant is no longer available"
          }
          break;
        }
      }
      break;

      case CartItemPurchasableStatus.PRODUCT_UNAVAILABLE: {
        warningText = "No longer available"
      }
      break;
    }
  } else if (productUpdatedAfterAdding) {
    warningText = "This item has been updated since it was added"
  }
  return warningText
}


interface ReactProps extends WithStyles<typeof styles> {
  cartItem: CartItem ;
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: "1rem",
  },
  relative: {
    position: 'relative',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexItem70: {
    flexBasis: '70%',
    marginRight: '1rem',
  },
  flexItem30: {
    // height: '100%',
    // width: '100%',
    // flexBasis: '30%',
    width: '90px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fafafa",
    borderRadius: '4px',
    marginRight: '0.5rem',
    overflow: 'hidden',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23ddd' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  imageContainer: {
    height: '4rem',
    display: 'flex',
  },
  imagePreview: {
    // borderRadius: "4px",
    height: '100%',
    maxWidth: '6rem', // bigger than imageContainer
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  removeCartItemButtonBox: {
    position: 'absolute',
    // top: 'calc(50% - 1rem)', // 1rem: half the height of the icon
    top: '1rem',
    // bottom: 0,
    right: '0rem',
  },
  name: {
    fontWeight: 600,
    fontSize: '0.9rem',
    lineHeight: '1rem',
  },
  variant: {
    fontWeight: 500,
    fontSize: '0.8rem',
  },
});

export default withStyles(styles)( OrderItemPreview );
