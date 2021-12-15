import React from "react";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { buttonHoverDark, buttonHoverLight } from "./styles";
// MUI
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useRouter } from "next/router";
import {
  Colors,
  BorderRadius,
  BorderRadius2x,
  BorderRadius3x,
  BoxShadows,
} from "layout/AppTheme";


const SearchbarNavbarDesktop = (props: SearchbarNavbarDesktopProps) => {

  let { classes, color } = props;
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <div className={classes.flex}>
      <div className={classes.searchbar}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{ fill: color || Colors.uniswapLightestGrey }}/>
        </div>
        <InputBase
          value={value}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
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
  )
}


interface SearchbarNavbarDesktopProps extends WithStyles<typeof styles> {
  color?: string;
}

let styles = (theme: Theme) => createStyles({
  flex: {
    display: "flex",
    // flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  searchbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    position: 'relative',
    // border: `1px solid ${Colors.uniswapDarkNavy}`,
    borderRadius: BorderRadius3x,
    backgroundColor: theme.palette.mode === "dark"
      ? Colors.uniswapDarkNavy
      : Colors.slateGreyDark,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 'auto',
    },
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
    color: Colors.black,
    width: '100%',
    fontSize: '0.9rem',
  },
  inputInput: {
    // color: Colors.cream,
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
    color: Colors.black,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.up('md')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    [theme.breakpoints.up('xl')]: {
      width: 140,
      '&:focus': {
        width: 220,
      },
    },
  },
});


export default withStyles(styles)( SearchbarNavbarDesktop );
