import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  User_Licenses,
  BlankMutationResponse,
  UserMutationResponse,
  UserPrivate,
} from "typings/gqlTypes";
// components
import ButtonLoading from "components/ButtonLoading";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip"
import ConfirmActionModal from "components/ConfirmActionModal";
import LicenseField from "./LicenseField";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
import {
  DELETE_USER_LICENSE,
  SET_DEFAULT_LICENSE_ID,
  EDIT_USER_LICENSE,
} from "queries/user-mutations";
// router
import { useRouter } from "next/router";
import Loading from "components/Loading";
// redux
import { useDispatch } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Formatting
import { asCurrency as c } from "utils/prices";
// Validation
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';
import { formatDateTime, formatJustDate } from "utils/dates";





const UserLicenseRowCard = (props: ReactProps) => {

  const {
    classes,
    isHighlighted,
    user,
    license,
  } = props

  let firstName = license?.firstName
  let lastName = license?.lastName
  let licenseId = license?.id
  let licenseNumber = license?.licenseNumber
  let licenseExpiry = license?.licenseExpiry
  let licenseCategory = license?.licenseCategory
  let licenseState = license?.licenseState
  let verified = license?.verified

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const snackbar = useSnackbar();
  const dispatch = useDispatch()

  const [showDeleteModal, setShowDeleteModal] = React.useState(false)


  const [deleteUserLicense, deleteUserLicenseResponse] = useMutation<MData, MVar>(
    DELETE_USER_LICENSE, {
      variables: {
        licenseId: undefined,
      },
      update: (cache, { data: { deleteUserLicense }}) => {
        let newUser = deleteUserLicense.user;
        dispatch(Actions.reduxLogin.SET_USER(newUser))
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `License deleted`,
          { variant: "success" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `${e}`,
          { variant: "error" }
        )
      },
  })

  const [
    setDefaultLicenseId,
    setDefaultLicenseIdResponse
  ] = useMutation<MData2, MVar2>(
    SET_DEFAULT_LICENSE_ID, {
      variables: {
        licenseId: undefined,
      },
      update: (cache, { data: { setDefaultLicenseId }}) => {
        let newUser = setDefaultLicenseId.user;
        dispatch(Actions.reduxLogin.SET_USER(newUser))
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Default license swapped`,
          { variant: "success" }
        )
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `${e}`,
          { variant: "error" }
        )
      },
  })

  let now = new Date()
  let expired = licenseExpiry > now

  let isDefaultLicense = licenseId === props.user.defaultLicenseId
  let licenseCategoriesDisplay = licenseCategory.replaceAll("Category", "")

  return (
    <div className={clsx(
      mdDown
        ? classes.licenseContainerMobile
        : classes.licenseContainerDesktop,
      isHighlighted
        ? classes.licenseBorderHighlight
        : classes.licenseBorder,
    )}>

      {
        isDefaultLicense
        ? <div className={classes.licenseBox}>
            <span className={clsx(
              classes.verifiedText,
              verified ? classes.blueText : classes.redText,
            )}>
              { verified ? "Verified" : "Unverified" }
            </span>
            <span className={classes.defaultLicense}>Default License</span>
          </div>
        : <div className={classes.licenseBox}>
            <span className={clsx(
              classes.verifiedText,
              verified ? classes.blueText : classes.redText,
            )}>
              { verified ? "Verified" : "Unverified" }
            </span>
          </div>
      }


      {
        !isDefaultLicense &&
        <div className={classes.licenseItem1}>
          <Tooltip title={"Set license as default"} placement="top">
            <IconButton
              className={classes.closeIcon}
              onClick={() => setDefaultLicenseId({
                variables: {
                  licenseId: licenseId
                }
              })}
              size={"small"}
              // disabled={setDefaultLicenseIdResponse?.loading}
            >
              {
                setDefaultLicenseIdResponse?.loading
                ? <Loading color={isThemeDark(theme) ? Colors.purple : Colors.blue}/>
                : <CheckIcon/>
              }
            </IconButton>
          </Tooltip>
        </div>
      }


      <LicenseField
        heading={"Name"}
        value={`${firstName} ${lastName}`}
      />

      <LicenseField
        heading={"License"}
        value={licenseNumber}
      />

      <LicenseField
        heading={"Expiry"}
        value={
          licenseExpiry &&
          <span className={clsx(
            classes.italicText,
            expired && classes.redText,
          )}>
            {formatJustDate(licenseExpiry)}
          </span>
        }
      />

      <LicenseField
        heading={'Category'}
        value={
          licenseCategory &&
          <span className={classes.italicText}>
            {licenseCategoriesDisplay}
          </span>
        }
      />

      <LicenseField
        heading={"License State"}
        value={
          licenseState &&
          <span className={classes.italicText}>{licenseState}</span>
        }
      />

      {/* {
        verified !== undefined &&
        <LicenseField
          heading={"Verified"}
          value={
            <span className={clsx(
              classes.italicText,
              verified ? classes.blueText : null,
            )}>
              {`${verified}`}
            </span>
          }
        />
      } */}

      {
        !isDefaultLicense &&
        <div className={classes.licenseItem5}>
          <Tooltip title={"Remove license"} placement="top">
            <IconButton
              className={classes.closeIcon}
              onClick={() => setShowDeleteModal(true)}
              size={"small"}
            >
              {
                deleteUserLicenseResponse?.loading
                ? <Loading color={isThemeDark(theme) ? Colors.purple : Colors.blue}/>
                : <ClearIcon/>
              }
            </IconButton>
          </Tooltip>
          <ConfirmActionModal
            title={
              verified
              ? <span>
                  <b>This license is verified.</b>
                  <br/>Do you want to delete this license?
                </span>
              : <span>Do you want to delete this license?</span>
            }
            showModal={showDeleteModal}
            setShowModal={() => setShowDeleteModal(s => !s)}
            onConfirmFunction={() => {
              deleteUserLicense({
                variables: {
                  licenseId: licenseId
                }
              })
            }}
          />
        </div>
      }
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  isHighlighted: boolean;
  user: UserPrivate;
  license: User_Licenses;
}


interface MVar {
  licenseId: string
}
interface MData {
  deleteUserLicense: UserMutationResponse
}
interface MVar2 {
  licenseId: string
}
interface MData2 {
  setDefaultLicenseId: UserMutationResponse
}


const styles = (theme: Theme) => createStyles({
  insertUserLicenseFormRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    minWidth: 330,
    borderRadius: BorderRadius4x,
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem',
    width: '100%',
  },
  title: {
    marginTop: "1.25rem",
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    fontSize: "1rem",
    marginTop: '1rem',
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 100,
  },
  licenseContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius2x,
    padding: '1.5rem 1rem 1.5rem 1rem',
    marginTop: '0.5rem',
  },
  licenseContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BorderRadius2x,
    padding: '1rem 1rem',
    marginTop: '0.5rem',
  },
  licenseBorder: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  licenseBorderHighlight: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.ultramarineBlue}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  licenseItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    marginRight: '0.5rem',
  },
  licenseItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
  },
  licenseItem1: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    left: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  licenseItem5: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    right: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  licenseBox: {
    position: "absolute",
    bottom: '0rem',
    right: '1.5rem',
    fontSize: "0.8rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
  },
  verifiedText: {
    fontStyle: 'italic',
    marginRight: "0.25rem",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  defaultLicense: {
    fontSize: "0.8rem",
    color: isThemeDark(theme)
      ? `${Colors.purple}`
      : `${Colors.ultramarineBlue}`,
  },
  closeIcon: {
    width: 32,
    height: 32,
    background: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: isThemeDark(theme)
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0rem',
    top: '0rem',
  },
  blueText: {
    color: Colors.blue,
  },
  redText: {
    color: Colors.red,
  },
});


export default withStyles(styles)( UserLicenseRowCard );
