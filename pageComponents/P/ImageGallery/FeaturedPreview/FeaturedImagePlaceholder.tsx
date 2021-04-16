import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items } from "typings/gqlTypes";
// Material UI
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageFeatured from "./PreviewImageFeatured";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';




const FeaturedImagePlaceholder = (props: ReactProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    classes,
  } = props;

  return (
    <AspectRatioConstraint>
      <div className={clsx(
        classes.featuredImageRoot,
        xsDown ? classes.featuredImageRootXSDown : null
      )}>
        <PreviewImageFeatured
          previewItem={undefined}
          showLoadingBar={true}
          transitioning={props.transitioning}
        />
      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  transitioning?: boolean;
}


export default withStyles(styles)( FeaturedImagePlaceholder );

