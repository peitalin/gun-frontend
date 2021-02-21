import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product } from "typings/gqlTypes";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
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
      )}
      style={props.containerStyle}
    >
      <Typography variant="subtitle2"
        className={classes.title}
        style={props.titleStyle}
      >
        { "Description" }
      </Typography>
      <Typography
        variant="body1"
        className={clsx(
          classes.productDescription,
        )}
      >
        <span
          style={{
            whiteSpace: WHITE_SPACE_FOR_P_TAGS
          }}
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
}

const styles = (theme: Theme) => createStyles({
  descriptionContainer: {
    position: "relative",
    wordWrap: 'break-word',
    marginTop: '1rem',
    padding: '1rem',
    border: theme.palette.type === 'dark'
      ? `1px solid ${theme.colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow3.boxShadow
      : 'unset',
  },
  title: {
    marginTop: '0.5rem',
    fontWeight: 500,
  },
  productDescription: {
    maxHeight: "33vh",
    overflowY: 'hidden',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
  },
});

export default withStyles(styles)( ProductDescription );
