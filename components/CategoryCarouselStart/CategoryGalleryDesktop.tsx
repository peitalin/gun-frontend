import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius, isThemeDark } from "layout/AppTheme";
// Components
import Typography from "@material-ui/core/Typography";
// Router
import Link from "next/link";
// typings
import { Categories } from "typings/gqlTypes";
// theme css
import { useTheme } from "@material-ui/core/styles";
import { renderCategoryIcon } from "./renderCategoryIcons";
import AspectRatioConstraint from "components/AspectRatioConstraint";




const CategoryGalleryDesktop = (props: ReactProps) => {

  const {
    classes,
    categories,
  } = props;

  const theme = useTheme()
  const isDark = isThemeDark(theme)

  const getImgSizes = () => {
    if (props.screenSize === 'xl') {
      return {
        flexBasis: '25%',
      }
    } else if (props.screenSize === 'lg') {
      return {
        flexBasis: '33%',
      }
    } else if (props.screenSize === 'md') {
      return {
        flexBasis: '33%',
      }
    } else if (props.screenSize === 'sm') {
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
    <div className={classes.innerRoot} style={props.style}>
      {
        (categories ?? []).map((c, i) => {

          return (
            <div className={classes.imageFlexItem}
              key={i}
              style={getImgSizes()}
            >
              <AspectRatioConstraint>
                <Link key={i}
                  href="/categories/[categorySlug]"
                  as={`/categories/${c?.slug}`}
                >
                  <a className={classes.linkImage}>
                    <div className={classes.categoryImage}>
                      {renderCategoryIcon(c.slug, isDark)}
                    </div>
                    <Typography variant="body1"
                      className={classes.cardText}
                      style={props.cardTextStyle}
                    >
                      {c?.name}
                    </Typography>
                  </a>
                </Link>
              </AspectRatioConstraint>
            </div>
          )
        })
      }
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  containerStyle?: any;
  cardTextStyle?: any;
  categories: Categories[]
  screenSize: "xs" | "sm" | "md" | "lg" | "xl"
}


export const styles = (theme: Theme) => createStyles({
  innerRoot: {
    // transform: 'translate(-110px, 0px)',
    width: 'calc(100% - 0rem)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap: 'wrap',
    padding: '0rem 0.5rem', // offset flexItem 0.5rem gutters
  },
  linkImage: {
    position: "relative",
    "& > p": {
      color: theme.palette.type === 'dark'
        ? Colors.uniswapLightestGrey
        : Colors.black,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.sharp,
        duration: "100ms",
      }),
    },
    "&:hover": {
      "& > p": {
        color: Colors.secondaryBright,
      },
    },
    width: '100%',
    height: '100%',
  },
  categoryImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    objectFit: 'contain',
    padding: '1rem',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    // border: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGreyDark}`,
    // background: theme.palette.type === 'dark'
    //   ? Colors.uniswapDarkNavy
    //   : Colors.slateGreyDark,
    // "&:hover": {
    //   background: theme.palette.type === 'dark'
    //     ? Colors.uniswapMediumNavy
    //     : Colors.slateGreyDarker,
    // },
    border: `1px solid ${Colors.uniswapLightNavy}`,
    background: Colors.uniswapDarkNavy,
    "&:hover": {
      background: Colors.uniswapMediumNavy
    },
    transition: theme.transitions.create('background', {
      easing: theme.transitions.easing.sharp,
      duration: "100ms",
    }),
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
    marginBottom: '2.5rem',
  },
});


export default withStyles(styles)( CategoryGalleryDesktop );

