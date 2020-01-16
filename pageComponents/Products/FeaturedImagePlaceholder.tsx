import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
// Material UI
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

  const imageId = option(previewItem).image.original.id()

  return (
    <div className={clsx(
      classes.featuredImageContainer,
      xsDown ? classes.featuredImageContainerXSDown : null
    )}>
      <PreviewImageFeatured
        previewItem={previewItem}
      />
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: ProductPreviewItem;
  onClick?(a: any): void;
}

const styles = (theme: Theme) => createStyles({
  featuredImageContainer: {
    overflow: 'hidden',
    width: '100%',
    background: '#f4f4f4',
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: "0.5rem",
    borderRadius: "2px 2px 2px 2px",
  },
  featuredImageContainerXSDown: {
    position: 'absolute',
    height: '100%',
    // top: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    borderRadius: '3px',
  },
  paperLoaded: {
    padding: theme.spacing(4),
  },
});


export default withStyles(styles)( FeaturedImagePlaceholder );

