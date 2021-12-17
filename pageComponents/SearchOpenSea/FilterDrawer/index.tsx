
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors, isThemeDark, BoxShadows } from "layout/AppTheme";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import {
  useFacetSearchOptions,
  totalItemsInCategoriesFacets,
} from "utils/hooksFacetSearch";
import {
  Order_By,
  Categories,
  DealerState,
  Calibers,
} from "typings/gqlTypes";
import { SelectOptionCaliber } from "typings"
import { MainBarHeight } from "layout/NavBarMain/styles"

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// MUI
import MenuItem from '@material-ui/core/MenuItem';
import CollectionsIcon from '@material-ui/icons/Collections';

import FilterListIcon from '@material-ui/icons/FilterList';

// Select Component
import SearchOptionsPriceFilter from "./SearchOptionsPriceFilter";
import CategoryDropdown from './CategoryDropdown';
import CaliberMenu from "./CaliberMenu";

import DealerStatesMenu from "./DealerStatesMenu";
import ConditionsMenu from "./ConditionsMenu";



const FilterDrawer: React.FC<ReactProps> = (props) => {

  const {
    classes,
    openDrawer,
    setOpenDrawer,
  } = props;

  const theme = useTheme();

  return (
    <div className={classes.drawerSticky}>

      <div className={classes.drawerHeaderSpacer}>
        <div className={classes.drawerHeader}>
          <div className={clsx(
            openDrawer ? "fadeInFast": "hidden",
            classes.titleRow,
          )}>
            <FilterListIcon className={classes.filterIcon}/>
            <span className={classes.title}>
              Filters
            </span>
          </div>
          <div className={classes.flexGrow}/>
          <IconButton onClick={() => setOpenDrawer(s => !s)}>
            {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      </div>

      <div className={clsx(
        classes.drawerPaper,
        openDrawer ? classes.drawerOpen : classes.drawerClose,
      )}>
        <div className={classes.drawerInnerColumn}>

          <div className={openDrawer ? "fadeInFast" : "hidden"}>

            <MenuItem  className={classes.menuItem}>
              <CollectionsIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>Categories </span>
            </MenuItem>
            <CategoryDropdown
              className={clsx(
                // // focused ? classes.height65 : classes.height50,
                // classes.height50,
                // isMobile ? classes.searchFilterButtonMobile : classes.searchFilterButtonDesktop,
                // (isMobile && !focused) && classes.displayNoneDelayed,
                // // hide on mobile when not focused
                // categoryFocused && classes.boxShadow,
              )}
              syncUrlToCategory={true}
              currentCategories={props.currentCategories}
              setCurrentCategories={(categories) => {
                props.setCurrentCategories(categories)
              }}
            />

            <MenuItem  className={classes.menuItem}>
              <CollectionsIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>Price Range</span>
            </MenuItem>
            <SearchOptionsPriceFilter
              setPriceRange={props.setPriceRange}
            />

            <MenuItem  className={classes.menuItem}>
              <CollectionsIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>Filter Dealer State </span>
            </MenuItem>
            <DealerStatesMenu
              dealerStates={props.dealerStates}
              setDealerStates={props.setDealerStates}
            />

            <MenuItem  className={classes.menuItem}>
              <CollectionsIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>Filter Condition </span>
            </MenuItem>
            <ConditionsMenu
              conditions={props.conditions}
              setConditions={props.setConditions}
            />


            <MenuItem  className={classes.menuItem}>
              <CollectionsIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>Filter Calibers </span>
            </MenuItem>
            <CaliberMenu
              calibers={props.calibers}
              setCalibers={props.setCalibers}
            />

            <div className={classes.bottomSpacer}></div>

          </div>
        </div>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  openDrawer: boolean
  setOpenDrawer(b: any): void

  priceRange: number[]
  setPriceRange(a?: any): void;
  currentCategories?: Categories[];
  setCurrentCategories: React.Dispatch<React.SetStateAction<Categories[]>>
  dealerStates: DealerState[],
  setDealerStates: React.Dispatch<React.SetStateAction<DealerState[]>>
  calibers: SelectOptionCaliber[],
  setCalibers: React.Dispatch<React.SetStateAction<SelectOptionCaliber[]>>
  actionTypes: string[],
  setActionTypes: React.Dispatch<React.SetStateAction<string[]>>
  conditions: string[],
  setConditions: React.Dispatch<React.SetStateAction<string[]>>
}


const FILTER_HEADER_HEIGHT = 60

export const styles = (theme: Theme) => createStyles({
  drawerSticky: {
    position: 'sticky',
    top: '4rem',
  },
  drawerPaper: {
    position: 'relative',
    height: `calc(100vh - ${MainBarHeight}px - ${FILTER_HEADER_HEIGHT}px - 0.5rem)`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `0px 0px ${BorderRadius}px 0px`,
    // borderRadius: `${BorderRadius}px`,
    marginBottom: '1rem',
    overflowY: "scroll",
    borderRight: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  drawerClose: {
    width: 60,
  },
  drawerOpen: {
    width: 420,
  },
  drawerHeaderSpacer: {
    height: FILTER_HEADER_HEIGHT,
    position: "relative",
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: `0px ${BorderRadius}px 0px 0px`,
    borderTop: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRight: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarker}`,
    // boxShadow: BoxShadows.shadow1.boxShadow,
  },
  drawerHeader: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    justifyContent: 'flex-end',
    width: '100%',
  },
  drawerInnerColumn: {
    // height: '150vh',
    // overflowY: "scroll",
  },
  flexGrow: {
    flexGrow: 1,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  filterIcon: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    height: '1.5rem',
    weight: '1.5rem',
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
  },
  menuItem: {
    height: 50,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGreyDarker,
      color: Colors.cream,
    },
  },
  menuText: {
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
    fontSize: '0.9rem',
  },
  bottomSpacer: {
    height: '300px',
  },
});

export default withStyles(styles)( FilterDrawer );



