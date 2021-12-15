import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  SavedSearchesConnection,
  Saved_Searches,
  BlankMutationResponse,
} from "typings/gqlTypes";
// components
import Typography from '@mui/material/Typography';
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SavedSearchItem from './SavedSearchItem';
// Snackbar
import { useSnackbar } from "notistack";
import {
  INSERT_SAVED_SEARCH,
  DELETE_SAVED_SEARCH,
} from "queries/saved-search-mutations";
import {
  GET_SAVED_SEARCHES_BY_USER,
} from "queries/saved-search-queries";
// Category
import { Categories, Calibers, DealerState } from "typings/gqlTypes";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
// Validation
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';

// import { SelectOption } from "typings";
import DropdownInput from "components/Fields/DropdownInput";
import TextInputUnderline from "components/Fields/TextInputUnderline";
import {
  DealerStatesLabels,
  availableDealerStates,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/DealerStatesMenu"
import {
  createCaliberOption,
  createCaliberOptionGroups,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/CaliberMenu"




const ManageSaveSearchPage: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const snackbar = useSnackbar();

  // const caliberOptionGroups = createCaliberOptionGroups(props.calibers)

  const categoriesDropdownOptions = [
    { id: undefined, slug: 'all', name: "All Categories" },
    ...(props.categories ?? []),
  ].map(c => createCategoryOption(c as any))

  const dealerStatesOptions = availableDealerStates
    .map(c => createDealerStateOption(c as any))

  // const initialCaliber = caliberOptionGroups?.[0]?.options?.[0]
  const initialCategory = categoriesDropdownOptions?.[0]
  const initialDealerState = dealerStatesOptions?.[0]


  const [categorySlugGql, setCategorySlugGql] = React.useState(initialCategory)
  const [dealerStateGql, setDealerStateGql] = React.useState(initialDealerState)

  const [makeGql, setMakeGql] = React.useState(undefined)
  const [modelGql, setModelGql] = React.useState(undefined)
  const [caliberGql, setCaliberGql] = React.useState(undefined)


  const [insertSavedSearch, insertSavedSearchResponse] = useMutation<MData, MVar>(
    INSERT_SAVED_SEARCH, {
    variables: {
      categorySlug: undefined,
      dealerState: undefined,
      make: undefined,
      model: undefined,
      caliber: undefined,
    },
    update: (cache, { data: { insertSavedSearch }}) => {

      const cacheData = cache.readQuery<QData, QVar>({
        query: GET_SAVED_SEARCHES_BY_USER,
        variables: {},
      })
      console.log("CACHE DATA: ", cacheData)

      cache.writeQuery({
        query: GET_SAVED_SEARCHES_BY_USER,
        variables: {},
        data: {
          getSavedSearchesByUser: {
            __typename: cacheData?.getSavedSearchesByUser?.__typename,
            totalCount: cacheData?.getSavedSearchesByUser?.totalCount,
            edges: [
              ...cacheData?.getSavedSearchesByUser?.edges,
              { node: insertSavedSearch }
            ]
          }
        },
      })
    },
    onCompleted: () => {
      snackbar.enqueueSnackbar(
        `Search saved successfully.`,
        { variant: "success" }
      )
      if (props.closeModal) {
        props.closeModal()
      }
    },
    onError: (e) => {
      snackbar.enqueueSnackbar(
        `${e}`,
        { variant: "error" }
      )
      if (props.closeModal) {
        props.closeModal()
      }
    },
  })


  const formik = useFormik({
    initialValues: {
      categorySlug: categorySlugGql,
      dealerState: dealerStateGql,
      make: makeGql,
      model: modelGql,
      caliber: caliberGql,
    },
    validationSchema: validationSchemas.SaveSearch,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Saving search`,
        { variant: "info" }
      )
      // console.log("formik onSubmit, searchTerm: ", values.searchTerm)
      await insertSavedSearch({
        variables: {
          categorySlug: categorySlugGql?.value,
          dealerState: dealerStateGql?.value,
          make: values.make,
          model: values.model,
          caliber: values.caliber,
        }
      })
    },
  });

  let disabledButton = !formik?.values.make
    && !formik?.values.model
    && !formik?.values.caliber


  // console.log("dealerStates: ", props.dealerStates)
  // console.log("categories: ", props.categories)
  // console.log("calibers: ", props.calibers)
  // console.log("initialCaliber: ", initialCaliber)
  // console.log("caliberGql: ", caliberGql)
  // console.log("caliberOptionGroups: ", caliberOptionGroups)
  // console.log("formik.values: ", formik.values)
  // console.log("formik.errors: ", formik.errors)

  return (
    <form onSubmit={formik.handleSubmit} className={classes.formContainer}>

      <IconButton
        className={classes.closeIcon}
        onClick={props.closeModal}
        size={"medium"}
      >
        <ClearIcon/>
      </IconButton>

      <div className={classes.flexCol}>
        <Typography variant="h4" className={classes.title}>
          Create a Saved Search
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Get notified when a new product matches your search
        </Typography>
      </div>

      <div className={classes.dropdownContainer}>

        <TextInputUnderline
          id={"ss-make"}
          variant="outlined"
          value={formik.values.make}
          label={"Make"} // remove moving label
          autoComplete={"new-password"} // turn off
          onChange={(e) => {
            let s = e.target.value
            formik.setFieldValue("make", s)
          }}
          placeholder={"Enter a search term for make"}
          classes={{
            root: classes.textInputRoot,
          }}
          inputProps={{
            className: classes.textInputInput,
            focused: classes.textFocused,
          }}
        />

        <TextInputUnderline
          id={"ss-model"}
          variant="outlined"
          value={formik.values.model}
          label={"Model"} // remove moving label
          autoComplete={"new-password"} // turn off
          onChange={(e) => {
            let s = e.target.value
            formik.setFieldValue("model", s)
          }}
          placeholder={"Enter a search term for model"}
          classes={{
            root: classes.textInputRoot,
          }}
          inputProps={{
            className: classes.textInputInput,
            focused: classes.textFocused,
          }}
        />

        <TextInputUnderline
          id={"ss-caliber"}
          variant="outlined"
          value={formik.values.caliber}
          label={"Caliber"} // remove moving label
          autoComplete={"new-password"} // turn off
          onChange={(e) => {
            let s = e.target.value
            formik.setFieldValue("caliber", s)
          }}
          placeholder={"Enter a search tem for caliber"}
          classes={{
            root: classes.textInputRoot,
          }}
          inputProps={{
            className: classes.textInputInput,
            focused: classes.textFocused,
          }}
        />

        {/* <DropdownInput
          className={classes.dropdownComponent}
          // menuIsOpen={true}
          initialState={initialCaliber}
          onChange={(option: SelectOption) => {
            console.log("SELECT CALIBER OPTION: ", option)
            if (!option?.value) {
              setCaliberGql(undefined)
            } else {
              setCaliberGql(option)
            }
          }}
          options={caliberOptionGroups}
          placeholder={initialCaliber}
        /> */}

        {/* <DropdownInput
          className={classes.dropdownComponent}
          initialState={initialDealerState}
          onChange={(option: SelectOption) => {
            if (!option.value) {
              setDealerStateGql(undefined)
            } else {
              setDealerStateGql(option)
            }
          }}
          options={dealerStatesOptions}
        /> */}
      </div>


      <div className={classes.flexCol}>
        <Typography variant="body1" className={classes.body1}>
          You'll see products on this page
          if an uploaded product matches your search
        </Typography>
        <SavedSearchItem
          onClickDelete={undefined}
          isHighlighted={true}
          categorySlug={categorySlugGql?.value}
          make={formik.values.make}
          model={formik.values.model}
          caliber={formik.values.caliber}
          dealerState={dealerStateGql?.value}
          loading={insertSavedSearchResponse?.loading}
        />
      </div>

      <ButtonLoading
        type="submit" // submits formik
        className={classes.insertSaveSearchButton}
        style={{ }}
        variant={"contained"}
        loadingIconColor={Colors.cream}
        replaceTextWhenLoading={true}
        loading={insertSavedSearchResponse?.loading}
        disabled={!process.browser || disabledButton}
        onClick={() => {
          // submits formik
        }}
      >
        { 'Save this Search' }
      </ButtonLoading>
    </form>
  )
}


export interface SelectOption<T=string> {
  label: string;
  value: T
}
export const createCategoryOption = (c: {
  id: string,
  slug: string,
  name: string
}): SelectOption => {
  return {
    label: c.name,
    value: c.slug,
  }
}
export const createDealerStateOption = (d: DealerState): SelectOption => {
  return {
    label: DealerStatesLabels[d],
    value: d,
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  calibers: Calibers[]
  categories: Categories[]
  dealerStates: DealerState[]
  closeModal(): void;
}

interface MData {
  insertSavedSearch: Saved_Searches
}
interface MVar {
  categorySlug?: string
  dealerState?: string
  make?: string
  model?: string
  caliber?: string
}
interface QData {
  getSavedSearchesByUser: SavedSearchesConnection
}
interface QVar {
  limit?: number
  offset?: number
}



const styles = (theme: Theme) => createStyles({
  formContainer: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    padding: '2rem 1rem 1rem 1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '0.5rem',
    width: '100%',
  },
  title: {
    marginTop: "1.25rem",
    fontSize: "1.25rem",
    marginBottom: '0.5rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    fontSize: "1rem",
    marginTop: '1rem',
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
  },
  insertSaveSearchButton: {
    width: 160,
    height: 40,
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: BorderRadius4x,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(Colors.purple, 0.9)
        : alpha(Colors.ultramarineBlueDark, 0.9),
    }
  },
  dropdownContainer: {
    width: '100%',
    display: 'flex',
    marginTop: '1rem',
    marginBottom: '1rem',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownComponent: {
    width: '100%',
    maxWidth: 300,
    marginBottom: "1rem",
  },
  textInputRoot: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius2x,
    // marginLeft: '0.5rem',
    // marginRight: '0.5rem',
    width: '100%',
    maxWidth: 300,
    marginBottom: "1rem",
    // height: 40,
  },
  closeIcon: {
    position: "absolute",
    top: '0rem',
    right: '0rem',
  },
  body1: {
    fontSize: '1rem',
    maxWidth: 300,
    textAlign: "center",
  },
  textInputInput: {
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // height: 40,
    padding: '0.72rem',
    borderRadius: '4px',
    fontSize: '1rem',
    minWidth: 220,
  },
  textFocused: {
    outline: 'none',
  },
});


export default withStyles(styles)( ManageSaveSearchPage );
