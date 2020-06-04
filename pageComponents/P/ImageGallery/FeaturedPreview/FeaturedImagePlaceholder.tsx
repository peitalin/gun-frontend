import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
// Material UI
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageFeatured from "./PreviewImageFeatured";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';




const FeaturedImagePlaceholder = (props: ReactProps) => {

  const [imgModalLoaded, setImgModalLoaded] = React.useState(0);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    classes,
    previewItem,
  } = props;

  return (
    <AspectRatioConstraint>
      <div className={clsx(
        classes.featuredImageRoot,
        xsDown ? classes.featuredImageRootXSDown : null
      )}>
        <PreviewImageFeatured
          previewItem={previewItem}
          showLoadingBar={true}
        />
      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: ProductPreviewItem;
  onClick?(a: any): void;
}


export default withStyles(styles)( FeaturedImagePlaceholder );

