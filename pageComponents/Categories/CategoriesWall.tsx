import React from "react";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
// MUI
import Typography from "@material-ui/core/Typography";
// hooks
import Link from "next/link";
import { Colors } from "layout/AppTheme";
import CategoryCarouselStart from "components/CategoryCarouselStart";




const CategoriesWall: React.FC<ReactProps> = (props) => {

  const {
    classes,
    categories,
  } = props;

  return (
    <div className={classes.categoryOuterContainer}>
      <div className={classes.categoryInnerContainer}>
        <CategoryCarouselStart
          disableTitle={true}
          initialCategories={props.categories}
        />
        {/* {
          props.categories &&
          (props.categories ?? []).map(c => {
            return (
              <Link key={c.id}
                href="/categories/[categorySlug]"
                as={`/categories/${c.slug}`}
              >
                <a className={classes.categoryLink}>
                  <Typography className={classes.categoryLinkText}>
                    {c.name}
                  </Typography>
                </a>
              </Link>
            )
          })
        } */}
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  categories: Categories[];
}

const categoryLinkColor2 = Colors.black
const categoryLinkColorHover2 = Colors.secondaryBright

const styles = (theme: Theme) => createStyles({
  categoryHeading: {
    marginBottom: "0.5rem",
  },
  categoryLinkGroups: {
    marginRight: '1rem',
  },
  categoryLink: {
    color: categoryLinkColor2,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    marginRight: '0.5rem',
    marginBottom: '1rem',
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: categoryLinkColorHover2,
      transition: theme.transitions.create(['color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkText: {
    color: categoryLinkColor2,
    minWidth: '50px',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: "row",
    fontSize: '0.9rem',
    fontWeight: 600,
    justifyContent: 'flex-start',
    alignItems: 'center',
    transition: theme.transitions.create(['color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: categoryLinkColorHover2,
      transition: theme.transitions.create(['color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  categoryInnerContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    minWidth: 215,
    marginBottom: '2rem',
  },
});

export default withStyles(styles)( CategoriesWall );
