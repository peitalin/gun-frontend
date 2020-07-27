
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// MUI
import Typography from "@material-ui/core/Typography";
// CSS
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@material-ui/core/styles';
import { Colors } from "layout/AppTheme";



const ToolTips = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <div className={clsx(
      "staggerFadeIn",
      smDown ? classes.toolTipRootSm : classes.toolTipRoot
    )}>
      <div className={classes.toolTip1}>
        <Typography color={"primary"} variant="h6" gutterBottom>
          Fulfill Orders Quickly
        </Typography>
        <Typography color={"primary"} variant="body2">
          You should deliver your firearm to the dealership
          and upload the form-10 receipt within 5 days to
          reduce chances of cancelled orders.
        </Typography>
      </div>
      <div className={classes.toolTip2}>
        <Typography color={"primary"} variant="h6" gutterBottom>
          Need Help?
        </Typography>
        <Typography color={"primary"} variant="body2">
          If you have any issues with the order, feel free to contact
          our team at <a href={"mailto:support@gunmarketplace.com.au"}>support@gunmarketplace.com.au</a>
        </Typography>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  toolTipRoot: {
    marginLeft: '1rem',
  },
  toolTipRootSm: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    marginLeft: '0rem',
    marginTop: '1rem',
  },
  toolTip1: {
    padding: '1.5rem 2rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
  },
  toolTip2: {
    padding: '1.5rem 2rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '2px',
    backgroundColor: Colors.foregroundColor,
  },
});

export default withStyles(styles)( ToolTips );



