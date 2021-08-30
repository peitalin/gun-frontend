import React from "react";
import { useState } from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "../styles";
// Typings
import { StorePrivate } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
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



