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
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  Saved_Searches_Aggregate,
  Saved_Searches,
  BlankMutationResponse,
} from "typings/gqlTypes";
// components
import Typography from '@material-ui/core/Typography';
import ButtonLoading from "components/ButtonLoading";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SavedSearchItem from './SavedSearchItem';
import ExistingSavedSearches from "./ExistingSavedSearches";
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
// router
import { useRouter } from "next/router";
import AlignCenterLayout from "components/AlignCenterLayout";
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


export interface SelectOption<T=string> {
  label: string;
  value: T
}
// export interface SelectOptionGroup {
//   label: string;
//   value: T
// }


const ManageSaveSearchPage: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const snackbar = useSnackbar();

  const caliberOptionGroups = createCaliberOptionGroups(props.calibers)

  const categoriesDropdownOptions = [
    { id: undefined, slug: 'all', name: "All Categories" },
    ...(props.categories ?? []),
  ].map(c => createCategoryOption(c as any))

  const dealerStatesOptions = availableDealerStates
    .map(c => createDealerStateOption(c as any))

  const initialCaliber = caliberOptionGroups?.[0]?.options?.[0]
  const initialCategory = categoriesDropdownOptions?.[0]
  const initialDealerState = dealerStatesOptions?.[0]



  const [categorySlugGql, setCategorySlugGql] = React.useState(initialCategory)
  const [caliberGql, setCaliberGql] = React.useState(initialCaliber)
  const [dealerStateGql, setDealerStateGql] = React.useState(initialDealerState)


  const [insertSavedSearch, insertSavedSearchResponse] = useMutation<MData, MVar>(
    INSERT_SAVED_SEARCH, {
    variables: {
      searchTerm: undefined,
      categorySlug: undefined,
      caliber: undefined,
      dealerState: undefined,
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
            aggregate: cacheData?.getSavedSearchesByUser?.aggregate,
            nodes: [
              ...cacheData?.getSavedSearchesByUser?.nodes,
              insertSavedSearch
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
    },
    onError: (e) => {
      snackbar.enqueueSnackbar(
        `${e}`,
        { variant: "error" }
      )
    },
  })


  const formik = useFormik({
    initialValues: {
      searchTerm: "",
      categorySlug: categorySlugGql,
      caliber: caliberGql,
      dealerState: dealerStateGql,
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
          searchTerm: values.searchTerm,
          categorySlug: categorySlugGql?.value,
          caliber: caliberGql?.value,
          dealerState: dealerStateGql?.value,
        }
      })
    },
  });


  // console.log("dealerStates: ", props.dealerStates)
  // console.log("categories: ", props.categories)
  // console.log("calibers: ", props.calibers)
  // console.log("initialCaliber: ", initialCaliber)
  // console.log("caliberGql: ", caliberGql)
  // console.log("caliberOptionGroups: ", caliberOptionGroups)
  // console.log("formik.values: ", formik.values)
  // console.log("formik.errors: ", formik.errors)

  return (
    <AlignCenterLayout maxWidth={720} withRecommendations={false}>
      <form
        onSubmit={formik.handleSubmit}
        className={clsx(classes.saveSearchContainer)}
      >
        <div className={classes.flexCol}>
          <Typography variant="h4" className={classes.title}>
            Your Saved Searches
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Get notified when a new product matches your saved search
          </Typography>
        </div>


        {
          initialCaliber?.label &&
          <div className={classes.dropdownContainer}>

            <TextInputUnderline
              variant="outlined"
              value={formik.values.searchTerm}
              label={"Search Term"} // remove moving label
              autoComplete={"new-password"} // turn off
              onChange={(e) => {
                let s = e.target.value
                formik.setFieldValue("searchTerm", s)
              }}
              placeholder={"Enter a search term"}
              classes={{
                root: classes.textInputRoot,
              }}
              inputProps={{
                className: classes.textInputInput,
                focused: classes.textFocused,
              }}
            />

            <DropdownInput
              className={classes.dropdownComponent}
              stateShape={initialCategory}
              onChange={(option: SelectOption) => {
                if (!option.value) {
                  setCategorySlugGql(undefined)
                } else {
                  setCategorySlugGql(option)
                }
              }}
              options={categoriesDropdownOptions}
            />

            <DropdownInput
              className={classes.dropdownComponent}
              // menuIsOpen={true}
              stateShape={initialCaliber}
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
            />

            <DropdownInput
              className={classes.dropdownComponent}
              stateShape={initialDealerState}
              onChange={(option: SelectOption) => {
                if (!option.value) {
                  setDealerStateGql(undefined)
                } else {
                  setDealerStateGql(option)
                }
              }}
              options={dealerStatesOptions}
            />

          </div>
        }


        <div className={classes.flexCol}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Current Search Query
          </Typography>
          <SavedSearchItem
            onClickDelete={undefined}
            isHighlighted={true}
            searchTerm={formik.values.searchTerm}
            categorySlug={categorySlugGql?.value}
            caliber={caliberGql?.value}
            dealerState={dealerStateGql?.value}
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
          disabled={!process.browser || !formik.values?.searchTerm}
          onClick={() => {

            if (formik.errors?.searchTerm) {
              let errMsg = formik.errors?.searchTerm
              snackbar.enqueueSnackbar(
                `${errMsg}`,
                { variant: "error" }
              )
            }
          }}
        >
          { 'Save this Search' }
        </ButtonLoading>
      </form>

      <div className={classes.saveSearchContainer}>
        <ExistingSavedSearches/>
      </div>

    </AlignCenterLayout>
  )
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
    // label: d,
    // value: d,
    label: DealerStatesLabels[d],
    value: d,
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  calibers: Calibers[]
  categories: Categories[]
  dealerStates: DealerState[]
}

interface MData {
  insertSavedSearch: Saved_Searches
}
interface MVar {
  searchTerm: string
  categorySlug?: string
  caliber?: string
  dealerState?: string
}
interface QData {
  getSavedSearchesByUser: Saved_Searches_Aggregate
}
interface QVar {
  limit?: number
  offset?: number
}



const styles = (theme: Theme) => createStyles({
  saveSearchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    minWidth: 330,
    marginTop: '2rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius4x,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
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
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.ultramarineBlueDark, 0.9),
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
    borderRadius: '4px',
    // marginLeft: '0.5rem',
    // marginRight: '0.5rem',
    width: '100%',
    maxWidth: 300,
    marginBottom: "1rem",
    // height: 40,
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
