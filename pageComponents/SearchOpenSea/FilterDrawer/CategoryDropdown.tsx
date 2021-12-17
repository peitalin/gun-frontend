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
  BoxShadows,
  isThemeDark
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
import Checkbox from '@material-ui/core/Checkbox';
import { Category } from "@material-ui/icons";




const CategoryDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  // Apollo Graphql
  // const categoryData = useQuery<{ getCategories: Categories[] }, null>(
  //   GET_CATEGORIES,
  // )

  const [hover, setHover] = React.useState(undefined)

  let categoriesRemovedItems = categoryPreviewsBackup.filter(c => c.slug !== 'items')

  let categoriesDropdownItems = [
    ...(categoriesRemovedItems ?? []),
    { id: undefined, slug: 'all', name: "All Categories" },
  ]

  const onChange = (category: Categories) => {
    if (category.slug === 'all' || !category) {
      props.setCurrentCategories([])
    }
    if (props.currentCategories.includes(category)) {
      props.setCurrentCategories(
        props.currentCategories.filter(c => c.slug !== category.slug)
      )
    } else {
      props.setCurrentCategories([...props.currentCategories, category])
    }
  }

  return (
    <div className={clsx(
      classes.categoryDropdownRoot,
      props.className,
    )}>
      <div className={classes.categoryDropdownContainer}>
        <div className={classes.categoryButtonsContainer}>
          {
            categoriesDropdownItems.map((category, i) => {

              let allCategories = category.slug === "all"
                && props.currentCategories?.length === 0

              let checked = !!(props.currentCategories ?? []).find(c => category?.id === c?.id)
                || allCategories

              let highlight = hover === i

              return (
                <div key={category.name + `${i}`}>
                  <Checkbox
                    checked={checked}
                    onChange={() => onChange(category as Categories)}
                    classes={{
                      root: clsx(
                        classes.checkbox,
                        checked ? classes.checkboxSelected : null,
                        highlight && classes.hoverCheckbox,
                      ),
                    }}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(undefined)}
                  />
                  <span
                    className={highlight && classes.linkHover}
                    onClick={() => onChange(category as Categories)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(undefined)}
                  >
                    {category.name}
                  </span>
                </div>
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
    top: '3.5rem',
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
    // padding: '0rem 1rem',
    padding: '0rem 0.5rem',
    width: '100%',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  checkboxSelected: {
    "& > span": {
      color: Colors.purple,
    },
  },
  linkHover: {
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.blue,
    cursor: "pointer",
  },
  hoverCheckbox: {
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.blue,
  },
});

export default withStyles(styles)( CategoryDropdown );
