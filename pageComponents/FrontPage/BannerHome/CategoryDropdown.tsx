import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius4x,
  BorderRadius3x,
  BorderRadius2x,
  BorderRadius,
  Gradients,
  BoxShadows
} from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// hooks
import Link from "next/link";
import { SelectOption } from "typings";
import {
  Categories,
} from "typings/gqlTypes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const CategoryDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
    dropDownItems,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    props.setFocused(true)
  };

  const handleClickAway = () => {
    setOpen(false);
    props.setFocused(false)
  };

  // console.log("dropDownItems: ", dropDownItems)
  let selectedCategory = props.currentCategories?.[0]
  // console.log('currente-categories:::::', props.currentCategories)

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={clsx(
          classes.categoryDropdownRoot,
          props.className,
        )}
        onClick={handleClick}
      >

        <div className={classes.categoryTitleText}>
          <span className={classes.iconText}>
            {selectedCategory?.name || "Select Category"}
          </span>
          <KeyboardArrowDown className={classes.dropdownArrow}/>
        </div>

        {
          open &&
          <div className={classes.categoryDropdownContainer}>
            <div className={classes.categoryButtonsContainer}>
              {
                dropDownItems.map((category, i) => {
                  return (
                    <Button
                      key={category.name + `${i}`}
                      classes={{
                        root: clsx(
                          classes.buttonRoot,
                          (props.currentCategories ?? []).find(c => category.id === c.id)
                            ? classes.buttonSelected
                            : null,
                        )
                      }}
                      variant="outlined"
                      onClick={() => {
                        props.setCurrentCategories([category])
                      }}
                    >
                      {category.name}
                    </Button>
                  )
                })
              }
          </div>
          </div>
        }


      </div>
    </ClickAwayListener>
  );
};





interface ReactProps extends WithStyles<typeof styles> {
  dropDownItems: any[];
  className?: any;
  setFocused?(a: boolean): void;
  currentCategories?: Categories[];
  setCurrentCategories(c: Categories[]): void;
}



/////////////// STYLES /////////////////////
const categoryLinkColor = Colors.darkGrey


export const styles = (theme: Theme) => createStyles({
  categoryDropdownRoot: {
    position: "relative",
    borderRadius: BorderRadius4x,
    padding: '0rem 1rem',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',
    "&:hover": {
      background: Colors.slateGreyDarker,
      // borderBottom: '3px solid',
      "& > div > span": {
        color: Colors.blue,
        transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
      "& > div > svg": {
        fill: Colors.blue,
        transition: theme.transitions.create(['fill'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
    },
  },
  categoryTitleText: {
    color: categoryLinkColor,
    minWidth: '140px',
    whiteSpace: 'nowrap',
    fontSize: '0.825rem',
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
    position: 'absolute',
    top: '3.5rem',
    padding: '1rem',
    minWidth: '300px',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dropdownArrow: {
    fill: categoryLinkColor,
  },
  iconText: {
  },
  categoryButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    padding: '1rem',
    width: '100%',
    minWidth: 300,
    border: `1px solid ${Colors.slateGrey}`,
    borderRadius: BorderRadius3x,
    boxShadow: BoxShadows.shadow5.boxShadow,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
  },
  buttonRoot: {
    margin: '0.15rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.charcoal}`,
    borderRadius: BorderRadius,
    flexGrow: 1,
    flexBasis: '100%',
    "&:hover": {
      "& > span": {
        color: Colors.gradientUniswapBlue1,
      },
      border: `1px solid ${Colors.gradientUniswapBlue1}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    }
  },
  buttonSelected: {
    background: Colors.ultramarineBlue,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    "& > span": {
      color: Colors.cream,
    },
    "&:hover": {
      "& > span": {
        color: Colors.cream,
      },
      background: Colors.ultramarineBlue,
      border: `1px solid ${Colors.gradientUniswapFluro2}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
});

export default withStyles(styles)( CategoryDropdown );
