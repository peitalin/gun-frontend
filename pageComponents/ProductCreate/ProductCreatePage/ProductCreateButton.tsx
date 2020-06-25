import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from '../commonStyles';
import clsx from "clsx";
// Typings
import { Product, Connection } from "typings/gqlTypes";
import { ProductCreateInputFrontEnd } from "typings";
// Material UI
import ButtonLoading from "components/ButtonLoading";
import Typography from "@material-ui/core/Typography";
// Utility Components
import ErrorBounds from "components/ErrorBounds";
// Validation
import { FormikErrors } from 'formik';



const ProductCreateButton = (props: ReactProps) => {

  const {
    errors,
    postInstantly = true,
    disabled = true,
  } = props;

  return (
    <ErrorBounds className={clsx(
      props.classes.createProductButtonContainer,
      props.classes.flexButtonItem
    )}>
      <ButtonLoading
        type="submit"
        style={{
          width: props.width || '150px',
          height: 40,
        }}
        variant={postInstantly ? "contained" : "outlined"}
        color={postInstantly ? "secondary" : "primary"}
        // loadingIconColor={Colors.lightGrey}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={props.loading}
        disabled={!process.browser || disabled}
        // disabled={disabled}
        onClick={props.onClick}
        className={props.classes.button}
      >
        { postInstantly ? 'Post Instantly' : 'Save Draft' }
      </ButtonLoading>
        {/* <Typography variant="caption" className={props.classes.formIncomplete}>
        {
          (Object.keys(errors).length > 0)
            ? <span> Form is incomplete </span>
            : <span style={{ opacity: 0 }}></span>
        }
        </Typography> */}
    </ErrorBounds>
  )
};


interface ReactProps extends WithStyles<typeof styles> {
  postInstantly: boolean;
  disabled: boolean;
  loading?: boolean;
  errors: FormikErrors<ProductCreateInputFrontEnd>
  type?: string;
  width?: number | string;
  // onClick(e: React.FormEvent<HTMLFormElement>): void;
  onClick?(e: any): void;
}

export default ProductCreateButton;


