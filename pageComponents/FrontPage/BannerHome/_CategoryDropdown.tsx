import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius4x, BorderRadius2x, Gradients } from "layout/AppTheme";
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
    itemName,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    props.setFocused(true)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
    props.setFocused(false)
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };


  const setCategoryId = (newCat: SelectOption) => {
    // // Redux
    // dispatch(actions.UPDATE_CATEGORY_ID(newCat.value))
    // Formik
    // fprops.setFieldValue("categoryId", newCat.value)
    // props.validateForm()
  }

  // console.log("dropDownItems: ", dropDownItems)
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className={clsx(
      classes.categoryDropdownRoot,
      props.className,
    )}>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={clsx(
            classes.categoryLinkTextNoUnderline,
            classes.categoryTitle,
          )}
          onClick={handleClick}
        >
          <span className={classes.iconText}>
            {itemName}
          </span>
          <KeyboardArrowDown className={classes.dropdownArrow}/>
        </div>

        <div className={classes.root}>
          {open ? (
            <div className={classes.dropdown}>
              Click me, I will stay visible until you click outside.
            </div>
          ) : null}
        </div>

      </ClickAwayListener>

      <Menu
        classes={{
          paper: classes.menu,
        }}
        style={{
          transform: `translate(0px, 1.75rem)`,
          //   zIndex: 5005, // to be above modals
        }}
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <div className={classes.categoryDropdownContainer}>
          {
            dropDownItems.map((categories, j) => {
              return (
                <div className={classes.categoryButtonsContainer}>
                  {
                    categories.map((category, i) => {
                      return (
                        <Button
                          key={category.name + `${i}`}
                          classes={{
                            root: clsx(
                              classes.buttonRoot,
                              // (category.id === fprops.values.categoryId)
                              //   ? classes.buttonSelected
                              //   : null,
                            )
                          }}
                          variant="outlined"
                          onClick={() => {
                            // fprops.setFieldTouched("categoryId", true)
                            setCategoryId({
                              label: category.name,
                              value: category.id,
                            })
                            // setOpenExpander(s => !s)
                          }}
                        >
                          {category.name}
                        </Button>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </Menu>

    </div>
  );
};





interface ReactProps extends WithStyles<typeof styles> {
  dropDownItems: any[][];
  itemName: string;
  className?: any;
  setFocused?(a: boolean): void;
}



/////////////// STYLES /////////////////////
export const CategoryBarHeight = 44;

const categoryLinkColor = Colors.darkGrey
const categoryLinkColorHover = fade(Colors.secondaryBright, 0.8)

const categoryLinkColor2 = Colors.darkGrey
const categoryLinkColorHover2 = Colors.secondaryBright


export const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  categoryDropdownRoot: {
    borderRadius: BorderRadius4x,
    padding: '0rem 1rem',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    // border: `1px solid ${Colors.slateGrey}`,
    cursor: 'pointer',
    "&:hover": {
      background: Colors.slateGreyDarker,
    },
  },
  categoryHeading: {
    marginBottom: "0.5rem",
  },
  categoryLinkGroups: {
    marginRight: '0.5rem',
    marginLeft: '0.5rem',
  },
  categoryLinkGroupsSm: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  categoryLinkTextMain: {
    color: categoryLinkColor,
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.825rem',
    fontWeight: 500,
    // bottom border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '3px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      borderBottom: '3px solid',
      color: categoryLinkColorHover,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryLinkTextNoUnderline: {
    color: categoryLinkColor,
    minWidth: '50px',
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
    "&:hover": {
      // borderBottom: '3px solid',
      color: categoryLinkColorHover,
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  categoryTitle: {
    padding: '0rem 1rem',
  },
  categoryTitleSm: {
    height: '2rem',
  },
  categoryLinkText: {
    color: categoryLinkColor2,
    "&:hover": {
      color: categoryLinkColorHover2,
    },
    marginBottom: '0.25rem',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverRoot: {
    marginTop: '-1px',
    transform: "translateX(-1rem)",
    borderRadius: 0,
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
  paper: {
    padding: '1rem',
  },
  categoryDropdownContainer: {
    padding: '1rem',
    minWidth: '150px',
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryDropdownInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  dropdownArrow: {
    marginLeft: "0.25rem",
  },
  menu: {
    // width: theme.spacing(32),
    borderRadius: BorderRadius2x,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
  },
  iconText: {
    marginRight: '0.5rem',
  },
  categoryButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // display: 'flex',
    // flexDirection: 'column',
    padding: '0px',
    width: '100%'
  },
  buttonRoot: {
    margin: '0.1rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.charcoal,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLighterGrey}`
      : `1px solid ${Colors.charcoal}`,
    borderRadius: '2rem',
    flexGrow: 1,
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
    backgroundImage: Gradients.gradientUniswapBlue.background,
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
      backgroundImage: Gradients.gradientUniswapBlue2.background,
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
