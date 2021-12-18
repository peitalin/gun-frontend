
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors, isThemeDark } from "layout/AppTheme";
// useMediaQuery
import { useTheme } from "@material-ui/core/styles";
import {
  Categories,
  DealerState,
} from "typings/gqlTypes";
import { SelectOptionCaliber } from "typings"

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterAccordionRow from "./FilterAccordionRow";
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
    isMobile = false,
  } = props;

  const theme = useTheme();

  return (
    <div className={clsx(
      classes.drawerSticky,
      (isMobile && openDrawer) && classes.drawerFixedMobile,
    )}>

      <div className={clsx(
        classes.drawerHeaderSpacer,
        props.isMobile ?? classes.drawerHeaderSpacerMobile,
      )}>
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
        isMobile
          ? openDrawer ? classes.drawerOpenMobile : classes.drawerCloseMobile
          : openDrawer ? classes.drawerOpenDesktop : classes.drawerCloseDesktop,
      )}>
        <div className={clsx(
          classes.drawerInnerColumn,
          openDrawer ? "fadeInFast" : "hidden",
        )}>

          <FilterAccordionRow
            title={"Filter Categories"}
            openInitially={true}
          >
            <CategoryDropdown
              // className={clsx()}
              syncUrlToCategory={true}
              currentCategories={props.currentCategories}
              setCurrentCategories={(categories) => {
                props.setCurrentCategories(categories)
              }}
            />
          </FilterAccordionRow>


          <FilterAccordionRow
            title={"Filter Dealer State"}
            openInitially={false}
          >
            <DealerStatesMenu
              dealerStates={props.dealerStates}
              setDealerStates={props.setDealerStates}
            />
          </FilterAccordionRow>

          <FilterAccordionRow
            title={"Filter Condition"}
            openInitially={false}
          >
            <ConditionsMenu
              conditions={props.conditions}
              setConditions={props.setConditions}
            />
          </FilterAccordionRow>

          <FilterAccordionRow
            title={"Filter Calibers"}
            openInitially={false}
          >
            <CaliberMenu
              calibers={props.calibers}
              setCalibers={props.setCalibers}
              style={{
                height: 375,
                width: '100%',
              }}
            />
          </FilterAccordionRow>


          <FilterAccordionRow
            title={"Price Range"}
            openInitially={false}
            disabled
          >
            <SearchOptionsPriceFilter
              setPriceRange={props.setPriceRange}
            />
          </FilterAccordionRow>

          <div className={classes.bottomSpacer}></div>

        </div>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  openDrawer: boolean
  setOpenDrawer(b: any): void
  isMobile: boolean;

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
    zIndex: 1,
  },
  drawerFixedMobile: {
    top: '5.4rem',
    position: 'fixed',
    zIndex: 2,
  },
  drawerPaper: {
    position: 'relative',
    // height: '100%',
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
  drawerCloseMobile: {
    width: 0,
  },
  drawerOpenMobile: {
    width: '100vw',
  },
  drawerCloseDesktop: {
    width: 56,
  },
  drawerOpenDesktop: {
    width: 360,
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
  drawerHeaderSpacerMobile: {
    marginRight: '-1rem',
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
    height: `calc(100vh)`,
  },
  accordion: {
    boxShadow: 'unset',
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  accordionHeader: {
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  accordionDetails: {
    backgroundColor: isThemeDark(theme)
      ? `${Colors.uniswapNavy}`
      : `${Colors.slateGrey}`,
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
    fontSize: '1.125rem',
    fontWeight: 600,
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
    height: '266px',
    // enough to scroll calibers accordion to top of filter drawer
  },
});

export default withStyles(styles)( FilterDrawer );



