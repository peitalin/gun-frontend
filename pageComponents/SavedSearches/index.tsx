
import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  isThemeDark,
  BorderRadius4x,
} from "layout/AppTheme";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
import ManageSaveSearchPage from './ManageSaveSearchPage';
// Category
import { Categories, Calibers } from "typings/gqlTypes";

// Categories, Calibers, Dealer States
import { GET_CATEGORIES } from "queries/categories-queries";
import { GET_CALIBERS } from "queries/calibers-queries";
import {
  dealerStatesDropdownItems,
  DealerStatesLabels,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/DealerStatesMenu"
import {
  createCaliberOption,
  createCaliberOptionGroups,
} from "components/SearchbarAirbnb/AdvancedSearchDropdown/CaliberMenu"




const SavedSearch: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  let dealerStates =  dealerStatesDropdownItems;

  const { data } = useQuery<QData3, QVar3>(
    GET_CALIBERS, {
  })

  // Apollo Graphql
  const categoryData = useQuery<{ getCategories: Categories[] }, null>(
    GET_CATEGORIES,
  )

  return (
    <ManageSaveSearchPage
      calibers={data?.getCalibers}
      categories={categoryData?.data?.getCategories}
      dealerStates={dealerStates}
    />
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
    borderRadius: BorderRadius4x,
    maxHeight: "100%",
    minWidth: 360,
  },
  modalPaperScrollPaper: {
    // maxHeight: "calc(100% - 32px)",
    background: 'transparent',
    boxShadow: 'unset',
    margin: '0rem',
    borderRadius: BorderRadius4x,
  },
  saveSearchModalButton: {
    height: 40,
    width: '100%',
    maxWidth: 120,
    borderRadius: BorderRadius3x,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? fade(Colors.purple, 0.9)
        : fade(Colors.blue, 0.9),
    }
  },
});


export default withStyles(styles)( SavedSearch );
