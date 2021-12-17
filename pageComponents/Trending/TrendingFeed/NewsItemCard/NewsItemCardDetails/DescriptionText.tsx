import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, Colors, isThemeDark, BorderRadius3x } from "layout/AppTheme";



const DescriptionText = (props: ReactProps) => {

  const {
    classes,
    isInternalProduct,
    description,
  } = props;

  // const theme = useTheme();

  return (
    <div className={classes.description}>
      {
        isInternalProduct &&
        <span dangerouslySetInnerHTML={{ __html: String(description ?? "") }} />
        // : <div>
        //     {description}
        //   </div>
      }
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  isInternalProduct: boolean
  description: string
}


const styles = (theme: Theme) => createStyles({
  description: {
    fontWeight: 500,
    maxHeight: 200,
    overflow: "scroll",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLighterBlack,
  },
});



export default withStyles(styles)(DescriptionText)