import React from "react";
import { oc as option } from "ts-optchain";
import { Categories, Product } from "typings/gqlTypes";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
// hooks
import Link from "next/link";
import { categorySelectors } from "utils/selectors";




const CategoryBar: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  // const [expandCategories, setExpandCategories] = React.useState(false)

  return (
    <>
      {/* Dropdown menu version */}
      {/* {
        props.categories &&
        <CategoriesExpanded
          expandCategories={expandCategories}
          hideExpandCategories={() => setExpandCategories(false)}
          categories={props.categories}
          {...props}
        />
      } */}
    </>
  );
};

const CategoriesExpanded = (
  props: ReactProps & CategoriesExpandedProps
) => {

  const { classes } = props;
  const {
    design,
    video,
    sounds,
    musicGenres
  } = categorySelectors(props.categories)

  return (
    <>
      <div className={clsx(
        props.expandCategories ? classes.expandCategories : null,
        classes.categoriesMenu
      )}>
        <div className={classes.categoryOuterContainer}>
          <div className={classes.categoryInnerContainer}>
            <Typography variant="subtitle2" className={classes.categoryHeading}>
              Design
            </Typography>
            {
              design.map(c => {
                return (
                  <Link key={c.id}
                    href="/categories/[categoryIdOrName]"
                    as={`/categories/${c.id}`}
                  >
                    <a className={classes.categoryLink}>
                      <Typography className={classes.categoryLinkText}>
                        {c.name}
                      </Typography>
                    </a>
                  </Link>
                )
              })
            }
          </div>
          <div className={classes.categoryInnerContainer}>
            <Typography variant="subtitle2" className={classes.categoryHeading}>
              Video
            </Typography>
            {
              video.map(c => {
                return (
                  <Link key={c.id}
                    href="/categories/[categoryIdOrName]"
                    as={`/categories/${c.id}`}
                  >
                    <a className={classes.categoryLink}>
                      <Typography className={classes.categoryLinkText}>
                        {c.name}
                      </Typography>
                    </a>
                  </Link>
                )
              })
            }
          </div>
          <div className={classes.categoryInnerContainer}>
            <Typography variant="subtitle2" className={classes.categoryHeading}>
              Sounds
            </Typography>
            {
              sounds.map(c => {
                // disable <Link> for now.
                return (
                  <Link key={c.id}
                    href="/categories/[categoryIdOrName]"
                    as={`/categories/${c.id}`}
                  >
                    <a className={classes.categoryLink}>
                      <Typography className={classes.categoryLinkText}>
                        {c.name}
                      </Typography>
                    </a>
                  </Link>
                )
              })
            }
          </div>
          <div className={classes.categoryInnerContainer}>
            <Typography variant="subtitle2" className={classes.categoryHeading}>
              Music Genres
            </Typography>
            {
              musicGenres.map(c => {
                return (
                  <Link key={c.id}
                    href="/categories/[categoryIdOrName]"
                    as={`/categories/${c.id}`}
                  >
                    <a className={classes.categoryLink}>
                      <Typography className={classes.categoryLinkText}>
                        {c.name}
                      </Typography>
                    </a>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
      {
        props.expandCategories &&
        <CategoriesDither {...props}/>
      }
    </>
  )
}

const CategoriesDither = (props: ReactProps & CategoriesExpandedProps) => (
  <div
    className={clsx(props.classes.categoriesMenuDither, 'fadeInFast')}
    onClick={props.hideExpandCategories}
  >
  </div>
)


interface ReactProps extends WithStyles<typeof styles> {
  categories: Categories[];
  staticCategories: string[];
}

interface CategoriesExpandedProps {
  categories: Categories[]
  expandCategories: boolean;
  hideExpandCategories(): void;
}

export default withStyles(styles)( CategoryBar );
