import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// TYpings
import { OrderStatus, Order } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@mui/material/Typography";
// Icons
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
// theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const OrderDetailsPage: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const product = order.product;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  let form10FileId = order?.currentSnapshot?.form10File?.id;
  let form10MimeType = order?.currentSnapshot?.form10File?.mimeType;
  let form10Url = process.env.NODE_ENV === "production"
    ? `https://storage.googleapis.com/production-gunmarketplace-files/${form10FileId}`
    : `https://storage.googleapis.com/develop-gunmarketplace-files/${form10FileId}`

  // legacy Form10 images
  let form10ImageUrl = order?.currentSnapshot?.form10Image?.original?.url;
  // console.log("form10 image: ", form10ImageUrl)

  return (
    <ErrorBounds className={clsx(
      mdDown ? classes.rootMobile : classes.root,
      "fadeInFast",
    )}>

      <div className={classes.closeIconButtonContainer}>
        {
          props.closeModal &&
          <IconButton
            className={classes.closeIcon}
            onClick={props.closeModal}
            size={"medium"}
          >
            <ClearIcon/>
          </IconButton>
        }
      </div>

      <div className={classes.flexRowWrap}>
        {
          form10MimeType === "application/pdf"
          ? <embed
              className={classes.embedForm10Pdf}
              src={form10Url}
              width="100%"
              height="100%"
            />
          : <img
              className={classes.embedForm10Img}
              src={
                !!form10FileId
                  ? form10Url
                  : form10ImageUrl
              }
            />
        }
      </div>

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  closeModal?(): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1.5rem',
    paddingRight: '1.5rem',
    paddingLeft: '1.5rem',
    width: '100%',
    height: '100%',
  },
  rootMobile: {
    padding: '1rem',
    paddingTop: '2rem',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  embedForm10Pdf: {
    boxShadow: BoxShadows.shadow5.boxShadow,
    background: Colors.slateGreyLightBlack,
    width: '100vw',
    height: '100vh',
  },
  embedForm10Img: {
    boxShadow: BoxShadows.shadow5.boxShadow,
    background: Colors.slateGreyLightBlack,
    objectFit: "contain",
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
  },
  closeIcon: {
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0rem',
    top: '0rem',
  },
});

export default withStyles(styles)( OrderDetailsPage );