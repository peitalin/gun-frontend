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
    <div className={clsx(
        classes.descriptionContainer,
        props.removeTopBorder ? null : classes.topBorder,
      )}
      style={props.containerStyle}
    >
      <Typography variant="subtitle2"
        className={classes.title}
        style={props.titleStyle}
      >
        { props.productName ?? "Description" }
      </Typography>
      <Typography
        variant="body1"
        className={clsx(
          classes.productDescription,
        )}
      >
        <span
          style={{ whiteSpace: WHITE_SPACE_FOR_P_TAGS }}
          dangerouslySetInnerHTML={{
            __html: String(props.productDescription ?? "")
          }}
        />
      </Typography>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  productDescription: string;
  productName?: string;
  titleStyle?: any;
  containerStyle?: any;
  removeTopBorder?: boolean;
}

const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    position: "relative",
    wordWrap: 'break-word',
    marginTop: '1rem',
    paddingTop: '2rem',
    paddingBottom: '1rem',
    // outlineOffset: '-2px',
    // outline: '2px dashed #28A',
  },
  title: {
    marginBottom: '1rem',
    fontWeight: 500,
  },
  topBorder: {
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${theme.colors.slateGrey}`,
  },
  productDescription: {
    maxHeight: "33vh",
    overflowY: 'hidden',
  },
});

export default withStyles(styles)( ProductDescription );
