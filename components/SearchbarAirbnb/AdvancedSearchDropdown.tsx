import React from "react";
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
import Button from "@material-ui/core/Button";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from "@material-ui/core/Dialog";
import DropdownInput from "components/Fields/DropdownInput";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// hooks
import {
  DealerState,
  Calibers,
  CaliberGroup,
} from "typings/gqlTypes";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { GET_CALIBERS } from "queries/calibers-queries";
import { useQuery } from "@apollo/client";



const AdvancedSearchDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();

  const [showModal, setShowModal] = React.useState(false)

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })


  const openModal = () => {
    setShowModal((prev) => !prev);
    props.setFocused(true)
    props.setMobileFocused(true)
  };

  const closeModal = () => {
    setShowModal(false);
    props.setFocused(false)
  };


  let dealerStatesDropdownItems = [
    DealerState.ACT,
    DealerState.NSW,
    DealerState.NT,
    DealerState.QLD,
    DealerState.SA,
    DealerState.TAS,
    DealerState.VIC,
    DealerState.WA,
    DealerState.ALL_STATES,
  ]

  let caliberOptionGroups = createCaliberOptionGroups(data?.getCalibers)

  return (
    <>

      <div
        className={clsx(
          classes.advancedSearchDropdownRoot,
          props.className,
        )}
        onClick={openModal}
      >
        <div className={classes.advancedSearchButtonText}>
          <span className={classes.iconText}>
            Search Options
          </span>
          <KeyboardArrowDown className={classes.dropdownArrow}/>
        </div>
      </div>

      <Dialog
        open={showModal}
        onClose={() => closeModal()}
        BackdropProps={{ classes: { root: classes.modalBackdrop } }}
        PaperProps={{ classes: { root: classes.modalPaperScrollPaper } }}
      >
        <div className={classes.advancedSearchDropdownMenu}>
          <IconButton
            className={classes.closeIcon}
            onClick={closeModal}
            size={"medium"}
          >
            <ClearIcon/>
          </IconButton>
          <div className={classes.column1}>
            <div className={clsx(classes.innerColumn, classes.innerColumnFlexRow)}>
              {
                dealerStatesDropdownItems.map((d, i) => {

                  let isDisabled = d !== DealerState.QLD
                        && d !== DealerState.ALL_STATES

                  return (
                    <Button
                      key={d + `${i}`}
                      classes={{
                        root: clsx(
                          classes.buttonRoot,
                          props.dealerStates?.includes(d)
                            ? classes.buttonSelected
                            : null,
                          !isDisabled && classes.activeButton,
                        )
                      }}
                      disabled={isDisabled}
                      variant="outlined"
                      onClick={() => {
                        console.log("setting: ", d)
                        if (d === DealerState.ALL_STATES) {
                          props.setDealerStates([])
                        } else {
                          props.setDealerStates([d])
                        }
                      }}
                    >
                      {DealerStatesLabels[d]}
                    </Button>
                  )
                })
              }
            </div>
          </div>
          <div className={classes.column2}>
            <div className={clsx(classes.innerColumn, classes.innerColumnFlexCol)}>
              <DropdownInput
                // className={classes.dealerDropdown}
                stateShape={undefined}
                onChange={(option: SelectOption) => {
                  if (!option.value) {
                    // null -> All states
                    props.setCalibers([])
                  } else {
                    props.setCalibers([option.value])
                  }
                }}
                options={caliberOptionGroups}
                // placeholder={initialDealerState?.label}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};


const DealerStatesLabels = {
  [DealerState.ALL_STATES]: "Cancel",
  [DealerState.ACT]: "ACT",
  [DealerState.NSW]: "NSW",
  [DealerState.NT]: "NT",
  [DealerState.QLD]: "QLD",
  [DealerState.SA]: "SA",
  [DealerState.TAS]: "TAS",
  [DealerState.VIC]: "VIC",
  [DealerState.WA]: "WS",
}

const createCaliberOption = (c: Calibers): SelectOption => {
  return {
    label: c.name,
    value: c.name,
  }
}

const createCaliberOptionGroups = (calibers: Calibers[]): GroupedSelectOption[] => {
  if (!calibers) {
    return []
  }

  let rimfire = calibers.filter(c => {
    return c.group === CaliberGroup.RIMFIRE_CENTERFIRE
  }).map(c => createCaliberOption(c))

  let projectile = calibers.filter(c => {
    return c.group === CaliberGroup.PROJECTILE
  }).map(c => createCaliberOption(c))

  let shotshell = calibers.filter(c => {
    return c.group === CaliberGroup.SHOTSHELL
  }).map(c => createCaliberOption(c))

  return [
    {
      label: "Rimfire/Centerfire",
      options: [
        { label: "All Calibers", value: undefined },
        ...rimfire,
      ],
    },
    {
      label: "Projectile",
      options: [
        ...projectile,
      ],
    },
    {
      label: "Shotshell",
      options: [
        ...shotshell,
      ],
    },
  ]
}


export interface SelectOption {
  label: string;
  value: string | any;
}
export interface GroupedSelectOption {
  label: string;
  options: SelectOption[]
}


interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  setFocused?(a: boolean): void;
  setMobileFocused?(a: boolean): void;
  dealerStates?: DealerState[];
  setDealerStates(c: DealerState[]): void;
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
  advancedSearchDropdownRoot: {
    zIndex: 1,
    borderRadius: BorderRadius4x,
    padding: '0rem 1rem',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapGreyNavy
        : Colors.slateGreyDark,
      // borderBottom: '3px solid',
      "& > div > span": {
        color: theme.palette.type === 'dark'
          ? Colors.purple
          : Colors.blue,
        transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
      "& > div > svg": {
        fill: theme.palette.type === 'dark'
          ? Colors.purple
          : Colors.blue,
        transition: theme.transitions.create(['fill'], {
          easing: theme.transitions.easing.easeIn,
          duration: '100ms',
        })
      },
    },
  },
  advancedSearchDropdownMenu: {
    zIndex: 1,
    // background: theme.palette.type === 'dark'
    //   ? Colors.uniswapDarkNavy
    //   : Colors.cream,
    padding: '1.5rem',
    minWidth: 300,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: '100%',
  },
  column1: {
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 250,
  },
  column2: {
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 250,
  },
  innerColumn: {
    display: "flex",
    padding: '1rem',
    width: '100%',
    minWidth: 240,
    maxWidth: 400,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius3x,
    boxShadow: BoxShadows.shadow5.boxShadow,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  innerColumnFlexCol: {
    flexDirection: "column",
  },
  innerColumnFlexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  advancedSearchButtonText: {
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
  dropdownArrow: {
    fill: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
  },
  iconText: {
  },
  buttonRoot: {
    margin: '0.15rem',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    flexGrow: 1,
    flexBasis: '40%',
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
  activeButton: {
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.black}`,
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
  modalBackdrop: {
    backgroundColor: "rgba(47, 57, 65, .85)",
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 1rem)",
    maxWidth: '960px',
    // width: '100%',
    // height: '100%',
    boxShadow: 'unset',
    background: 'transparent',
    margin: '1rem',
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
});

export default withStyles(styles)( AdvancedSearchDropdown );
