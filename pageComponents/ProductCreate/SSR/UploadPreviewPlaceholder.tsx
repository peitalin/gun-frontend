import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors, BorderRadius, BorderRadius2x } from "layout/AppTheme";



const UploadPreviewPlaceholder = (props) => {

  // let bRadius = BorderRadius2x;
  let bRadius = BorderRadius;

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography variant="body1" gutterBottom>
        Product Images
      </Typography>
      <div style={{
        border: `2px dashed ${Colors.uniswapLighterGrey}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: Colors.uniswapMediumNavy,
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
              border: `1px solid ${Colors.uniswapLighterGrey}`,
              backgroundColor: Colors.uniswapMediumNavy,
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
