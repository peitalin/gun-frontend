import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product } from "typings/gqlTypes";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import { WHITE_SPACE_FOR_P_TAGS } from "components/TextEditor/globalWhiteSpaceSetting";



const ProductDescription = (props: ReactProps) => {

  const [expandDescription, setExpandDescription] = React.useState(false);
  const {
    classes,
  } = props;

  return (
    <div className={classes.descriptionContainer}>
      <Typography variant="subtitle2" className={classes.title}>
        Description
      </Typography>
      <Typography
        variant="body1"
        className={clsx(
          classes.productDescription,
          props.classes.expand,
          // expandDescription ? props.classes.expand : null,
        )}
      >
        <span
          style={{ whiteSpace: WHITE_SPACE_FOR_P_TAGS }}
          dangerouslySetInnerHTML={{
            __html: String(props.product?.currentSnapshot?.description ?? "")
          }}
        />
      </Typography>
      {/* {
        !expandDescription
        ? <Typography
            variant="subtitle1"
            className={classes.seeMore}
            onClick={() => setExpandDescription(true)}
          >
            See more
          </Typography>
        : <Typography
            variant="subtitle1"
            className={classes.seeLess}
            onClick={() => setExpandDescription(false)}
          >
            See less
          </Typography>
      } */}
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    position: "relative",
    wordWrap: 'break-word',
    marginTop: '1rem',
    borderTop: `1px solid ${theme.colors.uniswapLighterGrey}`,
    paddingTop: '2rem',
    paddingBottom: '1rem',

    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
  title: {
    marginBottom: '1rem',
    fontWeight: 500,
  },
  productDescription: {
    maxHeight: "33vh",
    overflowY: 'hidden',
  },
  expand: {
    maxHeight: "100%",
  },
  seeMore: {
    fontSize: '1rem',
    color: "#2484cF",
    cursor: "pointer",
    position: "absolute",
    "&:hover": {
      color: "#2484FF",
    },
  },
  seeLess: {
    fontSize: '1rem',
    color: "#2484cF",
    position: "absolute",
    cursor: "pointer",
    "&:hover": {
      color: "#2484FF",
    },
  },
});

export default withStyles(styles)( ProductDescription );
