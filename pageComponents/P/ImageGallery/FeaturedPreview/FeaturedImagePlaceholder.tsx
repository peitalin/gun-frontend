import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
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
          showLoadingBar={false}
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

