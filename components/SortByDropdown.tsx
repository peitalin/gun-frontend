import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius,
  BorderRadius2x,
  BorderRadius3x,
  isThemeDark,
} from "layout/AppTheme";
// Search Component
import dynamic from "next/dynamic";
const DropdownInput = dynamic(() => import("components/Fields/DropdownInput"), {
  loading: () =>
    <div style={{
      height: 44,
      width: 150,
      // border: `1px solid ${Colors.uniswapMediumGrey}`,
      // background: isDarkMode ? Colors.uniswapDarkNavy : Colors.slateGrey,
      borderRadius: BorderRadius3x,
    }}/>,
  ssr: false,
})
import { SelectOption, selectStyles } from "components/SearchOptions";




const SortByDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
    isMobile,
    isDarkMode,
  } = props;


  // console.log("sortByOptions: ", props.sortByOptions)

  return (
    <div className={
      isMobile ? classes.sortByContainerMobile : classes.sortByContainerDesktop
    } style={props.styleContainer}>
      <div className={
        isMobile ? classes.sortByDropDownMobile : classes.sortByDropDownDesktop
      } style={props.style}>
        <DropdownInput
          initialState={
            props.sortByOptions?.[0]
            // initial initialState
            // { label: "Rifles", value: "category_0001"}
          }
          isSearchable={false}
          hideCursor={true}
          onChange={({ label, value }: SelectOption) =>
            setTimeout(() => {
              props.setOrderBy({ label, value })
            }, 0)
            // let UI update first for menu to close
          }
          options={props.sortByOptions}
          placeholder={"Select a category"}
          className={clsx(
            classes.width100,
            classes.height50
          )}
          styles={selectStyles({
            width: 200,
            isDarkMode: isDarkMode,
          })}
          theme={theme => ({
            ...theme,
            maxWidth: '200px',
            borderRadius: BorderRadius2x,
            colors: {
              ...theme.colors,
              color: isDarkMode
                ? Colors.uniswapLightestGrey
                : Colors.black,
              primary25: isDarkMode
                ? Colors.uniswapLightNavy
                : Colors.slateGreyDarker,
              primary: Colors.uniswapLighterGrey,
            },
          })}
          sortByOptions={props.sortByOptions}
        />
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  isMobile: boolean
  isDarkMode: boolean
  setOrderBy(a: any): void
  sortByOptions: Array<{ label: string, value: any }>
  style?: any;
  styleContainer?: any;
}


export const styles = (theme: Theme) => createStyles({
  sortByContainerDesktop: {
    // position: 'absolute',
    bottom: '0rem',
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sortByDropDownDesktop: {
    maxWidth: 140,
    // marginBottom: '-1.5rem',
    marginRight: '1rem',
    flexBasis: '50%',
  },
  sortByContainerMobile: {
    // position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    // marginTop: "3rem",
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sortByDropDownMobile: {
    maxWidth: 110,
    flexBasis: '50%',
  },
  width100: {
    width: '100%',
  },
  height50: {
    height: '50px',
  },
});

export default withStyles(styles)( SortByDropdown );



