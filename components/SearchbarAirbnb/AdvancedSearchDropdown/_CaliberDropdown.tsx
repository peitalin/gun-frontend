import React from "react";
// Styles
import clsx from "clsx";
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
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
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ClickAwayListener from '@mui/material/ClickAwayListener';

// hooks
import Link from "next/link";
import { SelectOption } from "typings";
import {
  Calibers
} from "typings/gqlTypes";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";




const CaliberDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  let dropdownCalibers = data?.getCalibers ?? [];

  const handleClick = () => {
    setOpen((prev) => !prev);
    props.setFocused(true)
    props.setMobileFocused(true)
  };

  const handleClickAway = () => {
    // console.log("clicked away")
    setOpen(false);
    props.setFocused(false)
  };

  let dropDownItems = [
    {
      id: undefined,
      name: "All Calibers",
      group: undefined,
    },
    ...(dropdownCalibers ?? []),
  ]

  let selectedCaliber = props.calibers?.[0]
  // console.log("dropDownItems: ", dropDownItems)
  // console.log('selectedCaliber: ', selectedCaliber)

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={clsx(
          classes.dealerStateDropdownRoot,
          props.className,
        )}
        onClick={handleClick}
      >

        <div className={classes.dealerStateTitleText}>
          <span className={classes.iconText}>
            { selectedCaliber || "Caliber" }
          </span>
          <KeyboardArrowDown className={classes.dropdownArrow}/>
        </div>

        {
          open &&
          <div className={classes.dealerStateDropdownContainer}>
            <div className={classes.dealerStateButtonsContainer}>
              {
                dropDownItems.map((d, i) => {
                  return (
                    <Button
                      key={d + `${i}`}
                      classes={{
                        root: clsx(
                          classes.buttonRoot,
                          props.calibers?.includes(d?.name)
                            ? classes.buttonSelected
                            : null,
                        )
                      }}
                      variant="outlined"
                      onClick={() => {
                        console.log("setting: ", d)
                        if (!d.id) {
                          // null -> All Calibers
                          props.setCalibers([])
                        } else {
                          props.setCalibers([d?.name])
                        }
                      }}
                    >
                      {d?.name}
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
  className?: any;
  setFocused?(a: boolean): void;
  setMobileFocused?(a: boolean): void;
  calibers?: string[];
  setCalibers(c: string[]): void;
}


interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}


/////////////// STYLES /////////////////////


export const styles = (theme: Theme) => createStyles({
  dealerStateDropdownRoot: {
    position: "relative",
    borderRadius: BorderRadius4x,
    padding: '0rem 1rem',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? Colors.uniswapGreyNavy
        : Colors.slateGreyDark,
      // borderBottom: '3px solid',
      "& > div > span": {
        color: theme.palette.mode === 'dark'
          ? Colors.purple
          : Colors.blue,
        transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
      "& > div > svg": {
        fill: theme.palette.mode === 'dark'
          ? Colors.purple
          : Colors.blue,
        transition: theme.transitions.create(['fill'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
    },
  },
  dealerStateTitleText: {
    color: theme.palette.mode === 'dark'
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
  dealerStateDropdownContainer: {
    zIndex: 1,
    position: 'absolute',
    top: '3.5rem',
    padding: '1rem',
    minWidth: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dropdownArrow: {
    fill: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  iconText: {
  },
  dealerStateButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    padding: '1rem',
    width: '100%',
    minWidth: 300,
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius3x,
    boxShadow: BoxShadows.shadow5.boxShadow,
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  buttonRoot: {
    width: '100%',
    margin: '0.15rem',
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    flexGrow: 1,
    flexBasis: '100%',
    "&:hover": {
      "& > span": {
        color: theme.palette.mode === 'dark'
          ? Colors.purple
          : Colors.black,
      },
      border: theme.palette.mode === 'dark'
        ? `1px solid ${Colors.purple}`
        : `1px solid ${Colors.black}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    }
  },
  buttonSelected: {
    background: theme.palette.mode === 'dark'
      ? Colors.purple
      : Colors.secondary,
    border: theme.palette.mode === 'dark'
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
      background: theme.palette.mode === 'dark'
        ? Colors.purple
        : Colors.blue,
      border: theme.palette.mode === 'dark'
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

export default withStyles(styles)( CaliberDropdown );
