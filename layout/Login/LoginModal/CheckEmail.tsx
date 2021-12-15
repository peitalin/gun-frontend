import React from 'react';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
// Components
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
// Clear
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";



const CheckEmail = (props: ReactProps) => {

  const [email, setEmail] = React.useState("");
  const { classes } = props;

  const toLogin = () => {
    props.setTabIndex(0)
  }

  return (
    <ErrorBounds className={classes.outerContainer}>
      <div className={classes.paper}>

        <IconButton
          className={classes.clearButton}
          onClick={props.handleToggleModal}
          size="medium"
        >
          <ClearIcon/>
        </IconButton>

        <Typography className={classes.title} variant="h5">
          Password Reset Next Steps
        </Typography>

        <Typography variant="body1" className={classes.passwordResetSubtitle}>
          Please check your email for instructions to reset your password.
        </Typography>

        <div className={classes.preHeader}>
          <Typography variant="body1">
            <a onClick={toLogin} className={classes.link}>
              Back to Login
            </a>
          </Typography>
        </div>

      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  handleToggleModal?(): void;
}

export default withStyles(styles)( CheckEmail );
