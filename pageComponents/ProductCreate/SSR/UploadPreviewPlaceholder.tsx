import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@mui/material/Typography";
import { Colors, BorderRadius, BorderRadius2x } from "layout/AppTheme";
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer";



const UploadPreviewPlaceholder = (props) => {

  // let bRadius = BorderRadius2x;
  let bRadius = BorderRadius;

  const isDarkMode = useSelector<GrandReduxState>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography variant="body1" gutterBottom>
        Product Images
      </Typography>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        border: isDarkMode
          ? `2px dashed ${Colors.uniswapLighterGrey}`
          : `2px dashed ${Colors.slateGreyDarker}`,
        backgroundColor: isDarkMode
          ? Colors.uniswapMediumNavy
          : Colors.slateGrey,
        borderRadius: bRadius,
      }}>
        <label
          className={"dzu-upload-input"}
          style={{
            color: "#222",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 15,
            borderRadius: bRadius,
          }}
        >
          {/* <UploadIcon style={{ transform: "scale(0.9)" }}/> */}
          <div
            style={{
              border: isDarkMode
                ? `1px solid ${Colors.uniswapLighterGrey}`
                : `1px solid ${Colors.slateGreyDarker}`,
              backgroundColor: isDarkMode
                ? Colors.uniswapMediumNavy
                : Colors.slateGrey,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.5rem 2rem',
              borderRadius: bRadius,
              marginBottom: '0.5rem',
            }}
          >
            <Typography variant="body1">
              Loading...
            </Typography>
          </div>
        </label>
      </div>
    </div>
  )
}

export default UploadPreviewPlaceholder
