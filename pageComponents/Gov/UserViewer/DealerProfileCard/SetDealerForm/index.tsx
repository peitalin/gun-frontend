import React from "react";
import clsx from "clsx";
// Styles
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius,
  BorderRadius2x,
  BoxShadows,
  Gradients
} from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
// Validation
import { validationSchemas } from "utils/validation";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// Graphql
import { GET_ALL_DEALERS } from "queries/dealers-queries";
import {
  CREATE_DEALER_FOR_USER,
  EDIT_DEALER,
  SET_DEALER_ID_FOR_USER,
} from "queries/dealers-mutations";
import { useQuery, useMutation } from '@apollo/client';
// Typings
import { Dealers, UserMutationResponse } from "typings/gqlTypes";
import ChooseDealerDropdown from "./ChooseDealerDropdown";
import InputNewDealer from "./InputNewDealer";
// Snackbar
import { useSnackbar } from "notistack";



const SetDealer = (props: ReactProps) => {

  const {
    classes,
    defaultChooseDealer = true,
  } = props;

  const snackbar = useSnackbar();
  const [chooseDealer, setChooseDealer] = React.useState(defaultChooseDealer);

  // Apollo Graphql
  const [
    createDealerForUser,
    createDealerForUserResponse,
  ] = useMutation<MutData1, MutVar1>(
    CREATE_DEALER_FOR_USER, {
    variables: {
      dealerUserId: props.dealerUserId,
      name: "",
      address: "",
      city: "",
      postCode: "",
      state: "",
      licenseNumber: "",
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(
        `Error in createDealerForUser()`,
        { variant: "error" }
      )
      alert(JSON.stringify(error))
    },
    onCompleted: (data) => {
      console.log("createDealerForUser response: ", data)
      props.searchUser(props.dealerUserId)
      snackbar.enqueueSnackbar(
        `Created dealer profile`,
        { variant: "success" }
      )
    }
  })

  const [
    setDealerForUser,
    setDealerForUserResponse,
  ] = useMutation<MutData2, MutVar2>(
    SET_DEALER_ID_FOR_USER, {
    variables: {
      dealerUserId: props.dealerUserId,
      dealerId: undefined,
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(
        `Error in setDealerForUser()`,
        { variant: "error" }
      )
      alert(JSON.stringify(error))
    },
    onCompleted: (data) => {
      console.log("setDealerForUser response: ", data)
      props.searchUser(props.dealerUserId)
      snackbar.enqueueSnackbar(
        `Linked dealer profile`,
        { variant: "success" }
      )
    }
  })

  const {
    loading,
    error,
    data
  } = useQuery<QueryData, null>(GET_ALL_DEALERS)

  const dealers = (data?.getAllDealers ?? [])
      .filter(c => !!c && !!c.name)

  // console.log("dealerId: ", fprops.values.dealerId)
  // console.log("dealer: ", fprops.values.dealer)

  return (
    <Formik
      initialValues={{
        dealerId: undefined,
        dealer: {
          licenseNumber: undefined,
          name: undefined,
          address: undefined,
          city: undefined,
          state: undefined,
          postCode: undefined,
        }
      }}
      validationSchema={validationSchemas.CreateDealer}
      onSubmit={(values, { setSubmitting, resetForm }) => {

        console.log("formik values: ", values)

        if (values.dealer?.licenseNumber && values.dealer?.name) {
          createDealerForUser({
            variables: {
              dealerUserId: props.dealerUserId,
              licenseNumber: values?.dealer?.licenseNumber,
              name: values?.dealer?.name,
              address: values?.dealer?.address,
              city: values?.dealer?.city,
              state: values?.dealer?.state,
              postCode: values?.dealer?.postCode,
            }
          })
          snackbar.enqueueSnackbar(
            `Creating dealer for ${props.dealerEmail}`,
            { variant: "info" }
          )

        } else {

          setDealerForUser({
            variables: {
              dealerId: values.dealerId,
              dealerUserId: props.dealerUserId,
            }
          })
          if (values.dealerId) {
            snackbar.enqueueSnackbar(
              `Linking ${props.dealerEmail}`,
              { variant: "info" }
            )
          } else {
            snackbar.enqueueSnackbar(
              `Unlinking ${props.dealerEmail}`,
              { variant: "info" }
            )
          }
        }
        //
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
          <div className={clsx(classes.dealerFormRoot)}>
            <form className={classes.formContainer} onSubmit={handleSubmit}>

              <div className={classes.titleContainer}>
                <Typography className={classes.title} variant="subtitle1">
                  {
                    chooseDealer
                    ? "Set dealer"
                    : "Create and link new dealer"
                  }
                </Typography>
                <div className={classes.dontSeeDealerLink}
                  onClick={() => {
                    // currently choosing dealer from menu, switching to inputing dealer
                    if (chooseDealer) {
                      // clear chosen DealerId
                      fprops.setFieldValue("dealerId", undefined)
                      setChooseDealer(s => false)
                    } else {
                      // clear New Dealer inputs
                      fprops.setFieldValue("dealer", {})
                      setChooseDealer(s => true)
                    }
                  }}
                >
                  {
                    chooseDealer
                    ? "Or create a new dealer"
                    : "Or link a dealer"
                  }
                </div>
              </div>

              <FormGroup row
                className={clsx(classes.formFields)}
              >
                {
                  chooseDealer
                  ? <ChooseDealerDropdown dealers={dealers} {...fprops}/>
                  : <InputNewDealer dealers={dealers} {...fprops}/>
                }
                <Button
                  className={classes.buttonBlue}
                  type="submit" // this sets off Form submit
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => {
                    console.log('button clicked.')
                  }}
                >
                  {
                    chooseDealer
                      ? `Link Dealer to User`
                      : `Create New Dealer`
                  }
                </Button>

              </FormGroup>
            </form>
          </div>
        )
      }}
    </Formik>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  dealerUserId: string
  dealerEmail: string
  defaultChooseDealer ?: boolean
  searchUser(userId: string): void;
}
interface QueryData {
  getAllDealers: Dealers[]
}

interface MutVar1 {
  dealerUserId: string
  name: string
  address: string
  city: string
  postCode: string
  state: string
  licenseNumber: string
}
interface MutVar2 {
  dealerUserId: string
  dealerId: string
}

interface MutData1 {
  createDealerForUser: UserMutationResponse;
}
interface MutData2 {
  setDealerForUser: UserMutationResponse;
}





export const styles = (theme: Theme) => createStyles({
  dealerFormRoot: {
    position: 'relative',
    marginTop: '2rem',
    width: '100%',
  },
  formContainer: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formFields: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    maxWidth: 500,
  },
  title: {
    textAlign: "center",
  },
  titleContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  dontSeeDealerLink: {
    color: Colors.secondary,
    textAlign: "center",
    width: "100%",
    marginTop: "0.5rem",
    "&:hover": {
      cursor: "pointer",
      color: Colors.secondaryBright,
    }
  },
  buttonBlue: {
    marginTop: '2rem',
    maxWidth: 250,
    color: Colors.cream,
    backgroundColor: Colors.secondary,
    border: `1px solid ${Colors.secondary}`,
    "&:hover": {
      border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.secondaryBright,
    }
  },
})

export default withStyles(styles)( SetDealer );








