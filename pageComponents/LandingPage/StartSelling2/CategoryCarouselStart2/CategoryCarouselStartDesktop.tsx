import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Components
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
// theme css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  imagePosition: {
    // position: 'relative',
  },
});


export default withStyles(styles)( CategoryCarouselMainDesktop );

