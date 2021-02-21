import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors } from "layout/AppTheme";
// Typings
import {
  Categories,
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Button from "@material-ui/core/Button";
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide"
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useForcedSmoothScroll } from "utils/hooks";




const CategoriesCarouselDesktop = (props: ReactProps) => {

  const {
    classes,
    categoriesMetadata
  } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useForcedSmoothScroll() // only for this component

  const getScrollItemsForScreenSize = () => {
    if (xs) {
      return 2.5
    }
    if (sm) {
      return 2.5
    }
    if (md) {
      return 4
    }
    if (lg) {
      return 5
    }
    if (xl) {
      return 6
    }
  }

  return (
    <ErrorBounds className={classes.root} style={props.style}>
      <div className={classes.innerRoot}>
        <AirCarousel
          id={`category-links-carousel`}
          handleClickLeft={() => {}}
          handleClickRight={() => {}}
          disableButtons={false}
          scrollItemsPerClick={getScrollItemsForScreenSize() - 1}
          onlyShowButtonsOnMouseOver={false}
          scrollSnapType={"x proximity"}
          innerCarouselStyle={{
            width: 'calc(100% - 6rem)',
            marginLeft: '3rem',
            borderRadius: BorderRadius2x,
          }}
          buttonLeftStyle={{
            left: '0.25rem',
          }}
          buttonRightStyle={{
            right: '0.25rem',
          }}
        >
          {
            (categoriesMetadata?.length > 0) &&
            categoriesMetadata.map((c, i) =>
              <li>
                <Link key={c.id}
                  href="/categories/[categorySlug]"
                  as={`/categories/${c.slug}`}
                >
                  <a className={classes.link}>
                    <Button
                      className={classes.buttonNoWrap}
                      variant="text"
                      color="primary"
                      onClick={() => { }}
                    >
                      {c.name}
                    </Button>
                  </a>
                </Link>
              </li>
            )
          }
      </AirCarousel>
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  categoriesMetadata: Array<Categories>
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
    width: 'calc(100% - 2rem)',
  },
  title: {
    marginBottom: '0.5rem',
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      color: Colors.secondaryBright,
    },
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
  },
  buttonNoWrap: {
    whiteSpace: "nowrap",
    background: Colors.slateGrey,
  },
});


export default withStyles(styles)( CategoriesCarouselDesktop );

