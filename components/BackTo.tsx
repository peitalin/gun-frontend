import React from "react";
// Router
import { useRouter } from "next/router";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "@material-ui/core/Button";
import Router from "next/router";




const BackTo = (props: ReactProps) => {

  const { classes, title } = props;
  const router = useRouter();

  return (
    <div className={classes.goBackContainer}>
      <Button
        variant={"outlined"}
        color={"primary"}
        onClick={() => Router.back()}
      >
        <KeyboardArrowLeft className={classes.iconButton}/>
        { title ? title : "Back to listings" }
      </Button>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
}

export const styles = (theme: Theme) => createStyles({
  goBackContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    padding: '2rem',
  },
  iconButton: {
  },
  title: {
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
  },
});


export default withStyles(styles)(BackTo);

