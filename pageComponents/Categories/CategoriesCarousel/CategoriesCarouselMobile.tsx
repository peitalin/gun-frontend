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
  Categories
} from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "components/Divider";
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide"




const CategoriesCarouselMobile = (props: ReactProps) => {

  const {
    classes,
    categoriesMetadata
  } = props;


  return (
    <ErrorBounds className={classes.root} style={props.style}>
      <div className={classes.innerRootMobile}>
        <AirCarousel
          id={`category-links-carousel`}
          disableButtons={true}
          onlyShowButtonsOnMouseOver={false}
          scrollSnapType={"x proximity"}
          innerCarouselStyle={{
            width: 'calc(100% - 0rem)',
            borderRadius: BorderRadius2x,
          }}
        >
          {
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
  innerRootMobile: {
    width: 'calc(100% - 0rem)',
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


export default withStyles(styles)( CategoriesCarouselMobile );

