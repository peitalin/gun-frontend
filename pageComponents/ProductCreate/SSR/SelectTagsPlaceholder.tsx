import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors } from "layout/AppTheme";
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer";



const SelectTagsPlaceholder = (props) => {

  const isDarkMode = useSelector<GrandReduxState>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography variant="body1" gutterBottom>
        Tags
      </Typography>
      <div style={{
        border: "1px solid rgb(221, 221, 221)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgb(254, 254, 254)",
        borderRadius: '4px',
      }}>
        <div
          style={{
            border: isDarkMode
              ? `1px solid ${Colors.uniswapGrey}`
              : `1px solid ${Colors.slateGreyDarker}`,
            background: isDarkMode
              ? Colors.uniswapMediumNavy
              : Colors.slateGrey,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem 2rem',
            borderRadius: '4px',
            marginBottom: '0.5rem',
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default SelectTagsPlaceholder;
