import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
// MUI
import Typography from "@material-ui/core/Typography";
;
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';
import ButtonLoading from 'components/ButtonLoading';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { Colors, isThemeDark } from "layout/AppTheme";
import StepperTick from "components/Icons/StepperTick";
import StepperCircle from "components/Icons/StepperCircle";
import StepperInfo from "components/Icons/StepperInfo";



const getStepTitles = () => {
  return [
    'Select Category and License',
    'Title, Serial Number, and Action Type',
    'Choose a transferring dealer',
    'Gun Attributes',
    'Condition',
    'Description',
  ];
}
const activeStepTouched = {
  0: [
    "categoryId",
    "sellerLicenseId",
  ],
  1: [
    "title",
    "actionType",
  ],
  2: [
    "dealerId",
  ],
  3: [
    "make",
    "model",
    "caliber",
    "magazineCapacity",
    "barrelLength",
  ],
  4: [
    "condition",
  ],
  5: [
    "description"
  ],
  6: [],
  7: [],
  8: [],
}


const ProductCreateStepper: React.FC<StepperProps> = ({
  classes,
  activeStep,
  setActiveStep,
  errorIndex,
  stepIndexes,
  stepAfterLastStep,
  setFieldTouched,
  children,
}) => {

  const theme = useTheme()
  const stepTitles = getStepTitles();

  const handleNext = () => {
    // let lastIndex = stepIndexes.slice(-1)?.[0]
    // if (activeStep === lastIndex) {
    //   handleReset()
    // } else {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(stepAfterLastStep);
  };

  // console.log("stepIndexes: ", stepIndexes)
  let stepperColor = isThemeDark(theme)
    ? Colors.uniswapLightGrey
    : Colors.slateGreyBlack


  React.useEffect(() => {
    let formikFields = activeStepTouched[activeStep]
    if (formikFields) {
      formikFields.forEach(field => {
        setFieldTouched(field, true)
      })
    }
  }, [activeStep])


  return (
    <Stepper activeStep={activeStep - stepIndexes?.[0]} orientation="vertical">
      {
        stepIndexes.map(index => {

          let label = stepTitles[index]
          let errIndex = errorIndex(index)

          return (
            <Step key={label}>
              <StepLabel
                className={classes.stepTitle}
                onClick={() => {
                  setActiveStep(index)
                }}
                error={errIndex}
                StepIconComponent={(props) => {
                  // console.log("step props", props)
                  let { active, completed, error, icon} = props
                  if (active) {
                    return <StepperCircle color={Colors.ultramarineBlue}/>
                  } else if (errIndex || error) {
                    return <StepperInfo color={Colors.lighterRed}/>
                  } else if (completed) {
                    return <StepperTick color={stepperColor}/>
                  } else {
                    return <StepperCircle color={stepperColor}/>
                  }
                }}
              >
                <span className={
                  (index === activeStep)
                  ? classes.stepTitleLabelActive
                  : errIndex
                    ? classes.stepTitleError
                    : classes.stepTitleLabel
                }>
                  {label}
                </span>
              </StepLabel>

              <StepContent>

                {children}

                <div className={classes.buttonContainer}>
                  <ButtonLoading
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.stepperButtonBack}
                  >
                    Back
                  </ButtonLoading>
                  <ButtonLoading
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.stepperButtonNext}
                  >
                    {activeStep === stepTitles.length - 1 ? 'Finish' : 'Next'}
                  </ButtonLoading>
                </div>
              </StepContent>
            </Step>
          )
        })
      }
    </Stepper>
  );
}

interface StepperProps extends WithStyles<typeof styles> {
  activeStep: number
  setActiveStep?(a?: any): void
  errorIndex(index: number): boolean
  stepIndexes: number[]
  stepAfterLastStep: number
  setFieldTouched(field: string, b: boolean): void
}

interface FormikFields {
  categoryId: string
}

const styles = (theme: Theme) => createStyles({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepperButtonBack: {
    flexBasis: '50%',
    margin: '1rem',
  },
  stepperButtonNext: {
    flexBasis: '50%',
    margin: '1rem',
    backgroundColor: isThemeDark(theme)
      ? Colors.ultramarineBlue
      : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.ultramarineBlueLighter
        : Colors.ultramarineBlueLighter,
    },
  },
  stepTitleLabelActive: {
    cursor: "pointer",
    color: Colors.ultramarineBlue,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
  stepTitle: {
  },
  stepTitleLabel: {
    cursor: "pointer",
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
  },
  stepTitleError: {
    cursor: "pointer",
    color: Colors.fadedRed,
    "&:hover": {
      color: Colors.ultramarineBlue,
    },
  },
})

export default withStyles(styles)(ProductCreateStepper);

