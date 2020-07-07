import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import LinkMui from '@material-ui/core/Link';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import RelayDownloadIcon2 from "components/Icons/RelayDownloadIcon2";
import LinkIcon from "@material-ui/icons/Link";
// Errors
import ErrorBounds from 'components/ErrorBounds';
// Modals
import { goToModalConnect } from "utils/modals";
import { useRouter } from "next/router";
import { logout } from "queries/requests";
import { useApolloClient } from "@apollo/client";




const AccountCreated: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const dispatch = useDispatch();
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const router = useRouter();
  const apolloClient = useApolloClient();

  return (
    <ErrorBounds className={classes.formRoot}>
      <div className={classes.maxWidth720}>
        <div className={classes.paperMargin}>

          {
            props.asModal &&
            <IconButton
              className={classes.closeButton}
              onClick={() =>
                dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(false))
              }
            >
              <ClearIcon/>
            </IconButton>
          }

          <div className={classes.flexColMargin}>
            <Typography color={"primary"} variant="h3">
              Upload a Digital Product
            </Typography>
          </div>

          <div className={classes.flexColMargin}>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => router.push("/sell")}
              className={props.classes.button}
            >
              <Typography variant="body1" className={classes.buttonText}>
                <RelayDownloadIcon2/>
                Upload Product
              </Typography>
            </Button>
          </div>

          <div className={classes.flexColMargin}>
            <div className={classes.flexRow}>
              <Typography variant="body1" className={classes.loggedInText}>
                You're logged in as
              </Typography>
              <Typography variant="body1" className={classes.loggedInEmail}>
                {user.email}
              </Typography>
              <div
                className={clsx(classes.link, classes.logout)}
                onClick={() => logout(apolloClient, dispatch)(router.pathname)}
              >
                logout
              </div>
            </div>
          </div>

        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
}

export default withStyles(styles)( AccountCreated );

