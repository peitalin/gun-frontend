import * as React from "react";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import ErrorBounds from "../../components/ErrorBounds";
// MUI
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useWindowWidth } from "utils/hooks";
import { useRouter } from "next/router";
import { Colors, BorderRadius } from "layout/AppTheme";


const Searchbar = (props: SearchbarProps) => {

  let { classes, color } = props;
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <ErrorBounds fragment>
      <div className={classes.flex}>
        <div className={classes.searchbar}>
          <div className={classes.searchIcon}>
            <SearchIcon style={{ fill: color || Colors.uniswapLighterGrey }}/>
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
    </ErrorBounds>
  )
}

export const SearchExpander = (props) => {
  return <div style={{ flexGrow: 1 }}/>
}


interface SearchbarProps extends WithStyles<typeof styles> {
  color?: string;
}

let styles = (theme: Theme) => createStyles({
  flex: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  searchbar: {
    flexGrow: 1,
    position: 'relative',
    // border: `1px solid ${Colors.uniswapDarkNavy}`,
    borderRadius: BorderRadius,
    backgroundColor: "rgba(152,152,152,0.1)",
    '&:hover': {
      backgroundColor: "rgba(152,152,152,0.15)",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
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
    color: 'inherit',
    width: '100%',
    fontSize: '0.9rem',
  },
  inputInput: {
    color: Colors.uniswapLightestGrey,
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    transition: theme.transitions.create('width'),
    width: '100%',
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


export default withStyles(styles)( Searchbar );
