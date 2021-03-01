import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius4x } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
// hooks
import Link from "next/link";
import { categorySelectors } from "utils/selectors";
import {
  Categories,
} from "typings/gqlTypes";
import Popover from '@material-ui/core/Popover';
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

  const [openedPopover, setOpenedPopover] = React.useState(false)
  const popoverAnchor = React.useRef(null);

  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true)
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false)
  };

  // console.log("dropDownItems: ", dropDownItems)

  return (
    <div className={classes.categoryDropdownRoot}>

      <Typography
        className={clsx(
          classes.categoryLinkTextNoUnderline,
          classes.categoryLinkTextMainHeight,
        )}
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {itemName}
        <KeyboardArrowDown className={classes.dropdownArrow}/>
      </Typography>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          root: classes.popoverRoot,
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          onMouseEnter: popoverEnter,
          onMouseLeave: popoverLeave
        }}
        // disableRestoreFocus
      >
        <div className={classes.categoryDropdownContainer}>
          {
            dropDownItems.map((d, j) => {
              return (
                <div key={j} className={classes.categoryDropdownInner}>
                  {
                    d.map((e, i) => {
                      return (
                        <Typography
                          className={clsx(
                            classes.categoryLinkTextNoUnderline,
                            smDown
                              ? classes.categoryLinkTextMainHeightSm
                              : classes.categoryLinkTextMainHeight,
                          )}
                        >
                          {e.name}
                        </Typography>

                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </Popover>
    </div>
  );
};





interface ReactProps extends WithStyles<typeof styles> {
  dropDownItems: any[][];
  itemName: string;
}



/////////////// STYLES /////////////////////
export const CategoryBarHeight = 44;

const categoryLinkColor = Colors.darkGrey
const categoryLinkColorHover = fade(Colors.secondaryBright, 0.8)

const categoryLinkColor2 = Colors.darkGrey
const categoryLinkColorHover2 = Colors.secondaryBright


export const styles = (theme: Theme) => createStyles({
  categoryDropdownRoot: {
    borderRadius: BorderRadius4x,
    padding: '0rem 1rem',
    height: '44px',
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
    fontWeight: 600,
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
    fontWeight: 600,
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
  categoryLinkTextMainHeight: {
    height: CategoryBarHeight,
  },
  categoryLinkTextMainHeightSm: {
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
    minHeight: '100px',
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
});

export default withStyles(styles)( CategoryDropdown );
