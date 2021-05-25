import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius2x, Gradients, BorderRadius } from "layout/AppTheme";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  BlankMutationResponse,
  UserPrivate,
  UserMutationResponse,
} from "typings/gqlTypes";
// GQL
import {
  DELETE_USER_LICENSE,
  SET_DEFAULT_LICENSE_ID,
  EDIT_USER_LICENSE,
} from "queries/user-mutations";
import Typography from '@material-ui/core/Typography';
import UserLicenseRowCard from "./UserLicenseRowCard";
import AddUserLicenseModal from "./AddUserLicenseModal";
/// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";





const UserLicenses: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
  } = props;

  const snackbar = useSnackbar();

  console.log("user.license: ", user.licenses)

  return (
    <div className={classes.userLicensesRoot}>
      <div className={classes.addUserLicenseRoot}>
        <div className={classes.flexRow}>
          <Typography variant="h4">
            Gun Licenses
          </Typography>
          <AddUserLicenseModal />
        </div>
      </div>
      {
        (user?.licenses ?? []).filter(l => !!l).map(license => {
          let isDefaultLicense = license?.id === props.user?.defaultLicense?.id
          return (
            <UserLicenseRowCard
              license={license}
              user={user}
              isHighlighted={isDefaultLicense}
            />
          )
        })
      }
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate
}


const styles = (theme: Theme) => createStyles({
  userLicensesRoot: {
  },
  addUserLicenseRoot: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    marginBottom: "1rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    alignItems: "center",
  },
});


export default withStyles(styles)( UserLicenses );
