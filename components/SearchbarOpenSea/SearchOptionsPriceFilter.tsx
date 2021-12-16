import React from "react";
import { Colors, Gradients, BoxShadows } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import ErrorBounds from "components/ErrorBounds";
// MUI
import ClearIcon from '@material-ui/icons/Clear';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";



const SearchbarPriceFilter = (props: SearchbarProps) => {

  let { classes } = props;
  const [expand, setExpand] = React.useState(false);
  const [showPriceLabels, setShowPriceLabels] = React.useState(false);
  const [minWidthAfter300ms, setMinWidthAfter300ms] = React.useState(false);
  const [borderRadius, setBorderRadius] = React.useState(false);

  const minPrice = 0
  const maxPrice = 10000; //cents

  const handleClick = (e) => {
    if (!expand) {
      setExpand(s => true)
      setBorderRadius(true)

      setTimeout(() => {
        setMinWidthAfter300ms(true)
        setShowPriceLabels(true)
      }, 32)

    } else {
      setExpand(s => false)
      // no delay removing minWidth and priceLabels
      setMinWidthAfter300ms(false)
      setShowPriceLabels(false)
      // clear priceFilter and bordeRadius after 32ms
      setTimeout(() => {
        setBorderRadius(false)
      }, 32)
      setTimeout(() => {
        props.setPriceRange([minPrice, maxPrice])
      }, 300)
    }
  }

  return (
    <ErrorBounds fragment>
      <div className={classes.root}>
        <div className={clsx(
          classes.searchbar,
          classes.searchButtonRadius,
          expand && classes.searchbarExpanded,
          expand ? classes.searchButtonRadiusExpanded : classes.searchButtonRadius,
          borderRadius && classes.searchButtonRadiusExpanded,
          minWidthAfter300ms && classes.minWidthAfter300ms,
        )}>
          <Button
            className={clsx(
              classes.button,
              "fadeIn"
            )}
            variant="text"
            color={"primary"}
            onClick={handleClick}
          >
            {
              expand
              ? <ClearIcon className={classes.iconOuter}/>
              : <AttachMoneyIcon className={classes.iconOuter}/>
            }
          </Button>

          <div className={clsx(
            classes.sliderContainer,
            expand ? classes.inputRootExpanded : classes.inputRoot,
          )}>
            <IOSSlider
              // https://material-ui.com/api/slider/
              max={maxPrice/100}
              min={0}
              defaultValue={[1, 50]}
              step={1}
              onChangeCommitted={(e, val: number[]) => {
                props.setPriceRange(
                  (val && val.length > 0)
                    ? val.map(p => p*100)
                    : val
                )
              }}
              aria-labelledby="range-slider"
              getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
              valueLabelFormat={(index) => `$${index}`}
              // valueLabelDisplay="auto"
              valueLabelDisplay={showPriceLabels ? "on" : "off"}
            />
          </div>

        </div>
        <SearchExpander expand={expand}/>
      </div>
    </ErrorBounds>
  )
}

const SearchExpander = (props) => {
  if (props.expand) {
    return <div className="search-expander" style={{ flexGrow: 1 }}/>
  } else {
    return <span/>
  }
}


interface SearchbarProps extends WithStyles<typeof styles> {
  setPriceRange?(a: number|number[]): void;
}

// const MAX_INPUT_WIDTH = 'calc(100vw - 2rem)';
const MAX_INPUT_WIDTH = '280px';

let styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    // cursor: 'pointer',
    minWidth: 40,
  },
  button: {
    // remove that green highlight on focus
    height: '40px',
    "&:focus": {
      backgroundColor: 'unset',
    },
    marginRight: '1.5rem',
  },
  sliderContainer: {
    width: 'calc(100% - 4rem)',
    display: 'flex',
  },
  minWidthAfter300ms: {
    minWidth: 220, // apply this minWidth AFTER width animation 300ms delay
  },
  searchButtonRadius: {
    // borderRadius: '50%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(152,152,152,0.1)",
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
    flexGrow: 1,
    position: 'relative',
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 40,
    maxWidth: MAX_INPUT_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
  searchbarExpanded: {
    backgroundColor: Colors.dropDownGrey,
    '&:hover': {
      backgroundColor: Colors.dropDownGreyHover,
    },
    width: '100vw', // grow the input, constrain with maxWidth
    maxWidth: MAX_INPUT_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
    // maxwidth sync with searchbarExpanded
  inputRootExpanded: {
    color: 'inherit',
    width: 'calc(100% - 5rem)',
    // width: '30vw',
    fontSize: '0.9rem',
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: '400ms',
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

const IOSSlider = withStyles((theme: Theme) => createStyles({
  root: {
    color: Gradients.gradientPurple.background,
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 36,
    width: 36,
    backgroundColor: '#fff',
    boxShadow: BoxShadows.shadow1.boxShadow,
    marginTop: -18,
    marginLeft: -18,
    '&:focus, &:hover, &$active': {
      boxShadow: BoxShadows.shadow3.boxShadow,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: BoxShadows.shadow1.boxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 20px)',
    top: 12,
    '& *': {
      background: 'transparent',
      color: Colors.darkerGrey,
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeInOut,
        duration: '200ms',
      }),
      "&:hover": {
        color: Colors.charcoal,
        transition: theme.transitions.create('color', {
          easing: theme.transitions.easing.easeInOut,
          duration: '200ms',
        }),
      }
    },
    fontWeight: 500,
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeInOut,
      duration: '300ms',
    }),
  },
  track: {
    height: 2,
    background: Gradients.gradientPurple.background,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    background: Gradients.gradientPurple.background,
  },
}))( Slider );


export default withStyles(styles)( SearchbarPriceFilter );
