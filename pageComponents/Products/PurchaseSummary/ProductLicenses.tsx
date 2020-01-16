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
    quantity,
  } = props;

  const productVariant = selectedOption.value;

  const totalFileSize = option(productVariant).files([]).reduce((acc, file) => {
    return acc + file.sizeInBytes
  }, 0)

  return (
    <div className={classes.licenseContainer}>
      <Typography variant="subtitle2" className={classes.subtitle1}>
        License
      </Typography>
      <div className={classes.variantSelector}>
        <Select
          instanceId={'product-page-license-select'}
          value={selectedOption}
          onChange={handleChangeVariantOption}
          options={variantOptions}
          styles={selectStyles}
          theme={theme => ({
            ...theme,
            width: '100%',
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#e2e2e2',
              primary: '#333333',
            }
          })}
        />
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
        <div style={{ flexGrow: 1 }}></div>
      </div>

      <Typography variant="subtitle2" className={classes.subtitle1}>
        What you get
      </Typography>
      <Tip classes={classes} bulletType={'tick'}>
        Instant Download
      </Tip>
      <Tip classes={classes} bulletType={'tick'}>
        {
          totalFileSize > 1000
          ? `${(totalFileSize/1000/1000).toFixed(2)} MB of files`
          : `${(totalFileSize/1000).toFixed(2)} KB of files`
        }
      </Tip>
    </div>
  )
}


const Tip: React.FC<TipProps> = ({ classes, bulletType, children }) => {

  const renderBullet = (bulletType: number | 'tick') => {
    switch (bulletType) {
      case 'tick':
        return (
          <Tick className={classes.bullet}
            size={25}
            color={Colors.green}
            disableBackground={true}
          />
        );
      default:
        return (
          <Avatar className={classes.numberPoint}>
            <Typography style={{ color: Colors.green }} variant="body2">
              {bulletType}
            </Typography>
          </Avatar>
        );
    }
  }

  return (
    <div className={classes.tip}>
      { renderBullet(bulletType) }
      <Typography color={"primary"} variant="body2">
        {children}
      </Typography>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  increaseQuantity(): void;
  decreaseQuantity(): void;
  quantity: number;
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
interface TipProps extends WithStyles<typeof styles> {
  bulletType: number | 'tick';
}


const buttonBackgroundColor = '#f6f6f6';

const selectStyles = {
  container: base => ({
    ...base,
    flex: 1,
    width: '100%',
    border: 'none',
    maxWidth: '200px',
    minWidth: '150px',
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
    fontFamily: '"Proxima Nova","Helvetica Neue","Segoe UI",Arial,sans-serif',
    fontSize: '0.8rem',
    width: '100%',
  }),
  indicatorSeparator: styles => ({
    display:'none'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: '"Proxima Nova","Helvetica Neue","Segoe UI",Arial,sans-serif',
      fontSize: '0.8rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      "&:hover": {
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      },
    };
  },
  menu: styles => ({
    ...styles,
    marginTop: '2px',
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  })
};

const styles = (theme: Theme) => createStyles({
  subtitle1: {
    marginTop: '1rem',
  },
  variantSelector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: '0rem 0rem',
    width: '100%',
  },
  button: {
    marginBottom: '0.5rem',
    width: '100%',
    minHeight: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  licenseContainer: {
  },
  // tips
  tipTitle: {
    marginBottom: '0rem',
  },
  bullet: {
    marginRight: '0.25rem',
  },
  tip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0rem',
  },
  numberPoint: {
    height: 15,
    width: 15,
    marginRight: '0.5rem',
    backgroundColor: 'rgba(200,200,200,0)',
    border: `2px solid ${Colors.green}`,
  },
  quantityMenu: {
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '0.5rem',
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
    width: 60,
  },
});

export default withStyles(styles)( ProductLicenses );