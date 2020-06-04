import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductVariant } from "typings/gqlTypes";
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
    isQuantityEnabled = false,
    quantity,
  } = props;

  const productVariant = selectedOption.value;

  return (
    <div className={classes.licenseContainer}>
      {
        ((variantOptions.length > 1) || isQuantityEnabled) &&
        <>
          {/* <Typography variant="subtitle2" className={classes.subtitle1}>
            License
          </Typography> */}
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
            {
              isQuantityEnabled && // seats
              <div className={classes.quantityMenu}>
                <Button
                  className={classes.seatsButton}
                  onClick={() => decreaseQuantity()}
                  variant="text"
                >
                  –
                </Button>
                <div className={classes.seatsNumber}>{`${quantity} seats`}</div>
                <Button
                  className={classes.seatsButton}
                  onClick={() => increaseQuantity()}
                  variant="text"
                >
                  +
                </Button>
              </div>
            }
            {/* <div style={{ flexGrow: 1 }}></div> */}
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
  isQuantityEnabled?: boolean;
  selectedOption: {
    label: string;
    value: ProductVariant;
  };
  variantOptions: {
    label: string;
    value: ProductVariant;
  }[];
  handleChangeVariantOption(
    selectedOption: { label: string, value: ProductVariant }
  ): void;
}


const buttonBackgroundColor = '#f6f6f6';

const selectStyles = {
  container: base => ({
    ...base,
    flex: 1,
    border: 'none',
    width: '140px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    // border: '1px solid #eaeaea',
    border: 'none',
    "&:focus": {
      border: 'none',
    },
    "&:hover": {
      border: 'none',
      cursor: "pointer",
    },
    boxShadow: 'none',
    background: buttonBackgroundColor,
    borderRadius: '4px',
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    fontSize: '0.8rem',
    // fontSize: '1rem',
    width: '100%',
  }),
  indicatorSeparator: styles => ({
    display:'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
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
};

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