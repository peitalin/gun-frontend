import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';
// GraphQL Typings
import {
  Categories,
} from "typings/gqlTypes";

// MUI expander
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Dropdown Select Component
import { selectStyles } from "components/SearchOptions";
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: () => <div style={{
    height: 40,
    width: 250,
    border: `1px solid ${Colors.lightGrey}`,
    background: Colors.white,
    borderRadius: '4px',
  }}/>,
  ssr: false,
})




const SearchOptionsCategoryFilter: React.FC<ReactProps> = (props) => {

  const {
    classes,
    currentCategories,
    facets,
    setCategoryFacets,
    dropdown = false,
    defaultExpanded = false,
  } = props;

  const sortAlphabetically = (c1: Categories, c2: Categories): number => {
    let c1name = c1?.name ? c1.name.toLowerCase() : ""
    let c2name = c2?.name ? c2.name.toLowerCase() : ""
    return (c1name > c2name) ? 1 : -1
  }

  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);


  if (dropdown) {

    let categoryOptions = [
      { label: "All Categories", value: undefined },
      ...(currentCategories ?? [])
        .filter(c => !!c.name)
        .sort(sortAlphabetically)
        .map((category, i) => {
          let categoryFacet = `_categoryNameFacet:${category.name}`
          return {
            label: category.name,
            value: categoryFacet,
          }
        })
    ]

    return (
      <div className={classes.facetSection}>
        <DropdownInput
          // initialState={
          //   categoryOptions[0]
          //   // initial initialState
          //   // { label: "Design Templates", value: "category_123123"}
          // }
          isSearchable={false}
          hideCursor={true}
          onChange={({ label, value }: SelectOption) => {
            // setOrderBy({ label, value })
            // let UI update first for menu to close
            if (!value) {
              setCategoryFacets({ clearFacets: true })
            } else {
              setCategoryFacets({ categoryName: label, singleCategory: true })
            }
          }}
          options={categoryOptions}
          placeholder={"Select a Category"}
          styles={selectStyles({ width: 200 })}
          theme={theme => ({
            ...theme,
            width: '100%',
            minWidth: '200px',
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#e2e2e2',
              primary: '#333333',
            }
          })}
        />
      </div>
    )
  } else {
    return (
      <Accordion
        defaultExpanded={defaultExpanded}
        style={{
          maxWidth: props.maxWidth
        }}
        classes={{
          root: clsx(
            classes.expansionPanelRoot,
          ),
          expanded: classes.expansionPanelExpanded,
        }}
        onChange={(e) => {
          setOpenExpander(s => !s)
        }}
        elevation={0} // remove box-shadow
        TransitionProps={{
          timeout: {
            appear: 200,
            enter: 200,
            exit: 200,
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          classes={{
            root: classes.expanderRoot,
            expanded: classes.expanderExpanded,
            content: classes.expanderContent,
            expandIcon: classes.expandIcon,
          }}
        >
          Filter by categories
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.facetSection}>
            {
              (currentCategories ?? [])
              .filter(c => !!c.name)
              .sort(sortAlphabetically)
              .map((category, i) => {

                let categoryFacet = `_categoryNameFacet:${category.name}`
                let highlightButton = facets.includes(categoryFacet)

                // key={category.name + `_${i}`}
                return (
                  <CategoryButton key={category.name + `_${i}`}
                    classes={classes}
                    category={category}
                    highlightButton={highlightButton}
                    onClick={() => {
                      setCategoryFacets({ categoryName: category.name })
                    }}
                  />
                )
              })
            }
            {
              (currentCategories ?? []).length > 0 &&
              <Button
                classes={{ root: classes.buttonRoot }}
                variant="outlined"
                onClick={() => setCategoryFacets({ clearFacets: true })}
              >
                Clear All <ClearIcon className={classes.clearIcon}/>
              </Button>
            }
          </div>
        </AccordionDetails>
      </Accordion>
    )
  }
}



const CategoryButton: React.FC<CategoryButtonProps> = (props) => {
  const { classes, category } = props;
  return (
    <Button
      classes={{
        root: clsx(
          classes.buttonRoot,
          (props.highlightButton) ? classes.buttonSelected : null,
        )
      }}
      variant="outlined"
      onClick={props.onClick}
    >
      { props.children }
      { category.name }
    </Button>
  )
}


interface CategoryButtonProps extends WithStyles<typeof styles> {
  onClick(): void;
  highlightButton: boolean;
  category: Categories;
}

export interface SelectOption {
  label: string;
  value: any
}


/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  dropdown?: boolean;
  defaultExpanded?: boolean;
  // Category Facets
  setCategoryFacets?(args: {
    categoryName?: string,
    clearFacets?: boolean,
    singleCategory?: boolean,
  }): void;
  facets?: string[];
  currentCategories: Categories[];
  maxWidth?: any;
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  facetSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  buttonRoot: {
    flexGrow: 1,
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    background: fade(Colors.slateGrey, 0.6),
    border: 'none',
    borderRadius: '4px',
    transition:  theme.transitions.create(['background', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    }),
    "&:hover": {
      background: Colors.lightGrey,
      // color: Colors.white,
      transition:  theme.transitions.create(['background', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
  },
  buttonSelected: {
    background: fade(Colors.red, 0.9),
    color: Colors.cream,
    "&:hover": {
      background: fade(Colors.red, 0.8),
      color: Colors.white,
      transition:  theme.transitions.create('background', {
        easing: theme.transitions.easing.easeIn,
        duration: 100,
      })
    },
  },
  clearIcon: {
    marginLeft: '0.25rem',
  },
  maxWidth: {
    maxWidth: 250,
  },

  // category expander
  expansionPanelRoot: {
    width: '100%',
    padding: '0rem',
    marginLeft: '0rem',
    // border: `1px solid ${Colors.lightGrey}`,
    // border: `1px solid ${Colors.mediumLightGrey}`,
    borderColor: 'hsl(0,0%,80%)',
    borderRadius: '4px',
    // backgroundColor: Colors.slateGrey,
    backgroundColor: Colors.dropDownGrey,
    '&:hover': {
      backgroundColor: Colors.dropDownGreyHover,
    },
    transition: theme.transitions.create('background-color', {
      duration: "1200ms",
    }),
  },
  expansionPanelExpanded: {
    marginBottom: 0,
    // border: `1px solid ${Colors.lightGrey}`,
    // boxShadow: BoxShadows.shadow4.boxShadow,
    backgroundColor: Colors.foregroundColor,
    '&:hover': {
      backgroundColor: Colors.foregroundColor,
    },
    transition: theme.transitions.create('background-color', {
      duration: "0ms",
    }),
  },
  expanderRoot: {
    height: 38,
    minHeight: 38,
  },
  expandIcon: {
    marginRight: '-6px', // prevent icon shifting when expanding
  },
  expanderExpanded: {
    margin: 0,
    minHeight: '1rem',
    marginRight: '-3px', // prevent icon shifting when expanding
    marginBottom: 0,
  },
  expanderContent: {
    minHeight: '1rem',
    margin: 0,
  },
  selectedCategoryClosed: {
    color: Colors.charcoal,
    fontSize: '1rem',
    transition: theme.transitions.create('color', {
      duration: "2000ms",
    }),
  },
  selectedCategoryOpen: {
    color: Colors.secondary,
    fontSize: '1rem',
    transition: theme.transitions.create('color', {
      duration: "200ms",
    }),
  },
  selectedCategoryEmpty: {
    color: Colors.grey,
    fontSize: '1rem',
  },
  categoryButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
    width: '100%'
  },
});


export default withStyles(styles)( SearchOptionsCategoryFilter );
