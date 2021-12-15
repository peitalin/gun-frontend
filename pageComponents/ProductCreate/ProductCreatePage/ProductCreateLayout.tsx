import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import {
  Colors,
  BorderRadius2x,
  BorderRadius,
} from "layout/AppTheme";

// Product Preview Card
import NewsItemCardResponsive from "components/NewsItemCardResponsive";
import PreventDragDropContainer from "./PreventDragDropContainer";
import Tooltip from '@mui/material/Tooltip';
import {
  Product,
  NewsItem,
  ListingType,
} from "typings/gqlTypes";
import RenderInstructions from "./RenderInstructions";
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { isThemeDark } from "layout/AppTheme";


// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatchign events to <form>
// Validation is triggered during dispatch to <form>

const ProductCreateLayout: React.FC<ProductCreateFormProps> = (props) => {

  const {
    classes,
    children
  } = props;

  // with a callback to Formik.onSubmit prop
  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));


  return (
    <PreventDragDropContainer
      className={clsx(
        classes.root,
        smDown ? classes.pageMarginSm : classes.pageMargin,
      )}
    >
      <div className={clsx(classes.productColumn60)}>
        {children}
      </div>

      <div className={clsx(classes.productColumn40, 'fadeIn')}>
      {
        !mdDown &&
        <>
          {
            (
              props.activeStep === 6
              || props.activeStep === 7
              // || props.activeStep === 8
            ) &&
            <Tooltip title="Preview" placement="bottom-start">
              <div className={clsx(classes.stickyProductPreviewContainer, 'fadeIn')}>
                <NewsItemCardResponsive
                  newsItem={{ product: props.productPreviewSticky } as NewsItem}
                  previewImageEmptyMessage={
                    props.activeStep === 6
                    ? `Step ${props.activeStep + 1}: Upload Images`
                    : props.activeStep === 7
                      ? `Step ${props.activeStep + 1}: Set a Price`
                      : `Step ${props.activeStep + 1}`
                  }
                />
                {/* {
                  props.activeStep === 8 &&
                  <RenderInstructions activeStep={props.activeStep}/>
                } */}
              </div>
            </Tooltip>
          }
          {
            (
              props.activeStep < 5 ||
              props.activeStep === 8
            ) &&
            <div className={classes.instructionsContainer}>
              <RenderInstructions
                listingType={props.listingType}
                activeStep={props.activeStep}
              />
            </div>
          }
        </>
      }
      </div>
    </PreventDragDropContainer>
  )
}



interface ProductCreateFormProps extends WithStyles<typeof styles> {
  productPreviewSticky: Product;
  listingType: ListingType
  activeStep: number
  setActiveStep?(a?: any): void
}

export const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: "wrap",
  },
  productColumn60: {
    flexBasis: '60%',
    flexGrow: 1,
    minWidth: 360,
  },
  productColumn40: {
    flexBasis: '40%',
    flexGrow: 1,
    minWidth: 280,
  },
  stickyProductPreviewContainer: {
    position: 'sticky',
    top: '5rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
    cursor: "pointer",
    // from SellingTips to product card preview
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  pageMargin: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  pageMarginSm: {
    margin: '0rem',
    paddingTop: '0rem',
    paddingBottom: '2rem',
    paddingLeft: '0rem',
    paddingRight: '0rem',
  },
  instructionsContainer: {
    position: 'sticky',
    top: '4.5rem',
    marginBottom: '1rem',
    marginLeft: '1rem',
    cursor: "pointer",
    padding: '1rem',
    borderRadius: BorderRadius2x,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapLightNavy
      : Colors.slateGrey,
  },
  instructionTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
  },
})

export default withStyles(styles)( ProductCreateLayout );
