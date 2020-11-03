import React from "react";
// icon
import UploadIcon from "components/Icons/UploadIcon";
import Typography from "@material-ui/core/Typography";
import { Colors, BorderRadius, BorderRadius2x } from "layout/AppTheme";



const SelectFieldPlaceholder = (props) => {

  // let bRadius = BorderRadius2x;
  let bRadius = BorderRadius;

  return (
    <div style={{
      marginBottom: '1rem',
    }}>
      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        {props.title}
      </Typography>
      <div style={{
        border: `1px solid ${Colors.uniswapGrey}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        height: '2.75rem',
        background: Colors.uniswapMediumNavy,
        borderRadius: bRadius,
      }}>
      </div>
    </div>
  )
}

export default SelectFieldPlaceholder
