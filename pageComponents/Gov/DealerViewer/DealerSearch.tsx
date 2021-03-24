import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
// Utils Components
import ErrorBounds from "components/ErrorBounds";


const DealerSearch: React.FC<ReactProps> = (props) => {

  const {
    classes,
    dealerIdOrLicenseNumber,
    setDealerIdOrLicenseNumber,
    searchDealerAsAdmin,
    loading,
    errorMsg,
  } = props;

  return (
    <ErrorBounds className={clsx(classes.searchRoot)}>
      <Typography variant="h4">
        View Dealers
      </Typography>

      <div className={clsx(classes.flexRow, classes.section)}>
        <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Lookup Dealer ID or License Number:
        </Typography>
        <TextInput
          name="dealerId"
          placeholder="e.g. dealer_xxxxxxxxxxxxxx"
          className={classes.textField}
          value={dealerIdOrLicenseNumber}
          onChange={(e) => setDealerIdOrLicenseNumber(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />
        <Button
          className={classes.searchDealerAsAdminButton}
          variant={"outlined"}
          color={"primary"}
          onClick={() => searchDealerAsAdmin(dealerIdOrLicenseNumber)}
        >
          Find User
        </Button>
        {
          errorMsg &&
          <Typography color={"primary"} variant="subtitle1" gutterBottom>
            {errorMsg}
          </Typography>
        }
      </div>
      {props.children}
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setDealerIdOrLicenseNumber(dealerIdOrLicenseNumber: string): void;
  dealerIdOrLicenseNumber: string;
  searchDealerAsAdmin(dealerIdOrLicenseNumber: string): void;
  errorMsg: string;
  loading: boolean;
}


const styles = (theme: Theme) => createStyles({
  searchRoot: {
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  searchDealerAsAdminButton: {
    padding: "0.5rem 1rem",
    width: '100%',
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.blue}`,
    "&:hover": {
      border: `1px solid ${Colors.green}`,
    },
  },
  textField: {
    marginBottom: '0.5rem',
  },
});


export default withStyles(styles)( DealerSearch );



