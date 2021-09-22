import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  renderCategoryIcon
} from "components/CategoryCarouselStart/renderCategoryIcons"
import {
  categoryPreviewsBackup
} from "utils/categories"




const ProductPreviewThumbCategory = (props: ReactProps) => {

  const [previewLoaded, setPreviewLoaded] = React.useState(false);

  const { classes } = props;
  const theme = useTheme()
  const isDark = isThemeDark(theme)

  const categoryId = props.categoryId
  const category = categoryPreviewsBackup?.find(c => c.id === categoryId)

  return (
    <Card
      className={clsx(
        classes.card,
        props.className
      )}
      style={{
        height: props.height ? props.height : CARD_HEIGHT,
        width: props.width ? props.width : CARD_WIDTH,
      }}
    >
      <CardActionArea
        classes={{
          root: props.unclickable
            ? classes.disableCardActionArea
            : classes.cardActionArea
        }}
        style={props.style}
      >
        {
          renderCategoryIcon(category?.slug, isDark)
        }
      </CardActionArea>
    </Card>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  // previewItem: Product_Preview_Items;
  categoryId: string;
  className?: any;
  title?: string;
  style?: any;
  height?: any;
  width?: any;
  unclickable?: boolean;
  loadingMessage?: string
}


const CARD_HEIGHT = 100;
const CARD_WIDTH = 150;

const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  marginRight: {
    marginRight: "1rem",
  },
  imagePreviewPlaceholder: {
    borderRadius: BorderRadius,
    height: '100px',
    width: '150px',
  },
  imagePreview: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  imageMissingPreview: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    fontSize: "0.7rem",
    textAlign: "center",
    // textTransform: "uppercase",
  },
  card: {
    // borderRadius: `${BorderRadius}px`,
    borderRadius: '3px',
    boxShadow: 'none',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    transition:  theme.transitions.create(['width', 'height'], {
      easing: theme.transitions.easing.easeIn,
      duration: 300,
    }),
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
    padding: '0.25rem',
  },
  disableCardActionArea: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
    cursor: "default",
  },
  grey: {
    color: "#7C858E"
  },
  cardMedia: {
    objectFit: "cover",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardMediaFit: {
    objectFit: "cover",
  },
});


export default withStyles(styles)(ProductPreviewThumbCategory);
