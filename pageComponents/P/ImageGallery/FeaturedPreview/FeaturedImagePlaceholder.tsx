import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "./styles";
// Material UI
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageFeatured from "./PreviewImageFeatured";
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




const FeaturedImagePlaceholder = (props: ReactProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

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
          previewsMissing={props.previewsMissing}
          previewsMissingMessage={props.previewsMissingMessage}
        />
      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  transitioning?: boolean;
  previewsMissing?: boolean;
  previewsMissingMessage?: React.ReactNode
}


export default withStyles(styles)( FeaturedImagePlaceholder );

