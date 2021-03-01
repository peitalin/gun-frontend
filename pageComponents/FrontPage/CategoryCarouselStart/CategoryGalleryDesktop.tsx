import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Components
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
// Router
import Link from "next/link";
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CategoryPreviewCard } from ".";




const CategoryGalleryDesktop = (props: ReactProps) => {

  const {
    classes,
    categoriesPreviewCards,
  } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const getImgSizes = () => {

    if (xlUp) {
      return {
        flexBasis: '25%',
      }
    } else if (lg) {
      return {
        flexBasis: '50%',
      }
    } else if (md) {
      return {
        flexBasis: '50%',
      }
    } else if (sm) {
      return {
        flexBasis: '50%',
      }
    } else {
      return {
        flexBasis: '25%',
      }
    }
  }


  return (
    <div className={smDown ? classes.innerRootSm : classes.innerRoot}>
      {
        categoriesPreviewCards.map((c, i) => {

          let imageUrl = c?.imageUrl

          return (
            <div className={classes.imageFlexItem}
              style={getImgSizes()}
            >
              <Link key={i}
                href="/categories/[categorySlug]"
                as={`/categories/${c?.slug}`}
              >
                <a className={classes.linkImage}>
                  {
                    (!!imageUrl) &&
                    <CardMedia
                      component="img"
                      // className={classes.image}
                      classes={{ media: classes.categoryImage }}
                      src={imageUrl}
                    />
                  }
                  <Typography variant="body1" className={classes.cardText}>
                    {c?.name}
                  </Typography>
                </a>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  categoriesPreviewCards: Array<CategoryPreviewCard>
  initialNumItems?: number
}


export const styles = (theme: Theme) => createStyles({
  innerRoot: {
    // transform: 'translate(-110px, 0px)',
    width: 'calc(100% - 0rem)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '0rem 0.5rem', // offset flexItem 0.5rem gutters
    marginBottom: '1rem',
  },
  innerRootSm: {
    // transform: 'translate(-10px, 0px)',
    width: 'calc(100% - 0rem)',
    paddingLeft: '0.25rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '0rem 0.5rem', // offset flexItem 0.5rem gutters
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
    border: `1px solid ${Colors.slateGrey}`,
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    background: Colors.slateGreyDark,
  },
  cardText: {
    marginTop: '0.5rem',
    marginBottom: '1rem',
    fontWeight: 700,
    fontSize: '1rem',
    textAlign: 'start',
  },
  imageFlexItem: {
    // position: 'relative',
    flexGrow: 1,
    cursor: 'pointer',
    minWidth: 200,
    maxWidth: 440,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  linkImage: {
    position: "relative",
    "& > p": {
      color: Colors.slateGreyDarkest,
    },
    "&:hover": {
      "& > p": {
        color: Colors.secondaryBright,
      },
    },
    width: '100%',
    height: '100%',
  },
});


export default withStyles(styles)( CategoryGalleryDesktop );

