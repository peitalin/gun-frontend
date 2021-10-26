import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import { BorderRadius4x, BorderRadius, Colors, isThemeDark } from "layout/AppTheme";
import clsx from "clsx";

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';

import CreateLicense from './CreateLicense';
import ErrorBounds from "components/ErrorBounds";
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  UserMutationResponse,
  UserPrivate,
} from "typings/gqlTypes";
import { useTheme } from '@material-ui/core/styles';
import { ADD_USER_LICENSE } from "queries/user-mutations";
import { useMutation, ApolloError } from "@apollo/client";
import { connect, useSelector, useDispatch } from "react-redux"
import { Actions } from "reduxStore/grand-reducer"

import { useSnackbar, ProviderContext } from "notistack";



const AddLicenseModal: React.FC<ReactProps> = (props) => {

  const {
    classes,
    className,
  } = props;

  const theme = useTheme();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [openModal, setOpenModal] = React.useState(false)



  let [addUserLicense, addUserLicenseResponse] = useMutation<MData, MVar>(
    ADD_USER_LICENSE, {
    variables: {
      firstName: undefined,
      lastName: undefined,
      licenseNumber: undefined,
      licenseExpiry: undefined,
      licenseCategory: undefined,
      licenseState: undefined,
      // phoneNumber: undefined,
      // countryCode: undefined,
    },
    onCompleted: (data) => {
      let user = data?.addUserLicense?.user;
      props.callback(user)
      if (user) {
        // Update redux user and cart state and refetch
        dispatch(Actions.reduxLogin.SET_USER(user));
      }
    },
    update: (cache, { data: { addUserLicense } }) => { },
    onError: (error) => {
      handleGqlError(error)
    },
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  })


  const handleGqlError = (error: ApolloError) => {
    // console.log("logIn error:", JSON.stringify(error))
    if (error?.networkError) {
      snackbar.enqueueSnackbar(
        `Server is down. StatusCode: ${(error?.networkError as any)?.statusCode}`,
        { variant: "error" }
      )
      return
    }
    if (error?.graphQLErrors) {
      snackbar.enqueueSnackbar(
        error?.graphQLErrors?.[0]?.message,
        { variant: "error" }
      )
    } else {
      snackbar.enqueueSnackbar(
        error?.message,
        { variant: "error" }
      )
    }
  }


  return (
    <ErrorBounds className={clsx(classes.loginRoot)}>
      <div className={classes.flexCenter}>
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          // DESKTOP SCREEN SIZE ONLY
          fullScreen={
            smDown ? true : false
          } // full height
          fullWidth={false}
          scroll={"body"}
          maxWidth="xs"
          classes={{
            paperFullWidth: classes.dialogPaperFull,
            paper: classes.dialogPaper,
          }}
        >
          <div className={classes.outerContainer}>
            <div className={classes.loginButton}>
              <CreateLicense
                addUserLicense={({
                  firstName,
                  lastName,
                  licenseNumber,
                  licenseExpiry,
                  licenseCategory,
                  licenseState,
                }) => {
                  addUserLicense({
                    variables: {
                      firstName,
                      lastName,
                      licenseNumber,
                      licenseExpiry,
                      licenseCategory,
                      licenseState,
                    }
                  })
                }}
                handleToggleModal={() => setOpenModal(s => !s)}
                buttonLoading={addUserLicenseResponse.loading}
              />
            </div>
          </div>
        </Dialog>

        <Button
          variant="contained"
          color="primary"
          className={clsx(
            classes.loginButton,
            classes.maxWidthEmailPrefillButton,
            props.className,
          )}
          onClick={() => setOpenModal(s => !s)}
          {...props.buttonProps}
        >
          <span>
            Add a License
          </span>
        </Button>

      </div>
    </ErrorBounds>
  )
}


interface MVar {
  firstName: string
  lastName: string
  licenseNumber: string
  licenseExpiry: Date
  licenseCategory: string
  licenseState: string
}
interface MData {
  addUserLicense: UserMutationResponse
}

interface ReactProps extends WithStyles<typeof styles> {
  buttonProps?: any;
  className?: any;
  callback(user: UserPrivate): void
}

const emailInputMaxWidth = 340;


const styles = (theme: Theme) => createStyles({
  loginRoot: {
    width: '100%',
  },
  flexCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogPaperFull: {
    width: "100%",
  },
  dialogPaper: {
    borderRadius: `${BorderRadius4x}px`,
  },
  outerContainer: {
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginTop: '2rem',
    margin: '1rem',
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.uniswapGrey}`,
  },
  loginButton: {
    // cursor: 'pointer',
    width: "100%",
    color: Colors.cream,
    backgroundColor: Colors.ultramarineBlue,
    "&:hover": {
      backgroundColor: Colors.ultramarineBlueLight,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "2rem",
    backgroundColor: theme.palette.type === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.darkWhite,
  },
  marginBottom: {
    marginBottom: '1rem',
  },
  mobileMenuFlexitem: {
    flexGrow: 1,
    flexBasis: '40%',
    width: '100%',
    borderRadius: BorderRadius,
  },
  mobileMenuItemRoot: {
    minHeight: '0rem',
    padding: "0.5rem 1.25rem",
  },
  textInputRoot: {
    backgroundColor: Colors.white,
    borderRadius: '4px',
    // marginLeft: '0.5rem',
    // marginRight: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
    maxWidth: emailInputMaxWidth,
    // height: 40,
  },
  textInputInput: {
    backgroundColor: Colors.white,
    // height: 40,
    padding: '0.72rem',
    borderRadius: '4px',
    fontSize: '1rem',
    minWidth: 220,
  },
  textFocused: {
    outline: 'none',
  },
  maxWidthEmailPrefillButton: {
    maxWidth: emailInputMaxWidth,
    height: 40,
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: BorderRadius,
  },
  emailPrefillFlexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
});


export default withStyles(styles)( AddLicenseModal );
