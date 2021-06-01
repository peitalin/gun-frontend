import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows, BorderRadius4x } from "layout/AppTheme";

// GraphQL Typings
import {
  Order_By,
  Categories,
  DealerState,
  Calibers,
} from "typings/gqlTypes";
// Select Component
import DropdownInput from "components/Fields/DropdownInput";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";



const SortbyMenu: React.FC<ReactProps> = (props) => {

  const {
    classes,
    setOrderBy,
    isMobile,
    disableSortby = false,
  } = props;

  const router = useRouter();
  const snackbar = useSnackbar();

  const orderByOptions = [
    { label: "Newest", value: { createdAt: Order_By.DESC }},
    { label: "Oldest", value: { createdAt: Order_By.ASC }},
    { label: "Highest Price", value: { price: Order_By.DESC }},
    { label: "Lowest Price", value: { price: Order_By.ASC }},
  ];


  React.useEffect(() => {
    if (setOrderBy) {
      setOrderBy(orderByOptions[0])
    }
  }, [])


  if (disableSortby) {
    return (
      <div className={classes.sortbyEmpty}></div>
    )
  }

  return (
    <>
      <div className="search-expander" style={{ flexGrow: 1 }}/>
      <div className={clsx(
          classes.dropdownContainer,
          classes.marginRight05,
          classes.marginLeft05,
          !(isMobile && props.focused) && classes.displayNoneDelayed,
          // hide on mobile when not focused
        )}
      >
        <DropdownInput
          initialState={
            orderByOptions[0]
            // initial initialState
            // { label: "Design Templates", value: "category_123123"}
          }
          isSearchable={false}
          hideCursor={true}
          onChange={({ label, value }: SelectOption) =>
            setTimeout(() => {
              setOrderBy({ label, value })
            }, 0)
            // let UI update first for menu to close
          }
          options={orderByOptions}
          placeholder={"Sort by..."}
          styles={selectStyles({ width: 200 })}
          theme={theme => ({
            ...theme,
            // width: '100%',
            maxWidth: '200px',
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#e2e2e2',
              primary: '#333333',
            }
          })}
        />
      </div>
    </>
  )
}


export const selectStyles = ({ width }: { width?: any }) => ({
  container: base => ({
    ...base,
    flex: 1,
    border: 'none',
    width: width || '175px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  control: styles => ({
    ...styles,
    // border: '1px solid #eaeaea',
    border: 'none',
    boxShadow: 'none',
    // background: buttonBackgroundColor,
    backgroundColor: Colors.dropDownGrey,
    '&:hover': {
      border: 'none',
      cursor: "pointer",
      backgroundColor: Colors.dropDownGreyHover,
    },
    "&:focus": {
      border: 'none',
    },
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: Colors.darkGrey,
    // fontSize: '1rem',
    width: '100%',
  }),
  singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    color: Colors.darkGrey,
  }),
  indicatorSeparator: styles => ({
    display:'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? Colors.charcoal
        : isFocused
          ? Colors.lightGrey
          : Colors.dropDownGrey,
      fontFamily: '"Helvetica Neue",Arial,sans-serif',
      fontSize: '1rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      "&:hover": {
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      },
    };
  },
  menu: styles => ({
    ...styles,
    zIndex: 10,
    marginTop: '2px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  })
});



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
  setOrderBy?(a?: SelectOption): void;
  disableSortby?: boolean;
  style?: any;
  isMobile: boolean;
  focused: boolean;
}
export interface SelectOption {
  label: string;
  value: {
    createdAt?: Order_By
    price?: Order_By
  }
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  displayNoneDelayed: {
    // display: 'none',
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
  },
  marginRight05: {
    marginRight: '0.5rem',
  },
  marginLeft05: {
    marginLeft: '0.5rem',
  },
  dropdownContainer: {
    // flexBasis: '30%',
    // width: '100%',
    minWidth: 130,
    marginRight: '0rem',
    marginBottom: '0.5rem',
    // marginLeft: '1rem',
    display: 'flex',
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  boxShadow: {
    boxShadow: BoxShadows.shadow4.boxShadow,
  },
  searchIcon: {
    fill: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
  },
  sortbyEmpty: {
  },
});


export default withStyles(styles)( SortbyMenu );
