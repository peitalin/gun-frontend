
import React from "react";
import { Colors, BorderRadius } from "layout/AppTheme";

const TextEditorPlaceholder = () => {
  return (
    <div style={{
      height: '165px',
      width: '100%',
      marginBottom: 'calc(1rem + 18px)',
      border: `1px solid ${Colors.uniswapLighterGrey}`,
      borderRadius: BorderRadius,
    }}>
    </div>
  )
}

export default TextEditorPlaceholder;