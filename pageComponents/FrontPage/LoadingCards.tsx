import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
import PreviewCardLoading from "./PreviewCardLoading";


const LoadingCards = (props: ReactProps) => {

  const { classes, count = 8 } = props;

  const productLoading = {
    name: "",
    tagline: "",
  }

  return (
    <div className={classes.root}>
    {
      [...Array(count).keys()]
      .map(i =>
        <div key={i} className={classes.productImage}>
          <div className={clsx(
            classes.flexItem,
            classes.flexItemHover,
          )}>
            <PreviewCardLoading
              product={productLoading as any}
            />
          </div>
        </div>
      )
    }
    </div>
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  count?: number;
  alignCenter?: boolean;
}

/////////// Styles //////////////

export const cardCornerRadius = 4;
const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  paddingRight: {
    paddingRight: '1rem',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '1rem',
  },
  flexItem: {
    width: '100%',
    // borderBottom: "1px solid #f7f7f7",
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHover: {
    "&:hover": {
      // borderBottom: `1px solid ${Colors.purple}`, // purple
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
});


export default withStyles(styles)( LoadingCards );







