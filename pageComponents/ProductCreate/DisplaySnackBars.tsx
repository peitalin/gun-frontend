import * as React from "react";
import { oc as option } from "ts-optchain";
import { ApolloError } from "apollo-client";
import { MutationData } from "./ProductCreatePage";
import SnackBarA from "components/Snackbars/SnackbarA";


const DisplaySnackBars = ({
  state,
  setState,
  data,
  error,
}: DisplaySnackBarsProps) => {
  return (
    <>
      {
        option(data).createProduct.product.name() &&
        <SnackBarA
          open={data !== undefined && state.showSuccess}
          closeSnackbar={() => setState(s => ({ ...s, showSuccess: false}))}
          message={`Successfully created listing: ${data.createProduct.product.name}`}
          variant={"success"}
          autoHideDuration={5000}
        />
      }
      <SnackBarA
        open={error !== undefined && state.showError}
        closeSnackbar={() => setState(s => ({ ...s, showError: false}))}
        message={`Oh oh: ${JSON.stringify(error)}`}
        variant={"error"}
        autoHideDuration={5000}
      />
    </>
  )
}

export interface SnackState {
  showSuccess: boolean;
  showError: boolean;
  loading?: boolean;
}

export interface DisplaySnackBarsProps  {
  state: SnackState,
  setState: React.Dispatch<React.SetStateAction<SnackState>>
  data: MutationData,
  error: ApolloError,
}

export default DisplaySnackBars;
