import React from "react";
import clsx from "clsx";
import { Colors, Gradients, BoxShadows, isThemeDark } from "layout/AppTheme";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputBase from '@mui/material/InputBase';
import Button from "@mui/material/Button";
// Responsiveness
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const SearchOptionsSearchFilter = (props: SearchOptionsProps) => {

  let {
    classes,
    searchOpenByDefault = true,
  } = props;
  const [expand, setExpand] = React.useState(searchOpenByDefault);
  const [minWidthAfter300ms, setMinWidthAfter300ms] = React.useState(false);
  const [borderRadius, setBorderRadius] = React.useState(false);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'))

  const inputRefEl = React.useRef(null);

  const handleClickSearch = (e) => {
    if (!expand) {
      setExpand(s => true)
      if (inputRefEl.current && inputRefEl.current.focus) {
        inputRefEl.current.focus();
      }
      setBorderRadius(true)
      setTimeout(() => {
        setMinWidthAfter300ms(true)
      }, 64)
      // 64ms, so double clicks don't freeze expander halfway

    } else {
      setExpand(s => false)
      // no delay removing minWidth
      setMinWidthAfter300ms(false)

      // clear searchTerm and bordeRadius after 32ms
      setTimeout(() => {
        setBorderRadius(false)
        props.onSearchTermChange("")
      }, 64)
    }
  }

  return (
    <ErrorBounds fragment>
      <div className={classes.root}>
        <div className={clsx(
            classes.searchbar,
            !smDown ? classes.maxWidthLg : classes.maxWidthSm,
            classes.searchButtonRadius,
            expand && classes.searchbarExpanded,
            borderRadius && classes.searchButtonRadiusExpanded,
            minWidthAfter300ms && classes.minWidthAfter300ms,
            // must apply minWidht after width animation, otheriwse jerky animation
          )}
        >
          <Button
            className={clsx(
              classes.button,
              "fadeIn"
            )}
            variant="text"
            color={"primary"}
            onClick={
              searchOpenByDefault
                ? () => {}
                : handleClickSearch
            }
          >
            {
              (!expand || searchOpenByDefault)
              ? <SearchIcon className={classes.iconOuter}/>
              : <ClearIcon className={classes.iconOuter}/>
            }
          </Button>

          <div className={classes.sliderContainer}>
            <InputBase
              value={props.value}
              placeholder={ props.placeholder || "Search for products…"}
              inputRef={inputRefEl}
              classes={{
                root: expand ? classes.inputRootExpanded : classes.inputRoot,
                input: classes.inputInput,
              }}
              onBlur={() => setTimeout(() => {
                  // setExpand(false)
                  // setValue("");
                }, 0)
                // 100ms animation before unmount
                // delay to dispatch search before setExpand(false)
              }
              onChange={(e) => {
                e.persist()
                let value = e.target.value;
                props.onSearchTermChange(value)
              }}
            />
          </div>
        </div>
      </div>
    </ErrorBounds>
  )
}



interface SearchOptionsProps extends WithStyles<typeof styles> {
  value: string;
  placeholder?: string;
  onBlur?(e: any): void;
  onSearchTermChange?(searchTerm: string): void;
  searchOpenByDefault?: boolean;
}

// const MAX_INPUT_WIDTH = 'calc(100vw - 2rem)';
const MAX_INPUT_WIDTH = '300px';

let styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    // cursor: 'pointer',
    minWidth: 40,
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    // remove that green highlight on focus
    height: '40px',
    "&:focus": {
      backgroundColor: 'unset',
    }
  },
  sliderContainer: {
    width: 'calc(100% - 3rem)',
    display: 'flex',
  },
  minWidthAfter300ms: {
    minWidth: 220, // apply this minWidth AFTER width animation 300ms delay
  },
  searchButtonRadius: {
    // borderRadius: '50%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: Colors.dropDownGrey,
    // boxShadow: BoxShadows.shadow1.boxShadow,
    transition: theme.transitions.create('border-radius', {
      easing: theme.transitions.easing.easeInOut,
      duration: '500ms',
    }),
  },
  searchButtonRadiusExpanded: {
    transition: theme.transitions.create('border-radius', {
      easing: theme.transitions.easing.easeInOut,
      duration: '500ms',
    }),
    // borderRadius: '4px',
    // boxShadow: 'unset',
  },
  searchbar: {
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
  maxWidthSm: {
    // maxWidth: 'calc(100vw - 3rem)',
    maxWidth: '100%',
  },
  maxWidthLg: {
    maxWidth: MAX_INPUT_WIDTH,
  },
  searchbarExpanded: {
    backgroundColor: isThemeDark(theme)
      ? Colors.dropDownGrey
      : Colors.slateGrey,
    '&:hover': {
      // backgroundColor: Colors.dropDownGreyHover,
      backgroundColor: isThemeDark(theme)
        ? Colors.dropDownGreyHover
        : Colors.slateGreyDark,
    },
    width: '100vw', // grow the input, constrain with maxWidth
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
  // maxwidth sync with searchbarExpanded
  inputRootExpanded: {
    color: 'inherit',
    width: '100%',
    // width: '30vw',
    fontSize: '0.9rem',
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '800ms',
    }),
    opacity: 1,
  },
  inputRoot: {
    color: 'inherit',
    width: '0',
    fontSize: '0.9rem',
    opacity: 0,
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
  iconOuter: {
    fill: theme.palette.primary.main,
  },
  searchIconInner: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    width: '100%',
    padding: 0,
    fontSize: '16px', // above 16px so mobile web doesn't zoom
    color: theme.palette.mode === 'dark'
      ? theme.colors.uniswapLightestGrey
      : Colors.charcoal,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
    [theme.breakpoints.up('xs')]: {
      // width: '0rem',
      '&:focus': {
        // width: 'calc(80vw)',
      },
    },
    [theme.breakpoints.up('sm')]: {
      // width: '0rem',
      '&:focus': {
        // width: 'calc(80vw)',
      },
    },
    [theme.breakpoints.up('md')]: {
      // width: '0rem',
      '&:focus': {
        // width: 'calc(60vw)',
      },
    },
    [theme.breakpoints.up('lg')]: {
      // width: '0rem',
      '&:focus': {
        // width: 'calc(80vw)',
      },
    },
  },
});


export default withStyles(styles)( SearchOptionsSearchFilter );
