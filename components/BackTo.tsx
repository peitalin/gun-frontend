import React from "react";
// Router
import { useRouter } from "next/router";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import Router from "next/router";



const BackTo = (props: ReactProps) => {

  const {
    classes,
    title,
    textLink,
  } = props;

  if (!!textLink) {
    return (
      <div className={classes.flexRowSpaceBetween}>
        <div className={classes.flexColRightBottom}>
          <a className={classes.textLinkLink} onClick={() => Router.back()}>
            <Typography variant="body1" className={classes.backLinkText}>
              {title}
            </Typography>
          </a>
        </div>
      </div>
    )
  } else {
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
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  textLink?: boolean;
}

export const styles = (theme: Theme) => createStyles({
  goBackContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  iconButton: {
  },
  title: {
    fontWeight: 600,
    width: '100%',
    textAlign: 'center',
  },
  textLinkLink: {
    marginTop: "1rem",
  },
  margin1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexColRightBottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  backLinkText: {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: '1rem',
    color: theme.colors.uniswapLighterGrey,
    "&:hover": {
      cursor: "pointer",
      color: Colors.blue,
    },
  },
});


export default withStyles(styles)(BackTo);

