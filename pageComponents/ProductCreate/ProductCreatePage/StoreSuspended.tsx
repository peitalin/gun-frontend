
import React from "react";
import clsx from "clsx";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { Theme, alpha } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import {
  Colors,
  BorderRadius,
} from "layout/AppTheme";
import PreventDragDropContainer from "./PreventDragDropContainer";



const StoreSuspended = (props: ReactProps) => {

  const { classes } = props;

  return (
    <PreventDragDropContainer>
      <div className={classes.suspendedContainer}>
        <div className={classes.suspendedMessage}>
          Your store was suspended for suspicious activity. <br/>
          Maybe you uploaded something that was inappropriate. <br/>
          <br/>
          Please contact
          <a
            className={classes.link}
            style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
            href={"mailto:admin@gunmarketplace.com.au"}
          >
            admin@gunmarketplace.com.au
          </a>
          <br/>
          to try resolve this issue.
        </div>
      </div>
    </PreventDragDropContainer>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}


export const styles = (theme: Theme) => createStyles({
  link: {
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  suspendedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    maxWidth: '600px',
    padding: '2rem',
    // border: `1px solid ${Colors.lightGrey}`,
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    // overrides .MuiAccordion-rounded:first-child
    // border radius
    borderRadius: `${BorderRadius}px !important`,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
  },
  suspendedMessage: {
    textAlign: 'center',
  },
})





export default withStyles(styles)(React.memo(
  (props: ReactProps) => <StoreSuspended {...props}/>,
));

