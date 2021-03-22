import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors, BorderRadius, BorderRadius2x } from "layout/AppTheme";
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer";



const SelectFieldPlaceholder = (props) => {

  const isDarkMode = useSelector<GrandReduxState>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        {props.title}
      </Typography>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        height: '2.75rem',
        border: isDarkMode
          ? `1px solid ${Colors.uniswapGrey}`
          : `1px solid ${Colors.slateGreyDarker}`,
        background: isDarkMode
          ? Colors.uniswapMediumNavy
          : Colors.slateGrey,
        borderRadius: BorderRadius,
      }}>
      </div>
    </div>
  )
}

export default SelectFieldPlaceholder;
