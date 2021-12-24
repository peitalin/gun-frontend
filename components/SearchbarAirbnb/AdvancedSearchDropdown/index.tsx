import React from "react";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius4x,
  BorderRadius3x,
  BorderRadius2x,
  BorderRadius,
  Gradients,
  BoxShadows,
  isThemeDark
} from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import Dialog from "@material-ui/core/Dialog";
import DropdownInput from "components/Fields/DropdownInput";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import CaliberMenu from "./CaliberMenu";
import DealerStatesMenu from "./DealerStatesMenu";
import ConditionsMenu from "./ConditionsMenu";
// typings
import {
  DealerState,
} from "typings/gqlTypes";
//
import { SelectOptionCaliber } from "typings";



const AdvancedSearchDropdown: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const [showModal, setShowModal] = React.useState(false)

  const openModal = () => {
    setShowModal((prev) => !prev);
    props.setFocused(true)
    props.setMobileFocused(true)
  };

  const closeModal = () => {
    setShowModal(false);
    props.setFocused(false)
  };

  let dealerStatesStr = props.dealerStates?.length > 3
    ? props.dealerStates?.slice(0, 3)?.join(", ") + '...'
    : props.dealerStates?.join(', ')

  let conditionsStr = props.dealerStates?.length > 3
    ? props.conditions?.slice(0, 3)?.join(", ") + '...'
    : props.conditions?.join(', ')

  let caliberStr = props.calibers?.length > 3
    ? props.calibers?.slice(0, 3)?.map(obj => obj.label)?.join(", ") + '...'
    : props.calibers?.map(obj => obj.label)?.join(', ')
  // console.log('dealerSttes', props.dealerStates)
  // console.log('caliberrrrs', props.calibers)
  // console.log('caliberStr', caliberStr)

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
          <div className={classes.iconTextContainer}>
            {
              (
                props.calibers?.length > 0
              ) &&
              <span className={
                (props.dealerStates?.length === 0) || (props.conditions?.length === 0)
                  ? classes.iconText
                  : classes.iconTextSm
              }>
                {`${caliberStr}`}
              </span>
            }
            {
              (
                props.dealerStates?.length > 0
              ) &&
              <span className={
                (props.calibers?.length === 0) || (props.conditions?.length === 0)
                  ? classes.iconText
                  : classes.iconTextSm
              }>
                {`${dealerStatesStr}`}
              </span>
            }
            {
              (
                props.conditions?.length > 0
              ) &&
              <span className={
                (props.calibers?.length === 0) || (props.dealerStates?.length === 0)
                  ? classes.iconText
                  : classes.iconTextSm
              }>
                {`${conditionsStr}`}
              </span>
            }
            {
              (!props.calibers?.length) &&
              (!props.dealerStates?.length) &&
              (!props.conditions?.length) &&
              <span className={classes.iconText}>
                Filter By
              </span>
            }
          </div>
          <KeyboardArrowDown className={classes.dropdownArrow}/>
        </div>
      </div>

      <Dialog
        open={showModal}
        onClose={() => closeModal()}
        scroll="body"
        fullWidth={true}
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
          <div className={classes.innerDropdownMenu}>
            <div className={classes.column1}>
              <Typography variant="h4" className={classes.subtitle}>
                Filter by Dealer State
              </Typography>
              <DealerStatesMenu
                dealerStates={props.dealerStates}
                setDealerStates={props.setDealerStates}
              />
              <Typography variant="h4" className={classes.subtitle}>
                Filter by Condition
              </Typography>
              <ConditionsMenu
                conditions={props.conditions}
                setConditions={props.setConditions}
              />
            </div>
            <div className={classes.column2}>
              <Typography variant="h4" className={classes.subtitle}>
                Filter by Caliber
              </Typography>
              <CaliberMenu
                calibers={props.calibers}
                setCalibers={props.setCalibers}
              />
            </div>
            <Button
              variant={"outlined"}
              className={classes.buttonConfirm}
              onClick={closeModal}
            >
              Done
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  setFocused?(a: boolean): void;
  setMobileFocused?(a: boolean): void;
  dealerStates?: DealerState[];
  setDealerStates(c: DealerState[]): void;
  conditions?: string[];
  setConditions(c: string[]): void;
  calibers?: SelectOptionCaliber[];
  setCalibers(c: SelectOptionCaliber[]): void;
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
      "& > div > div > span": {
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
    // padding: '0.5rem',
    minWidth: 300,
    width: '100%',
  },
  innerDropdownMenu: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: '1rem',
    paddingTop: "2rem",
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius3x,
    boxShadow: BoxShadows.shadow1.boxShadow,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
  },
  column1: {
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 250,
  },
  column2: {
    flexBasis: '50%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    minHeight: 400,
  },
  subtitle: {
    margin: '0.5rem',
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
    fontSize: '0.9rem',
  },
  iconTextSm: {
    fontSize: '0.7rem',
    fontWeight: 500,
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    margin: '0rem 0.25rem',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxWidth: '960px !important',
    maxHeight: 'calc(100% - 2rem)',
    width: '100%',
    // height: '100%',
    overflow: "visible",
    boxShadow: 'unset',
    background: 'transparent',
    margin: '0rem',
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.uniswapLightGrey}`,
    "& span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyBlack,
    },
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  buttonConfirm: {
    minWidth: 150,
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    border: `1px solid ${Colors.ultramarineBlue}`,
    color: Colors.ultramarineBlue,
    "&:hover": {
      border: `1px solid ${Colors.ultramarineBlueLight}`,
    },
  },
});

export default withStyles(styles)( AdvancedSearchDropdown );
