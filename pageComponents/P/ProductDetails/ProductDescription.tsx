import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { commonBorderStyle } from "../common";
// GraphQL
import { Product } from "typings/gqlTypes";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";

// export const WHITE_SPACE_FOR_P_TAGS = "pre-wrap"
// // RENDERS newlines, spaces, etc in <p> tags.
// // What you see is what you get in spacing.



const ProductDescription = (props: ReactProps) => {

  const [expandDescription, setExpandDescription] = React.useState(false);
  const {
    classes,
  } = props;

  return (
    <div className={clsx(
        classes.descriptionContainer,
        process.browser && classes.descriptionBorder,
      )}
      style={props.containerStyle}
    >
      {
        process.browser &&
        <>
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
              // style={{
              //   whiteSpace: WHITE_SPACE_FOR_P_TAGS
              // }}
              dangerouslySetInnerHTML={{
                __html: String(props.productDescription ?? "")
              }}
            />
          </Typography>
        </>
      }
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
    minHeight: 190, // for SSR
    borderRadius: BorderRadius,
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  descriptionBorder: commonBorderStyle(theme),
  title: {
    marginTop: '0.5rem',
    fontWeight: 600,
    fontSize: "1rem",
  },
  productDescription: {
    // maxHeight: "33vh",
    overflowY: 'hidden',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
  },
});

export default withStyles(styles)( ProductDescription );
