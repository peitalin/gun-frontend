import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { Categories } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Typography from "@material-ui/core/Typography";
import AirCarousel from "components/AirCarousel";
import AirItemTall from "components/AirCarousel/AirItemTall"
import CardMedia from "@material-ui/core/CardMedia";
// import Tooltip from '@material-ui/core/Tooltip';
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { categoryPreviewsBackup } from "./utils";




const CategoryCarouselMobile = (props: ReactProps) => {

  const {
    classes,
    categories,
  } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));


  const getScrollItemsForScreenSize = () => {
    if (xs) {
      return 2.5
    }
    if (sm) {
      return 2.5
    }
    if (md) {
      return 3
    }
    if (lg) {
      return 4
    }
    if (xl) {
      return 4
    } else {
      // SSR loading
      return -1
    }
  }

  let numItems = getScrollItemsForScreenSize() === -1
    ? props.initialNumItems
    : getScrollItemsForScreenSize()

  // let categoryGroups = splitArrayIntoGrid(categoriesMetadata, numItems)

  return (
    <ErrorBounds className={classes.root} style={props.style}>
      <div className={smDown ? classes.innerRootSm : classes.innerRoot}>
        <AirCarousel
          id={`category-linkImages-carousel`}
          handleClickLeft={() => {
            console.log('clicked left')
          }}
          handleClickRight={() => {
            console.log('clicked right')
          }}
          disableButtons={smDown ? true : false}
          scrollItemsPerClick={numItems - 1}
          onlyShowButtonsOnMouseOver={false}
          scrollSnapType={"x proximity"}
          innerCarouselStyle={{
            width: smDown ? 'calc(100% - 0rem)' : 'calc(100% - 1.5rem)',
            marginLeft: smDown ? '0rem' : '0.75rem',
            borderRadius: BorderRadius2x,
          }}
          buttonLeftStyle={{
            left: '0.25rem',
            top: '3rem',
          }}
          buttonRightStyle={{
            right: '0.25rem',
            top: '3rem',
          }}
        >
          {
            (categories ?? []).map((c, i) => {

              let imageUrl
              let lastImage = (c?.thumbImage?.variants ?? [])?.[0]

              if (c?.thumbImage?.variants?.length > 3) {
                imageUrl = c?.thumbImage?.variants?.[3]?.url
              } else {
                imageUrl = lastImage?.url
              }

              // if (!imageUrl) {
              //   imageUrl = categoryPreviewsBackup
              //     .find(backup => backup.slug === c.slug)?.imageUrl
              // }

              return (
                <AirItemTall key={i}
                  showNumItems={numItems}
                  title={""}
                  disableDither={true}
                  borderGutter={"0.25rem"}
                  style={{
                  }}
                >
                  <Link key={i}
                    href="/categories/[categorySlug]"
                    as={`/categories/${c?.slug}`}
                  >
                    <a className={classes.linkImage}>
                      <div className={classes.imagePositionRelative}>
                        {
                          (!!imageUrl)
                          ? <CardMedia
                              component="img"
                              // className={classes.image}
                              classes={{ media: classes.categoryImage }}
                              src={imageUrl}
                            />
                          : <div className={classes.emptyImage}/>
                        }
                        <Typography variant="body1" className={classes.cardText}>
                          {c?.name}
                        </Typography>
                      </div>
                    </a>
                  </Link>
                </AirItemTall>
              )
            })
          }
        </AirCarousel>
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  categories: Categories[]
  initialNumItems?: number
}


export const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    width: '100%',
  },
  innerRoot: {
    width: 'calc(100% - 0rem)',
  },
  innerRootSm: {
    marginBottom: '1rem',
    height: '120px',
    width: 'calc(100% - 0rem)',
    paddingLeft: '0.25rem',
  },
  title: {
    marginBottom: '0.5rem',
  },
  linkImage: {
    width: '100%',
    height: '120px',
    position: "relative",
    "& > div > p": {
      color: theme.palette.type === 'dark'
        ? Colors.uniswapLightestGrey
        : Colors.black,
    },
    "&:hover": {
      "& > div > p": {
        color: Colors.secondaryBright,
      },
    },
  },
  categoryImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    minHeight: 96,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    position: "absolute",
    top: 0,
    left: 0,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  cardText: {
    marginTop: '0.25rem',
    fontWeight: 600,
    position: "absolute",
    bottom: -120,
    left: 0,
  },
  emptyImage: {
    // height: "100%",
    // width: "100%",
    height: 96,
    width: "100%",
    borderRadius: BorderRadius2x,
    background: Colors.slateGrey,
    position: "absolute",
    top: 0,
    left: 0,
  },
  loadingCarouselBox: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loadingCarousel: {
    flexBasis: '50%',
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
    width: "100%",
    background: Colors.slateGrey,
    height: '4rem',
    borderRadius: BorderRadius2x,
  },
  imagePositionRelative: {
    position: 'relative',
  },
});


export default withStyles(styles)( CategoryCarouselMobile );

