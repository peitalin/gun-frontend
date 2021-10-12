import React from "react";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// // Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";

// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './styles';
// Graphql
import { useMutation } from "@apollo/client";
import { EDIT_DEALER, EDIT_DEALER_AS_ADMIN } from "queries/dealers-mutations";
// Typings
import { Dealer, UserMutationResponse, UserPrivate } from "typings/gqlTypes";
import { EditDealerInput, EditDealerAsAdminInput } from "typings"
// Components
import Loading from "components/Loading";
import EditDealerFields from "./EditDealerFields";
// Snackbar
import { useSnackbar } from "notistack";
// Material UI
import Typography from "@material-ui/core/Typography";
import ButtonLoading from "components/ButtonLoading";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// router
import { useRouter } from "next/router";



const EditDealerForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    dealer,
    editAsAdmin = false,
  } = props;

  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const [dealerEditAsAdmin, { loading: loading2 }] =
  useMutation<MutationData2, EditDealerAsAdminInput>(
    EDIT_DEALER_AS_ADMIN, {
    variables: {} as any,
    onCompleted: (data) => {
      // console.log('onCompleted dealer edit response ', data)
      snackbar.enqueueSnackbar(
        `Success! Edited dealer ${data?.editDealerAsAdmin?.id}.`,
        { variant: "success" }
      )
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(
        `Uh... ${JSON.stringify(error)}`,
        { variant: "error" }
      )
    }
  })

  const [dealerEdit, { loading }] =
  useMutation<MutationData, EditDealerInput>(
    EDIT_DEALER, {
    variables: {} as any,
    onCompleted: (data) => {
      // console.log('onCompleted dealer edit response ', data)
      snackbar.enqueueSnackbar(
        `Success! Edited dealer profile.`,
        { variant: "success" }
      )
      dispatch(Actions.reduxLogin.SET_USER({
        ...userRedux,
        dealer: data?.editDealer?.user?.dealer
      }))
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(
        `Uh... ${JSON.stringify(error)}`,
        { variant: "error" }
      )
    }
  })
  // console.log('dealr:", ', dealer)

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        name: dealer?.name ?? "",
        address: dealer?.address ?? "",
        city: dealer?.city ?? "",
        postCode: dealer?.postCode ?? "",
        state: dealer?.state ?? "",
        licenseNumber: dealer?.licenseNumber ?? "",
      }}
      validationSchema={validationSchemas.EditDealer}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        // Dispatch Apollo Mutation after validation
        if (editAsAdmin) {
          dealerEditAsAdmin({
            variables: {
              dealerId: dealer?.id,
              name: values.name,
              address: values.address,
              city: values.city,
              postCode: values.postCode,
              state: values.state,
              licenseNumber: values.licenseNumber,
            }
          }).then(res => {
            if (props.closeEditDealerModal) {
              props.closeEditDealerModal()
            }
          })
        } else {
          dealerEdit({
            variables: {
              name: values.name,
              address: values.address,
              city: values.city,
              postCode: values.postCode,
              state: values.state,
              licenseNumber: values.licenseNumber,
            }
          }).then(res => {
            if (props.closeEditDealerModal) {
              props.closeEditDealerModal()
            }
          })
        }

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
          <EditDealerFormWrapper
            classes={classes}
            onSubmit={handleSubmit}
            asModal={props.asModal}
            closeEditDealerModal={props.closeEditDealerModal}
            loading={loading || loading2}
            editAsAdmin={editAsAdmin}
          >
            <EditDealerFields
              title={props.title}
              dealer={dealer}
              {...fprops}
            />
            {
              (loading || loading2) &&
              <Loading fixed loading={loading} delay={"200ms"}/>
            }
          </EditDealerFormWrapper>
        )
      }}
    </Formik>
  )
}



const EditDealerFormWrapper: React.FC<FormWrapperProps> = (props) => {

  const {
    classes,
    onSubmit,
    editAsAdmin,
    loading = false,
  } = props;

  // const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={clsx(
      classes.formRoot,
      smUp ? classes.formBordersDesktop : classes.formBordersMobile
    )}>
      <div className={smUp ? classes.paperMarginDesktop : classes.paperMarginMobile}>
        {
          props.closeEditDealerModal &&
          <IconButton
            onClick={() => props.closeEditDealerModal()}
            className={classes.closeButton}
          >
            <ClearIcon/>
          </IconButton>
        }

        {
          editAsAdmin &&
          <div className={classes.backButton}>
            <IconButton onClick={() => router.back()}>
              <KeyboardArrowLeft/>
            </IconButton>
            <Typography className={classes.goBackText} variant="subtitle2">
              Go Back
            </Typography>
          </div>
        }

        <div className={classes.flexColMargin}>
          <Typography color={"primary"} variant="h3">
            Edit Your Dealer Profile
          </Typography>
          <br/>
        </div>

        <form onSubmit={onSubmit}>

          { props.children }

          <div className={classes.flexButtons}>
            <div className={classes.flexButtonItem}>
              <ButtonLoading
                type="submit" // this sets off Form submit
                variant={"contained"}
                color={"secondary"}
                onClick={() => {
                  //  type="submit" sets off the obSubmit handler above
                  console.log('submitting...')
                }}
                className={classes.button}
                replaceTextWhenLoading={true}
                loading={loading}
                disabled={loading}
                loadingIconColor={Colors.blue}
              >
                Save Changes
              </ButtonLoading>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
  dealer: Dealer;
  closeEditDealerModal?(): void;
  editAsAdmin?: boolean;
}

interface FormWrapperProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  asModal?: boolean;
  title?: string;
  closeEditDealerModal?(): void;
  loading?: boolean;
  editAsAdmin: boolean;
}

interface MutationData {
  editDealer: UserMutationResponse
}
interface MutationData2 {
  editDealerAsAdmin: Dealer
}

export default withStyles(styles)( EditDealerForm );

