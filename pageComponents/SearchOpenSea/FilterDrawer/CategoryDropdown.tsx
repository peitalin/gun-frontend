import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius4x,
  BorderRadius2x,
  BorderRadius,
  Gradients,
  BoxShadows
} from "layout/AppTheme";
import Button from "@material-ui/core/Button";
import Link from "next/link";
// Graphql
import { useQuery } from '@apollo/client';
// Categories
import { Categories } from "typings/gqlTypes";
import { GET_CATEGORIES } from "queries/categories-queries";
import {
  categoryPreviewsBackup
} from "utils/categories"




const CategoryDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // Apollo Graphql
  // const categoryData = useQuery<{ getCategories: Categories[] }, null>(
  //   GET_CATEGORIES,
  // )

  // let categoriesDropdownItems = props.syncUrlToCategory
  //   ? [ ...(categoryData?.data?.getCategories ?? []) ]
  //   : [
  //       { id: undefined, slug: 'all', name: "All Categories" },
  //       ...(categoryData?.data?.getCategories ?? []),
  //     ]

  let categoriesRemovedItems = categoryPreviewsBackup.filter(c => c.slug !== 'items')

  // let categoriesDropdownItems = props.syncUrlToCategory
  //   ? [ ...(categoriesRemovedItems ?? []) ]
  //   : [
  //       { id: undefined, slug: 'all', name: "All Categories" },
  //       ...(categoriesRemovedItems ?? []),
  //     ]

  let categoriesDropdownItems = [
    ...(categoriesRemovedItems ?? []),
    { id: undefined, slug: 'all', name: "All Categories" },
  ]
  // let selectedCategory = props.currentCategories?.[0]

  return (
    <div className={clsx(
        classes.categoryDropdownRoot,
        props.className,
      )}
    >
      <div className={classes.categoryDropdownContainer}>
        <div className={classes.categoryButtonsContainer}>
          {
            props.syncUrlToCategory
            ? categoriesDropdownItems.map((category, i) => {
                // a category change triggers a route change
                // if we enable syncUrlToCategory
                return (
                  <Link key={category.name + `${i}`}
                    href={`/new?category=${category?.slug}`}
                  >
                    <a>
                      <Button
                        key={category.name + `${i}`}
                        classes={{
                          root: clsx(
                            classes.buttonRoot,
                            (props.currentCategories ?? []).find(c => category?.id === c?.id)
                              ? classes.buttonSelected
                              : null,
                          )
                        }}
                        variant="outlined"
                        onClick={() => {
                          // console.log("setting: ", category)
                          if (category.slug === 'all') {
                            props.setCurrentCategories([])
                          } else {
                            props.setCurrentCategories([category as any])
                          }
                          // if (category.slug) {
                          // } else {
                          //   // all-categories, empty category filters
                          //   props.setCurrentCategories([])
                          // }
                        }}
                      >
                        {category.name}
                      </Button>
                    </a>
                  </Link>
                )
              })
            : categoriesDropdownItems.map((category, i) => {
                return (
                  <Button
                    key={category.name + `${i}`}
                    classes={{
                      root: clsx(
                        classes.buttonRoot,
                        (props.currentCategories ?? []).find(c => category?.id === c?.id)
                          ? classes.buttonSelected
                          : null,
                      )
                    }}
                    variant="outlined"
                    onClick={() => {
                      console.log("setting: ", category)
                      if (category.slug === 'all') {
                        props.setCurrentCategories([])
                      } else if (category.slug) {
                        props.setCurrentCategories([category as any])
                      } else {
                        // all-categories, empty category filters
                        props.setCurrentCategories([])
                      }
                    }}
                  >
                    {category.name}
                  </Button>
                )
              })
          }
        </div>
      </div>

    </div>
  );
};





interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  currentCategories?: Categories[];
  setCurrentCategories(c: Categories[]): void;
  syncUrlToCategory?: boolean;
}



/////////////// STYLES /////////////////////


export const styles = (theme: Theme) => createStyles({
  categoryDropdownRoot: {
    position: "relative",
    // borderRadius: BorderRadius4x,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',
    width: "100%",
  },
  categoryTitleText: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    minWidth: 120,
    whiteSpace: 'nowrap',
    fontSize: '1rem',
    fontWeight: 500,
    // bottom border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottom: '3px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
  },
  categoryDropdownContainer: {
    // zIndex: 2, // above advancedSearch button
    // position: 'absolute',
    top: '3.5rem',
    // padding: '1rem',
    width: '100%',
    minWidth: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dropdownArrow: {
    fill: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  iconText: {
  },
  categoryButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    padding: '1rem',
    width: '100%',
  },
  buttonRoot: {
    width: '100%',
    margin: '0.15rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    flexGrow: 1,
    flexBasis: '100%',
    "&:hover": {
      "& > span": {
        color: theme.palette.type === 'dark'
          ? Colors.purple
          : Colors.black,
      },
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.black}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    }
  },
  buttonSelected: {
    background: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.secondary,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.blue}`,
    color: Colors.cream,
    "& > span": {
      color: Colors.cream,
    },
    "&:hover": {
      "& > span": {
        color: Colors.cream,
      },
      background: theme.palette.type === 'dark'
        ? Colors.purple
        : Colors.blue,
      border: theme.palette.type === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.blue}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
});

export default withStyles(styles)( CategoryDropdown );
