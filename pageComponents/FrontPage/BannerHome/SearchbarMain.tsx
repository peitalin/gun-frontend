import React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import ErrorBounds from "components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useSnackbar, ProviderContext } from "notistack";


const SearchbarMain = (props: SearchbarProps) => {

  let { classes, color } = props;
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const snackbar = useSnackbar();
  const inputRefUnfocus = React.useRef(null);

  const onEnter = (event) => {
    if (event.key === "Enter") {
      if (!value) {
        snackbar.enqueueSnackbar(
          `No search term entered!`,
          { variant: "info" }
        )
        return
      }
      router.push(`/search?q=${encodeURIComponent(value)}`)
      if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
        inputRefUnfocus.current.focus()
      }
    }
  }

  const onClick = (event) => {
    if (!value) {
      snackbar.enqueueSnackbar(
        `No search term entered!`,
        { variant: "info" }
      )
      return
    }
    router.push(`/search?q=${encodeURIComponent(value)}`)
    if (inputRefUnfocus.current && inputRefUnfocus.current.focus) {
      inputRefUnfocus.current.focus()
    }
  }

  return (
    <div className={classes.searchRoot}>
      <div className={classes.searchbar}>
        {/* note: needs the newline here to work
          // @ts-ignore */}
        <InputBase
          value={value}
          inputRef={input => {
            // input.blur()
          }}
          placeholder="Search presets, templates, categories…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => setValue(e.target.value)}
          onKeyPress={onEnter}
          startAdornment={
            // <SearchAdornmentButton
            //   classes={classes}
            //   onClick={onClick}
            //   color={color}
            // />
            <div className={classes.searchAdornIcon}>
              <SearchIcon style={{ fill: color || "#242424" }}/>
            </div>
          }
        />
      </div>
      <Button
        className={classes.searchButtonRed}
        variant="text"
        color="primary"
        onClick={onClick}
      >
        Search
      </Button>
    </div>
  )
}

export const SearchExpander = (props) => {
  return <div style={{ flexGrow: 1 }}/>
}


const SearchAdornmentButton = ({ classes, onClick, color }) => {
  return (
    <Button
      className={classes.searchButton}
      variant="text"
      color="primary"
      onClick={onClick}
    >
      <SearchIcon style={{ fill: color || "#242424" }}/>
    </Button>
  )
}


interface SearchbarProps extends WithStyles<typeof styles> {
  color?: string;
}

let styles = (theme: Theme) => createStyles({
  searchRoot: {
    width: '100%',
    maxWidth: 400,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
  searchbar: {
    width: '100%',
    position: 'relative',
    borderLeft: `1px solid ${Colors.lightGrey}`,
    borderTop: `1px solid ${Colors.lightGrey}`,
    borderBottom: `1px solid ${Colors.lightGrey}`,
    borderRight: `1px solid ${Colors.lightGrey}`,
    // borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
    borderRadius: `${BorderRadius}px ${BorderRadius}px ${BorderRadius}px ${BorderRadius}px`,
    // backgroundColor: "rgba(152,152,152,0.1)",
    // '&:hover': {
    //   backgroundColor: "rgba(152,152,152,0.05)",
    // },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    fontSize: '0.9rem',
    width: '100%',
  },
  inputInput: {
    width: '100%',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    transition: theme.transitions.create('width'),
  },
  searchButton: {
    padding: '8px'
  },
  searchButtonRed: {
    color: Colors.cream,
    padding: '8px',
    width: 100,
    marginLeft: "0.5rem",
    // borderRadius: `0px ${BorderRadius}px ${BorderRadius}px 0px`,
    backgroundColor: Colors.secondary,
    "&:hover": {
      color: Colors.cream,
      backgroundColor: Colors.secondaryBright,
    },
  },
  searchAdornIcon: {
    marginLeft: '0.75rem',
    marginTop: '0.25rem',
  },
});


export default withStyles(styles)( SearchbarMain );
