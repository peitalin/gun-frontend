import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// components
import Switch from '@mui/material/Switch';



const ToggleDarkMode = (props: ReactProps) => {

  const {
    callback,
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
        if (typeof callback === 'function') {
          callback()
        }
      }}
      color="secondary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  )
}



/////////// Typings //////////////

interface ReactProps {
  callback?(): void
}

/////////// Styles //////////////

// const styles = (theme: Theme) => createStyles({
//   root: {},
// });


export default ToggleDarkMode







