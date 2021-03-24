import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { Colors, BorderRadius3x } from "layout/AppTheme";



const Searchbar = (props: SearchbarProps) => {

  let { classes, color } = props;
  const [expand, setExpand] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const inputRefEl = React.useRef(null);

  const handleClickSearch = (e) => {
    if (value.length > 0) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
      setValue("");
    } else {
      if (!expand) {
        setExpand(s => true)
        props.setHideMenuItems(true)
        // props.setMobileMenuOpen(s => true)
        inputRefEl.current.focus();
      } else {
        setExpand(s => false)
        props.setHideMenuItems(false)
      }
    }
  }


  return (
    <ErrorBounds fragment>
      <div className={classes.root}>
        <div className={clsx(
          classes.searchbar,
          expand && classes.searchbarExpanded
        )}>
          <Button
            className={clsx(
              classes.button,
              "fadeIn"
            )}
            variant="text"
            color="primary"
            onClick={handleClickSearch}
            style={{ color: color }}
          >
            <SearchIcon
              className={classes.searchIconOuter}
              style={{ fill: color }}
            />
          </Button>
          <InputBase
            value={value}
            placeholder="Search for products…"
            inputRef={inputRefEl}
            classes={{
              root: expand ? classes.inputRootExpand : classes.inputRoot,
              input: classes.inputInput,
            }}
            onBlur={
              () => setTimeout(() => {
                setExpand(false)
                setValue("");
                props.setHideMenuItems(false)
                // props.setMobileMenuOpen(s => false)
              }, 100)
              // 100ms animation before unmount
              // delay to dispatch search before setExpand(false)
            }
            onChange={e => {
              setValue(e.target.value);
            }}
            onKeyPress={event => {
              if (event.key === "Enter") {
                router.push(`/search?q=${encodeURIComponent(value)}`)
                setValue("");
              }
            }}
          />
        </div>
        <div className={classes.grow}/>
      </div>
    </ErrorBounds>
  )
}

export const SearchExpander = (props) => {
  return <div style={{ flexGrow: 1 }}/>
}


interface SearchbarProps extends WithStyles<typeof styles> {
  color?: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
  setHideMenuItems(f: any): void;
}

let styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
  },
  searchbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    position: 'relative',
    borderRadius: BorderRadius3x,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 'auto',
    },
  },
  searchbarExpanded: {
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
  },
  searchIconOuter: {
    fill: Colors.uniswapLighterGrey,
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
  inputRoot: {
    color: Colors.uniswapLightestGrey,
    width: '0',
    fontSize: '0.9rem',
  },
  inputRootExpand: {
    color: Colors.uniswapLightestGrey,
    width: 'calc(100% - 3rem)',
    fontSize: '0.9rem',
  },
  inputInput: {
    padding: 0,
    fontSize: '16px', // above 16px so mobile web doesn't zoom
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: '100ms',
    }),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '0rem',
      opacity: 0,
      '&:focus': {
        width: 'calc(80vw)',
        opacity: 1,
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '0rem',
      opacity: 0,
      '&:focus': {
        width: 'calc(80vw)',
        opacity: 1,
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '0rem',
      opacity: 0,
      '&:focus': {
        width: 'calc(60vw)',
        opacity: 1,
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: '0rem',
      opacity: 0,
      '&:focus': {
        width: 'calc(80vw)',
        opacity: 1,
      },
    },
  },
});


export default withStyles(styles)( Searchbar );
