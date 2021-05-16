import React from "react";
// icon
import Typography from "@material-ui/core/Typography";
import { Colors, BorderRadius } from "layout/AppTheme";
import { useSelector } from "react-redux"
import { GrandReduxState } from "reduxStore/grand-reducer";



const SelectTagsPlaceholder = (props: ReactProps) => {

  const isDarkMode = useSelector<GrandReduxState>(s => {
    return s.reduxLogin.darkMode === 'dark'
  })

  let borderRad = BorderRadius

  return (
      <div
        className={isDarkMode ? "shimmer-dark" : 'shimmer'}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: borderRad,
          border: isDarkMode
            ? `1px solid ${Colors.uniswapMediumGrey}`
            : `1px solid ${Colors.slateGreyDarker}`,
          ...props.style
        }
      }>
        <div
          style={{
            // background: isDarkMode
            //   ? Colors.uniswapMediumNavy
            //   : Colors.slateGrey,
            borderRadius: borderRad,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem 2rem',
          }}
        >
        </div>
      </div>
  )
}

interface ReactProps {
  style?: any
}

export default SelectTagsPlaceholder;
