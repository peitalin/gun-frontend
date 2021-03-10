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
import { EDIT_DEALER } from "queries/dealers-mutations";
// Typings
import { Dealers, UserPrivate } from "typings/gqlTypes";
import { EditDealerInput } from "typings"
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
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



const EditDealerForm: React.FC<ReactProps> = (props) => {

  const { classes, dealer } = props;
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const [dealerEdit, { data, loading, error }] =
  useMutation<MutationData, EditDealerInput>(
    EDIT_DEALER, {
    variables: {} as any,
    update: (cache, { data }: { data: MutationData }) => {
      const { editDealerProfile: { dealer } } = data;
      dispatch(Actions.reduxLogin.SET_USER({
        ...userRedux,
        dealer: dealer
      }))
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Success! Edited dealer profile.`,
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

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        name: dealer?.name,
        address: dealer?.address,
        city: dealer?.city,
        postCode: dealer?.postCode,
        state: dealer?.state,
        licenseNumber: dealer?.licenseNumber,
      }}
      validationSchema={validationSchemas.EditDealer}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        console.log("my dealerId", userRedux?.dealer?.id)
        // Dispatch Apollo Mutation after validation

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
          console.log('dealer edit response', res)
          if (props.closeEditDealerModal) {
            props.closeEditDealerModal()
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
          <EditDealerFormWrapper
            classes={classes}
            onSubmit={handleSubmit}
            asModal={props.asModal}
            closeEditDealerModal={props.closeEditDealerModal}
            loading={loading}
          >
            <EditDealerFields
              title={props.title}
              dealer={dealer}
              {...fprops}
            />
            { loading && <Loading fixed loading={loading} delay={"200ms"}/>}
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
    loading = false,
  } = props;
  // const dispatch = useDispatch();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={clsx(
      classes.formRoot,
      smUp ? classes.formBordersDesktop : classes.formBordersMobile
    )}>
      <div className={classes.maxWidth720}>
        <div className={smUp ? classes.paperMarginDesktop : classes.paperMarginMobile}>
          <div className={classes.flexColMargin}>
            <Typography color={"primary"} variant="h3">
              Edit Your Dealer Profile
            </Typography>
            <br/>
          </div>

          {
            props.closeEditDealerModal &&
            <IconButton
              onClick={() => props.closeEditDealerModal()}
              className={classes.closeButton}
            >
              <ClearIcon/>
            </IconButton>
          }

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
                  classes={{
                    label: classes.buttonText
                  }}
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
    </div>
  )
}

interface FormWrapperProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  asModal?: boolean;
  title?: string;
  closeEditDealerModal?(): void;
  loading?: boolean;
}

interface MutationData {
  editDealerProfile: { dealer: Dealers }
}

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
  dealer: Dealers;
  closeEditDealerModal?(): void;
}


export default withStyles(styles)( EditDealerForm );

