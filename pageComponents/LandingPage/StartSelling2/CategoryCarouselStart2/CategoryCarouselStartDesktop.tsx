import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Components
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CategoryPreviewCard } from ".";




const CategoryCarouselMainDesktop = (props: ReactProps) => {

  const {
    classes,
    categoriesPreviewCard,
  } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  // const md = useMediaQuery(theme.breakpoints.only("md"));
  // const lg = useMediaQuery(theme.breakpoints.only("lg"));
  // const xl = useMediaQuery(theme.breakpoints.only("xl"));

  const getImgSizes = () => {
    if (xs || sm) {
      return {
        height: 80,
        width: 120,
        marginRight: '1rem',
      }
    } else {
      return {
        height: 120,
        width: 180,
        marginRight: '1.5rem',
      }
    }
  }


  return (
    <div className={classes.innerRoot}>
      {
        categoriesPreviewCard.map((c, i) => {

          let imageUrl = c?.imageUrl

          return (
            <div key={i} className={classes.imagePosition}>
              {
                (!!imageUrl) &&
                <CardMedia
                  component="img"
                  // className={classes.image}
                  classes={{ media: classes.categoryImage }}
                  style={getImgSizes()}
                  src={imageUrl}
                />
              }
              <Typography variant="body1" className={classes.cardText}>
                {c?.name}
              </Typography>
            </div>
          )
        })
      }
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  categoriesPreviewCard: Array<CategoryPreviewCard>
  initialNumItems?: number
}


export const styles = (theme: Theme) => createStyles({
  innerRoot: {
    transform: 'translate(-110px, 0px)',
    width: 'calc(100% - 0rem)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: '0.5rem',
  },
  categoryImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    // width: '100%',
    // height: '100%',
    background: Colors.slateGrey,
  },
  cardText: {
    marginTop: '1rem',
    fontWeight: 700,
    fontSize: '1rem',
    textAlign: 'start',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  imagePosition: {
    // position: 'relative',
  },
});


export default withStyles(styles)( CategoryCarouselMainDesktop );

