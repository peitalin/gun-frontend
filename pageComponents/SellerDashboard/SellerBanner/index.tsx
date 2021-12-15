import React from "react";
import { useState } from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from "../styles";
// Typings
import { StorePrivate } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
// Components
import Banner from "components/Banner";



const SellerBanner = (props: ReactProps) => {

  const { classes, storePrivate, ...routerProps } = props;
  // state
  const [editMode, setEditMode] = useState(false);
  const [bannerImgUrl, setBannerImgUrl] = useState("");

  return (
    <Banner
      height={280}
      dither={true}
      ditherDark={false}
      color={'#242424'}
      src={bannerImgUrl}
    >
      <div className={classes.cornerButtonContainer}>
        <Button
          className={classes.cornerButton}
          variant="outlined"
          onClick={() => setEditMode(!editMode)}
          classes={{ outlined: classes.cornerButtonOutline }}
        >
          { editMode ? 'Cancel' : 'Edit Payout Bank'}
        </Button>
      </div>
    </Banner>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  storePrivate: StorePrivate;
}

export default withStyles(styles)( SellerBanner );



