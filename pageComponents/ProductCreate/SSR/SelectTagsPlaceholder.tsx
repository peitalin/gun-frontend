import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors } from "layout/AppTheme";



const SelectTagsPlaceholder = (props) => {
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
            border: `1px solid ${Colors.mediumGrey}`,
            backgroundColor: Colors.foregroundColor,
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
