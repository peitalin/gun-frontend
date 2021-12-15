import React from 'react';
import { Theme } from "@mui/material/styles";

import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
// Typings
import { BorderRadius4x, BorderRadius, Colors, isThemeDark } from "layout/AppTheme";
import ErrorBounds from "components/ErrorBounds";
// Clear
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import ButtonLoading from "components/ButtonLoading";
import { formatGunLicenseExpiry } from "./utils";
//
import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/UserLicenses/EditUserLicenseForm/licenseUtils";

import DropdownInput from "components/Fields/DropdownInput";
import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
const MultiDropdownSelect = dynamic(() => import('components/Fields/MultiDropdownSelect'), {
  loading: () => <SelectTagsPlaceholder />,
  ssr: false
})
import { createOption } from "components/Fields/MultiDropdownSelect";

import dynamic from "next/dynamic";
import Loading from 'components/Loading';
const MuiPhoneNumber = dynamic(() => import("material-ui-phone-number"), {
  loading: () => <Loading/>,
  ssr: false,
})
// import { formatPhoneNumber } from "layout/Login/utils";

import HelpIcon from "components/Icons/HelpIcon";
import Tooltip from "@mui/material/Tooltip"
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const CreateLicense: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseExpiry: null,
    licenseCategory: [] as string[],
    licenseState: "",
  })

  React.useEffect(() => {
    return () => {
      setState({
        firstName: "",
        lastName: "",
        licenseNumber: "",
        licenseExpiry: null,
        licenseCategory: [],
        licenseState: "",
      })
    }
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    props.addUserLicense({
      firstName: state?.firstName,
      lastName: state?.lastName,
      licenseNumber: state.licenseNumber,
      licenseCategory: state.licenseCategory.join(", "),
      licenseExpiry: state.licenseExpiry,
      licenseState: state.licenseState,
    });
  }


  const [selectedDate, setSelectedDate] = React.useState<Date>(null);
  // must be null so initial date is empty

  const handleDateChange = (date) => {
    // console.log("incoming date:", date)
    setSelectedDate(date)
    let expiryDate = new Date(date)
    expiryDate.setHours(0)
    expiryDate.setSeconds(0)
    expiryDate.setMinutes(0)
    setState(s => ({ ...s, licenseExpiry: expiryDate }))
  };

  const { classes } = props;


  let licenseStateOptions = createLicenseStateSuggestions()
  // initial initialState
  let initialStateLicense = undefined
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)

  let licenseCategoryOptions = createLicenseCategorySuggestions(state.licenseState)

  const handleSetLicenseCategory = (options: SelectOption[]) => {
    let newCategories = (options ?? []).map(t => t.value)
    // Formik
    setState(s => ({ ...s, licenseCategory: newCategories }))
  }


  return (
    <ErrorBounds className={classes.outerContainer}>
      <div className={classes.paper}>

        <IconButton
          className={classes.clearButton}
          onClick={props.handleToggleModal}
          size="medium"
        >
          <ClearIcon/>
        </IconButton>

        <Typography className={classes.title} variant="h3">
          Add a License
        </Typography>

        <form className={classes.form}>
          <Typography className={classes.miniTitle} variant={"body1"}>
            License Details
          </Typography>

          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="first-name"
              autoComplete="given-name"
              value={state?.firstName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, firstName: e?.target?.value }))
              }}
            />
            <Tooltip title={
              `Please use the name on your firearm license.`
            }>
              <span>
                <HelpIcon className={classes.helpIcon}/>
              </span>
            </Tooltip>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              name="last-name"
              autoComplete="family-name"
              value={state?.lastName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, lastName: e?.target?.value }))
              }}
            />
          </FormControl>

          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="sign-up-email">Gun License Number</InputLabel>
            <Input
              name="gun-license-number"
              type={"string"}
              autoComplete="license-number"
              value={state.licenseNumber}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, licenseNumber: e?.target?.value }))
              }}
            />
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk={true}
                disableToolbar
                autoComplete={'new-password'} // disable autoComplete
                InputAdornmentProps={{
                  classes: { root: classes.dateLabel }
                }}
                inputProps={{
                  className: classes.dateInput
                }}
                variant="inline"
                format="DD/MM/YYYY"
                // margin="normal"
                id="date-picker-inline"
                label="License Expiry"
                value={selectedDate}
                maxDate={new Date("1/1/3000")}
                // defaultValue={null}
                // placeholder={"License expiry"}
                // emptyLabel="License expiry *"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <DropdownInput
              initialState={initialStateLicense}
              onChange={({ label, value }: SelectOption) => {
                console.log("label: ", label)
                // set dropdown object
                setLicenseState({ label, value })
                // then set it in state
                setState(s => ({ ...s, licenseState: value }))
              }}
              value={licenseState}
              options={licenseStateOptions}
              placeholder={"Gun License State"}
              label="" // remove moving label
              className={classes.textField}
              inputProps={{ style: { width: '100%' }}}
              // errorMessage={errors.licenseState}
              // touched={touched.licenseState}
            />
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <MultiDropdownSelect
              // disabled={loading}
              // loading={loading}
              initialTags={
                (state.licenseCategory ?? []).map(t => createOption(t))
              }
              options={licenseCategoryOptions}
              setTags={handleSetLicenseCategory}
              disableInitialValidationMessage={true}
              // errorMessage={formik.errors?.licenseCategory?.[0]}
              // touched={formik.touched?.licenseCategory?.[0]}
            />
          </FormControl>

          <ButtonLoading
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={props.buttonLoading}
            disabled={props.buttonLoading}
          >
            Create License
          </ButtonLoading>
        </form>


      </div>
    </ErrorBounds>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  addUserLicense(
    variables: {
      firstName?: string,
      lastName?: string
      licenseNumber: string,
      licenseExpiry: Date,
      licenseCategory: string,
      licenseState: string,
    }
  ): void;
  email?: string;
  handleToggleModal?(): void;
  buttonLoading?: boolean;
}


const styles = (theme: Theme) => createStyles({
  outerContainer: {
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginTop: '2rem',
    margin: '1rem',
    color: theme.palette.mode === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.uniswapGrey}`,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "2rem",
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.colors.uniswapDarkNavy
      : theme.colors.darkWhite,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: '320px',
  },
  submit: {
    marginTop: theme.spacing(1),
    height: 40,
    borderRadius: BorderRadius,
  },
  marginBottom: {
    marginBottom: '1rem',
  },
  clearButton: {
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  miniTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    marginTop: '2rem',
  },
  dateLabel: {
    "& button > span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyBlack,
      "&:hover": {
        fill: isThemeDark(theme)
          ? Colors.ultramarineBlue
          : Colors.ultramarineBlue,
      }
    }
  },
  dateInput: {
    fontSize: '0.9rem',
  },
  phoneNumberContainer: {
    position: "relative",
    width: '100%',
    marginTop: "0.5rem",
    "& > div": {
      width: '100%',
    }
  },
  helpIcon: {
    position: "absolute",
    right: '0rem',
    top: '0rem',
    cursor: "pointer"
  },
});

export default withStyles(styles)(CreateLicense);
