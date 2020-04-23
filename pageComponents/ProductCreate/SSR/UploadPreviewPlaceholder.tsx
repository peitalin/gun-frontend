import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors } from "layout/AppTheme";



const UploadPreviewPlaceholder = (props) => {
  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography variant="body1" gutterBottom>
        Product Images
      </Typography>
      <div style={{
        border: "2px dashed rgb(221, 221, 221)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgb(254, 254, 254)",
        borderRadius: '4px',
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
            borderRadius: 4,
          }}
        >
          {/* <UploadIcon style={{ transform: "scale(0.9)" }}/> */}
          <div
            style={{
              border: `1px solid ${Colors.mediumGrey}`,
              backgroundColor: Colors.lightGrey,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.5rem 2rem',
              borderRadius: '4px',
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
