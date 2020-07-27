import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { centsToDollarSelector } from "utils/selectors";
import { Product, OrderItem } from "typings/gqlTypes";
import PriceDisplayMain from "components/PriceDisplayMain";



const OrderItemPreview: React.FC<ReactProps> = (props) => {

  // state
  const [imgLoaded, setImgLoaded] = React.useState(false);
  // props
  const { classes, item } = props;
  const { title } = item.product;
  const { previewItems } = option(item).product.chosenVariant();
  let previewItem = option(previewItems)[0]();
  let price = option(item).product.chosenVariant.price();

  // const priceDetails = option(item).priceDetails();

  return (
    <ErrorBounds>
      <div className={classes.root}>
        <div className={clsx(classes.flexRow, classes.relative)}>
          <div className={clsx(classes.flexCol, classes.flexItem)}>
            <div className={classes.imageContainer}>
              {
                previewItem &&
                <img
                  className={clsx(
                    classes.imagePreview,
                  )}
                  onLoad={() => setImgLoaded(true)}
                  src={
                    option(previewItem).image.original.url()
                  }
                  alt={option(previewItem).id()}
                />
              }
            </div>
          </div>

          <div className={classes.flexItem70}>
            <Typography variant="body1" className={classes.name}>
              <span>{name}</span>
            </Typography>
            <PriceDisplayMain
              pastTense={true}
              price={price}
              quantityAvailable={null}
              isSoldOut={false}
            />
          </div>

        </div>
        {props.children}
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  item: OrderItem ;
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
  flexItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius,
    marginRight: '0.5rem',
    overflow: 'hidden',
    width: 90,
    height: 60,
    backgroundColor: "#fafafa",
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dddddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  imageContainer: {
    width: 90,
    height: 60,
    display: 'flex',
    backgroundColor: "#fafafa",
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dddddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  imagePreview: {
    // borderRadius: "4px",
    // height: '100%',
    // maxWidth: '6rem', // bigger than imageContainer
    width: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  name: {
    fontWeight: 600,
    lineHeight: '1rem',
    fontSize: '0.9rem',
  },
  removeCartItemButtonBox: {
    position: 'absolute',
    // top: 'calc(50% - 1rem)', // 1rem: half the height of the icon
    bottom: 0,
    right: '1rem',
  },
});

export default withStyles(styles)( OrderItemPreview );
