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
  Dealer,
  DealerMutationResponse,
  UserMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import Loading from "components/Loading";
import DealerProfileDetails from "./DealerProfileDetails";
// Components
import DeleteDealerFormWrapper from "./DeleteDealerFormWrapper";
import ViewParagraph from "../ViewerParagraph";
import SetDealerForUser from "./SetDealerForUser";

// Graphql
import { useMutation, useApolloClient } from "@apollo/client";
import {
  DELETE_DEALER,
  SET_DEALER_ID_FOR_USER,
  UNLINK_USERS_FOR_DEALER,
} from "queries/dealers-mutations";
import {
  GET_ALL_DEALERS,
} from "queries/dealers-queries";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
// Snackbar
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";



const DealerProfileForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    dealer,
  } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();
  const router = useRouter();

 // state
  const [loading, setLoading] = React.useState(false);


  const [
    deleteDealerMutation,
    deleteDealerMutationResponse
  ] = useMutation<MutData3, MutVar3>(
    DELETE_DEALER, {
    variables: {
      dealerId: undefined,
    },
    onCompleted: (data) => {
      console.log("dealer deletion response:", data);
      alert(JSON.stringify({ DELETED: data?.deleteDealerAsAdmin }));
      props.setDealer(undefined)
      router.replace("/gov/dealers")
    },
    update: (cache, { data }) => {
      let dealerToRemove = data?.deleteDealerAsAdmin?.dealer;
      if (props.setAllDealers) {
        props.setAllDealers([
          ...props.allDealers.filter(d => d?.id !== dealerToRemove?.id)
        ])
      }
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(
        `Dealer deletion failed with msg: ${error}`,
        { variant: "error" }
      )
    },
  })


  const setDealerForUser = async({ dealerUserIdOrEmail, dealerId }: {
    dealerUserIdOrEmail: string
    dealerId: string
  }) => {
    console.log("setting dealerUserIdOrEmail:", dealerUserIdOrEmail);
    const { errors, data } = await aClient.mutate<MutData2, MutVar2>({
      mutation: SET_DEALER_ID_FOR_USER,
      variables: {
        dealerUserIdOrEmail: dealerUserIdOrEmail,
        dealerId: dealerId,
      }
    });
    alert(JSON.stringify({ SET_DEALER: data?.setDealerIdForUser }));
    return data;
  }


  const unlinkUsersForDealer = async({ dealerId }: {
    dealerId: string
  }) => {
    console.log("unlinking users for dealerId:", dealerId);
    const { errors, data } = await aClient.mutate<MutData4, MutVar4>({
      mutation: UNLINK_USERS_FOR_DEALER,
      variables: {
        dealerId: dealerId,
      }
    });
    alert(JSON.stringify({ UNLINK_USERS_FOR_DEALER: data?.unlinkUsersForDealerId }));
    return data;
  }

  return (
    <>
      <Formik
        initialValues={{
          dealerId: dealer?.id,
        }}
        validationSchema={validationSchemas.DeleteDealer}
        onSubmit={(values, { setSubmitting }) => {
          console.log("not implemented")
          console.log('formik values: ', values);
          deleteDealerMutation({
            variables: {
              dealerId: dealer?.id
            }
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
            <DeleteDealerFormWrapper
              handleSubmit={handleSubmit}
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
                setLoading(false)
              }}
              {...fprops}
            >

              <Loading fixed loading={loading}/>

              <div className={classes.backButton}>
                <IconButton onClick={() => props.setDealer(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography className={classes.goBackText} variant="subtitle2">
                  Go Back
                </Typography>
              </div>

              <ViewParagraph title={"Dealer Summary"}>
                <DealerProfileDetails
                  dealer={dealer}
                  {...fprops}
                />
              </ViewParagraph>

            </DeleteDealerFormWrapper>
          )
        }}
      </Formik>

      <ViewParagraph title={"Set User for Dealer"}>
        <SetDealerForUser
          dealer={dealer}
          searchDealerAsAdmin={props.searchDealerAsAdmin}
          setDealerForUser={setDealerForUser}
          unlinkUsersForDealerId={unlinkUsersForDealer}
        />
      </ViewParagraph>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  dealer: Dealer;
  setDealer(a: any): void;
  setAllDealers(d: Dealer[]): void
  allDealers: Dealer[]
  searchDealerAsAdmin(dealerId: string): void;
}

export interface MutData2 {
  setDealerIdForUser: UserMutationResponse;
}
interface MutVar2 {
  dealerId: string;
  dealerUserIdOrEmail: string;
}

interface MutData3 {
  deleteDealerAsAdmin: DealerMutationResponse;
}
interface MutVar3 {
  dealerId: string;
}

export interface MutData4 {
  unlinkUsersForDealerId: DealerMutationResponse;
}
interface MutVar4 {
  dealerId: string;
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


export default withStyles(styles)( DealerProfileForm );



