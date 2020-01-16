import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";



const ProductDescription = (props: ReactProps) => {

  const [expandDescription, setExpandDescription] = React.useState(false);
  const { classes } = props;

  return (
    <ErrorBounds>
      <div className={classes.descriptionContainer}>
        <Typography variant="subtitle2" className={classes.title}>
          Description
        </Typography>
        <Typography
          variant="body1"
          className={clsx(
            classes.productDescription,
            expandDescription ? props.classes.expand : null,
          )}
        >
          <span dangerouslySetInnerHTML={{
            __html: String(option(props).product.description("Product unavailable"))
          }}/>
        </Typography>
        {
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
        }
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  product?: Product;
  loading?: boolean;
}

const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    height: "100%",
    position: "relative",
    maxWidth: 'calc(100vw - 2rem)',
    wordWrap: 'break-word',
  },
  title: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
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
