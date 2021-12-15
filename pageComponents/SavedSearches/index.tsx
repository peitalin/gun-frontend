
import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  Gradients,
  isThemeDark,
  BorderRadius4x,
} from "layout/AppTheme";
// Typings
import { Categories, Calibers } from "typings/gqlTypes";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// components
import ButtonLoading from "components/ButtonLoading";
import Dialog from "@material-ui/core/Dialog";
import ManageSaveSearchPage from './ManageSaveSearchPage';
import ExistingSavedSearches from "./ExistingSavedSearches";
import SearchHits from "./SearchHits";
import AlignCenterLayout from "components/AlignCenterLayout";

// Categories, Calibers, Dealer States
import { GET_CATEGORIES } from "queries/categories-queries";
import { GET_CALIBERS } from "queries/calibers-queries";
import {
  dealerStatesDropdownItems,
  DealerStatesLabels,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/DealerStatesMenu"



const SavedSearch: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  const [modalOpen, setModalOpen] = React.useState(false)

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  let dealerStates =  dealerStatesDropdownItems;

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  // Apollo Graphql
  const categoryData = useQuery<{ getCategories: Categories[] }, null>(
    GET_CATEGORIES,
  )

  return (
    <AlignCenterLayout maxWidth={720} withRecommendations={false}>

      <div className={clsx(
        classes.saveSearchContainer,
        lgDown ? classes.paddingMobile : classes.paddingDesktop
      )}>
        <SearchHits />
      </div>
      <div className={clsx(
        classes.saveSearchContainer,
        classes.saveSearchBackground,
        lgDown ? classes.paddingMobile : classes.paddingDesktop
      )}>
        <ButtonLoading
          type="submit"
          className={props.classes.saveSearchModalButton}
          variant={"contained"}
          loadingIconColor={Colors.cream}
          replaceTextWhenLoading={true}
          disabled={!process.browser}
          // disabled={disabled}
          onClick={() => {
            setModalOpen(s => !s)
          }}
        >
          { '+ Add Saved Search' }
        </ButtonLoading>
        <ExistingSavedSearches/>
      </div>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(s => false)}
        fullScreen={false}
        fullWidth={false}
        BackdropProps={{
          classes: {
            root: classes.modalBackdrop,
          }
        }}
        PaperProps={{
          classes: {
            root: lgDown
              ? classes.modalPaperScrollPaperMobile
              : classes.modalPaperScrollPaper,
          }
        }}
        scroll={"body"}
      >
        <div className={clsx(
          classes.saveSearchContainer,
          classes.saveSearchBackground,
          classes.modalFormPadding,
          lgDown ? classes.paddingMobile : classes.paddingDesktop,
        )}>
          <ManageSaveSearchPage
            calibers={data?.getCalibers}
            categories={categoryData?.data?.getCategories}
            dealerStates={dealerStates}
            closeModal={() => setModalOpen(s => false)}
          />
        </div>
      </Dialog>
    </AlignCenterLayout>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
}

interface QData3 {
  getCalibers: Calibers[];
}
interface QVar3 {
}



const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    background: 'transparent',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  maxWidth: {
    maxWidth: '1160px', //
  },
  // modal classes
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaperMobile: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    borderRadius: BorderRadius2x,
    maxHeight: "100%",
    minWidth: 360,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    borderRadius: BorderRadius2x,
  },
  saveSearchModalButton: {
    height: 40,
    width: '100%',
    maxWidth: 200,
    marginTop: '2rem',
    borderRadius: BorderRadius2x,
    backgroundColor: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? alpha(Colors.purple, 0.9)
        : alpha(Colors.blue, 0.9),
    }
  },
  paddingDesktop: {
    padding: '2rem',
  },
  paddingMobile: {
    // padding: '0.5rem 0.5rem',
    padding: '0rem',
  },
  saveSearchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 330,
    marginTop: '2rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius2x,
  },
  saveSearchBackground: {
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  modalFormPadding: {
  },
});


export default withStyles(styles)( SavedSearch );
