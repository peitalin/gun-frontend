import React from "react";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  UserMutationResponse,
  User_Licenses,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import Loading from "components/Loading";
import UserProfileDetails from "./UserProfileDetails";
// Components
import ApproveUserFormWrapper from "./ApproveUserFormWrapper";
import ViewParagraph from "../ViewerParagraph";

// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import {
  GET_RECENT_USERS,
  USER_BY_EMAIL_OR_ID_ADMIN_ONLY,
  ADMIN_APPROVE_USER_LICENSE,
} from "queries/user-admin-queries-mutations";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
// Snackbar
import { useSnackbar } from "notistack";



const UserProfileForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
  } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();

 // state
  const [loading, setLoading] = React.useState(false);
  const [
    selectedLicense,
    setSelectedLicense
  ] = React.useState<User_Licenses>(undefined)


  const toggleApproveUserLicense = async({ userId, licenseId, verified }: {
    userId: string,
    licenseId: string
    verified: boolean,
  }) => {

    console.log("approving/unapproving userId:", userId);

    const { errors, data } = await aClient.mutate<MutData3, MutVar3>({
      mutation: ADMIN_APPROVE_USER_LICENSE,
      variables: {
        userId: userId,
        licenseId: licenseId,
        verified: verified,
      }
    });

    console.log("user approve/unapprove response:", data);
    alert(JSON.stringify({ VERIFIED: data?.adminApproveUserLicense }));
    // data.refundOrder.order
    if (errors) {
      snackbar.enqueueSnackbar(
        `User license (un)approval failed with msg: ${errors}`,
        { variant: "error" }
      )
    }
    return data;
  }

  return (
    <Formik
      initialValues={{
        userId: user?.id,
        verified: !user?.defaultLicense?.verified,
      }}
      validationSchema={validationSchemas.ApproveUnapproveUserLicense}
      onSubmit={(values, { setSubmitting }) => {
        console.log("not implemented")
        console.log('formik values: ', values);
        toggleApproveUserLicense({
          userId: user?.id,
          licenseId: selectedLicense.id,
          verified: !selectedLicense.verified,
        }).then(res => {
          console.log(res)
          setLoading(false)
          props.searchUser(values.userId)
        }).catch(e => {
          console.log(e)
          setLoading(false)
        })
      }}
    >
      {(fprops) => {

        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          validateField,
          validateForm,
        } = fprops;

        return (
          <ApproveUserFormWrapper
            handleSubmit={handleSubmit}
            selectedLicense={selectedLicense}
            onClickDebugPrint={() => {
              console.log("fprops.errors:", fprops.errors)
              setLoading(false)
            }}
            {...fprops}
          >
            <div className={classes.backButton}>
              <IconButton onClick={() => props.setUser(undefined)}>
                <KeyboardArrowLeft/>
              </IconButton>
              <Typography className={classes.goBackText} variant="subtitle2">
                Go Back
              </Typography>
            </div>
            <ViewParagraph title={"User Summary"}>
              <UserProfileDetails
                setSelectedLicense={setSelectedLicense}
                user={user}
                {...fprops}
              />
            </ViewParagraph>
            <Loading fixed loading={loading}/>
          </ApproveUserFormWrapper>
        )
      }}
      </Formik>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  setUser(a: any): void;
  searchUser(userId: string): void;
}

interface MutData3 {
  adminApproveUserLicense: UserMutationResponse;
}
interface MutVar3 {
  userId: string;
  licenseId: string;
  verified: boolean;
}



const styles = (theme: Theme) => createStyles({
  goBackText: {
    marginLeft: '0.5rem',
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
});


export default withStyles(styles)( UserProfileForm );



