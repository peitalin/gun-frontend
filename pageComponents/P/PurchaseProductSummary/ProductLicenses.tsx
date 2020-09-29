import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Variants } from "typings/gqlTypes";
// Selector component
import Select from 'react-select';
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// Icons
import Tick from "components/Icons/Tick";
import Button from "@material-ui/core/Button";



const ProductLicenses = (props: ReactProps) => {

  const {
    classes,
    selectedOption,
    handleChangeVariantOption,
    variantOptions,
    decreaseQuantity,
    increaseQuantity,
    quantity,
  } = props;

  const productVariant = selectedOption.value;

  return (
    <div className={classes.licenseContainer}>
      {
        (variantOptions.length > 1) &&
        <>
          <div className={classes.variantSelector}>
            {
              (variantOptions.length > 1) &&
              <div style={{ marginRight: '0.5rem' }}>
                <Select
                  instanceId={'product-page-license-select'}
                  value={selectedOption}
                  onChange={handleChangeVariantOption}
                  options={variantOptions}
                  styles={selectStyles}
                  theme={theme => ({
                    ...theme,
                    width: '100%',
                    minWidth: '160px',
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#e2e2e2',
                      primary: '#333333',
                    }
                  })}
                />
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  increaseQuantity(): void;
  decreaseQuantity(): void;
  quantity: number;
  selectedOption: {
    label: string;
    value: Product_Variants;
  };
  variantOptions: {
    label: string;
    value: Product_Variants;
  }[];
  handleChangeVariantOption(
    selectedOption: { label: string, value: Product_Variants }
  ): void;
}


const buttonBackgroundColor = '#f6f6f6';

export const selectStyles = ({ width }: { width?: any }) => ({
  container: base => ({
    ...base,
    flex: 1,
    border: 'none',
    width: width || '175px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  control: styles => ({
    ...styles,
    // border: '1px solid #eaeaea',
    border: 'none',
    boxShadow: 'none',
    // background: buttonBackgroundColor,
    backgroundColor: Colors.dropDownGrey,
    '&:hover': {
      border: 'none',
      cursor: "pointer",
      backgroundColor: Colors.dropDownGreyHover,
    },
    "&:focus": {
      border: 'none',
    },
    borderRadius: '4px',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    fontSize: '0.9rem',
    color: Colors.darkGrey,
    // fontSize: '1rem',
    width: '100%',
  }),
  singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    color: Colors.darkGrey,
  }),
  indicatorSeparator: styles => ({
    display:'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? Colors.charcoal
        : isFocused
          ? Colors.lightGrey
          : Colors.dropDownGrey,
      fontFamily: '"Helvetica Neue",Arial,sans-serif',
      fontSize: '1rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      "&:hover": {
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      },
    };
  },
  menu: styles => ({
    ...styles,
    zIndex: 10,
    marginTop: '2px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  })
});

const styles = (theme: Theme) => createStyles({
  subtitle1: {
    marginBottom: '1rem',
    fontWeight: 500,
  },
  variantSelector: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: '0rem 0rem',
    width: '100%',
    // maxWidth: '250px',
  },
  button: {
    marginBottom: '0.5rem',
    width: '100%',
    minHeight: 40,
  },
  licenseContainer: {
    marginTop: '0rem',
    zIndex: 20,
    position: "relative",
  },
  quantityMenu: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    background: buttonBackgroundColor,
  },
  seatsButton: {
    fontSize: '1.2rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.secondaryBright,
    },
  },
  seatsNumber: {
    margin: "0.25rem",
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
});

export default withStyles(styles)( ProductLicenses );