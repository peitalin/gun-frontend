
import React from "react";
import { Colors } from "layout/AppTheme";

const TextEditorPlaceholder = () => {
  return (
    <div style={{
      height: '165px',
      width: '100%',
      marginBottom: 'calc(1rem + 18px)',
      border: `1px solid ${Colors.lightGrey}`,
    }}>
    </div>
  )
}

export default TextEditorPlaceholder;