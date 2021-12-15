import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Components
import ProductEditPage from "./ProductEditPage";
import ErrorBounds from 'components/ErrorBounds';
import BackTo from "components/BackTo";
import Typography from "@mui/material/Typography";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const ProductEditModal: React.FC<ReactProps> = (props) => {

  const { classes, product } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  return (
    <ErrorBounds className={clsx(
      classes.pageRoot,
      mdDown ? classes.paddingMobile : classes.paddingDesktop,
    )}>
      <div className={classes.outerContainer}>
        <div className={classes.flexRowInner}>
          <ProductEditPage
            product={product}
          />
        </div>
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  pageRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingDesktop: {
    padding: '2rem 2rem 2rem 2rem',
  },
  paddingMobile: {
    padding: '2rem 0.5rem 2rem 0.5rem',
  },
  modalBackdrop: {
    backgroundColor: Colors.modalBackground,
  },
  modalPaperScrollPaper: {
    maxHeight: "calc(100% - 32px)",
    width: '100%',
  },
  outerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 300,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
    maxWidth: 400,
  },
  title: {
  },
});


export default withStyles(styles)( ProductEditModal );
