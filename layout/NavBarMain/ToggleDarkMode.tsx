import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// components
import Switch from '@material-ui/core/Switch';



const ToggleDarkMode = (props: ReactProps) => {

  const {
    classes,
  } = props;

  let darkMode = useSelector<GrandReduxState, "dark"|"light">(s => {
    return s.reduxLogin.darkMode
  })
  const dispatch = useDispatch();

  return (
    <Switch
      checked={darkMode === "dark"}
      onChange={(e) => {
        if (darkMode === "dark") {
          dispatch(Actions.reduxLogin.SET_LIGHT_MODE())
        } else {
          dispatch(Actions.reduxLogin.SET_DARK_MODE())
        }
      }}
      color="secondary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  )
}



/////////// Typings //////////////

interface ReactProps extends WithStyles<typeof styles> {
}

/////////// Styles //////////////

const styles = (theme: Theme) => createStyles({
  root: {},
});


export default withStyles(styles)( ToggleDarkMode );







