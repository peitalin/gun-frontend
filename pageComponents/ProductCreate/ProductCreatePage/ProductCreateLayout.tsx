import React from "react";
import clsx from "clsx";
import {
  createStyles,
  Theme,
  fade,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius2x,
  BorderRadius,
} from "layout/AppTheme";
// Styles
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// Product Preview Card
import ProductCardResponsive from "components/ProductCardResponsive";
import PreventDragDropContainer from "./PreventDragDropContainer";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";
import {
  ID,
  Product,
} from "typings/gqlTypes";
import RenderInstructions from "./Instructions";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { isThemeDark } from "layout/AppTheme";
import { useScrollYPosition } from "utils/hooks";


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
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  // let y = useScrollYPosition()

  // React.useEffect(() => {
  //   if (y > 1190 && props.activeStep !== 7) {
  //     props.setActiveStep(7)
  //   }
  // }, [y])


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
            (props.activeStep < 6)
            ? <div className={classes.instructionsContainer}>
                <Typography className={classes.instructionTitle}>
                  {`Step: ${props.activeStep + 1}`}
                </Typography>
                <RenderInstructions activeStep={props.activeStep}/>
              </div>
            : <Tooltip title="Preview" placement="bottom-start">
                <div className={clsx(classes.stickyProductPreviewContainer, 'fadeIn')}>
                  <ProductCardResponsive
                    product={props.productPreviewSticky}
                    previewImageEmptyMessage={`Step ${props.activeStep + 1}: Upload Images`}
                    // previewImageEmptyMessage={`Preview Image`}
                  />
                </div>
              </Tooltip>
          }
        </>
      }
      </div>
    </PreventDragDropContainer>
  )
}



interface ProductCreateFormProps extends WithStyles<typeof styles> {
  productPreviewSticky: Product;
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
    top: '5.5rem',
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
