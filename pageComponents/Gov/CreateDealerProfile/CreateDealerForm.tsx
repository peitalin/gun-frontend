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
import { CREATE_NEW_DEALER } from "queries/dealers-mutations";
// Typings
import { Dealer, DealerMutationResponse, UserPrivate } from "typings/gqlTypes";
import { EditDealerInput } from "typings"
// Components
import Loading from "components/Loading";
import CreateDealerFields from "./CreateDealerFields";
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



const CreateDealerForm: React.FC<ReactProps> = (props) => {

  const { classes, dealer } = props;
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const [createNewDealer, { data, loading, error }] =
  useMutation<MutationData, EditDealerInput>(
    CREATE_NEW_DEALER, {
    variables: {} as any,
    onCompleted: (data) => {
      // console.log('onCompleted dealer edit response ', data)
      snackbar.enqueueSnackbar(
        `Success! Created new dealer.`,
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
  // console.log('dealr:", ', dealer)

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        name: "",
        address: "",
        city: "",
        postCode: "",
        state: "",
        licenseNumber: "",
      }}
      validationSchema={validationSchemas.CreateDealer}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        // Dispatch Apollo Mutation after validation

        createNewDealer({
          variables: {
            name: values.name,
            address: values.address,
            city: values.city,
            postCode: values.postCode,
            state: values.state,
            licenseNumber: values.licenseNumber,
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
          <CreateDealerFormWrapper
            classes={classes}
            onSubmit={handleSubmit}
            asModal={props.asModal}
            loading={loading}
          >
            <CreateDealerFields
              title={props.title}
              dealer={dealer}
              {...fprops}
            />
            { loading && <Loading fixed loading={loading} delay={"200ms"}/>}
          </CreateDealerFormWrapper>
        )
      }}
    </Formik>
  )
}



const CreateDealerFormWrapper: React.FC<FormWrapperProps> = (props) => {

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
      <div className={smUp ? classes.paperMarginDesktop : classes.paperMarginMobile}>
        <div className={classes.flexColMargin}>
          <Typography color={"primary"} variant="h3">
            Create a Dealer Profile
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
                Create New Dealer
              </ButtonLoading>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

interface FormWrapperProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  asModal?: boolean;
  title?: string;
  loading?: boolean;
}

interface MutationData {
  createNewDealer: DealerMutationResponse
}

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
  dealer: Dealer;
}


export default withStyles(styles)( CreateDealerForm );

