import React, { useState } from "react";
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import { UserPrivate } from "typings/gqlTypes";
// components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// sections
import Link from "next/link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const HomeSection2 = ({ classes }: ReactProps) => {

  return (
    <div className={classes.section2Root}>
      <div className={classes.section2InnerBox}>
        <Typography variant={"h4"} className={classes.text1}>
          Add your first digital product
        </Typography>
        <Typography className={classes.text2}>
          Upload a product, get a link, and start selling instantly.
        </Typography>
        <Typography className={classes.text3}>
          Plus, you'll get featured on the GM marketplace.
        </Typography>
        <Link href={"/sell"}>
          <a>
            <Button className={classes.button} variant="contained" color="secondary">
              Add Product
            </Button>
          </a>
        </Link>

      </div>

    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {}

interface QueryData {
  user: UserPrivate;
}


const styles = (theme: Theme) => createStyles({
  section2Root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: '2rem',
  },
  section2InnerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: '3rem 2rem',
    backgroundColor: Colors.foregroundColor,
    border: `1px solid ${Colors.mediumLightGrey}`,
    borderRadius: BorderRadius,
  },
  button: {
    backgroundColor: Colors.red,
    color: Colors.white,
    transition: theme.transitions.create('background-color', {
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
    "&:hover": {
      backgroundColor: alpha(Colors.red, 0.9),
      transition: theme.transitions.create('background-color', {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
    },
  },
  text1: {
    marginBottom: "1.5rem",
    fontSize: '1.5rem',
    fontWeight: 600,
    color: Colors.red,
  },
  text2: {
    marginBottom: "0.5rem",
    fontWeight: 500,
  },
  text3: {
    marginBottom: "1.5rem",
    fontWeight: 500,
  },
});

export default withStyles(styles)(HomeSection2);
