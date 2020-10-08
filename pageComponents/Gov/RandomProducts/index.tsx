import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Graphql
import { gql, useApolloClient, useMutation } from '@apollo/client';
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Validation
import RandomProductsFormik from "./RandomProductsFormik";
import FieldsConfigOptions from "./FieldsConfigOptions";
import { useLazyQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import {
  CreateProductsConfig,
  ProductPrivate,
} from "typings/gqlTypes";



const RandomProducts = (props: ReactProps) => {

  const { classes } = props;

  const client = useApolloClient();
  const snackbar = useSnackbar();

  const [genRandomProducts, { data, loading, error }] = useMutation<MutData, MutVars>(
    GENERATE_RANDOM_PRODUCTS, {
    variables: {
      config: {
        count: 1,
        alwaysPublish: true,
        alwaysFewestPreviews: false,
        alwaysGreatestPreviews: false,
      }
    },
  });


  return (
    <RandomProductsFormik>
      {({ fprops }) => {

        let {
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

        // console.log('values', values)

        return (
          <div className={classes.root}>

            <FieldsConfigOptions
              {...fprops}
            />

            <ButtonLoading
              type="submit" // this sets off Form submit
              // disabled={!fprops.isValid}
              variant={"outlined"}
              color={"primary"}
              style={{
                width: '280px',
                height: '36px',
              }}
              loading={loading}
              onClick={async() => {

                const config: CreateProductsConfig = {
                  count: fprops.values.count,
                  alwaysPublish: fprops.values.alwaysPublish,
                  alwaysFewestPreviews: fprops.values.alwaysFewestPreviews,
                  alwaysGreatestPreviews: fprops.values.alwaysGreatestPreviews,
                };

                snackbar.enqueueSnackbar(
                  `generating ${fprops.values.count} products...`,
                  { variant: "info" }
                )

                let { data } = await genRandomProducts({
                  variables: {
                    config: config
                  }
                })

                console.log("PRODUCTS: ", data)
                snackbar.enqueueSnackbar(
                  `Created ${data.generateRandomProducts.length} products successfully`,
                  { variant: "success" }
                )
                // storeProducts.set(storeId, products);
                // allProducts.push(...products);
              }}
            >
              Create Random User + Products
            </ButtonLoading>
          </div>
        )
      }}
    </RandomProductsFormik>
  )
}

export const GENERATE_RANDOM_PRODUCTS = gql`
  mutation generateRandomProducts(
    $config: CreateProductsConfig
  ) {
    generateRandomProducts(config: $config) {
      id
    }
  }
`;

interface MutData {
  generateRandomProducts: ProductPrivate[]
}
interface MutVars {
  config: CreateProductsConfig
}



interface ReactProps extends WithStyles<typeof styles> {
  onSubmit?(args: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});


export default withStyles(styles)( RandomProducts );



