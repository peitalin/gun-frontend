import {
	Condition
} from "typings"


export const getConditionScore = (condition: string) => {
  if (condition?.match(/new/i) || condition?.match(/perfect/i)) {
    return Condition.PERFECT
  }
  if (condition?.match(/ex[c]*el/i)) {
    return Condition.EXCELLENT
  }
  if (condition?.match(/^very\s*good/i)) {
    return Condition.VERY_GOOD
  }
  if (condition?.match(/^good/i)) {
    return Condition.GOOD
  }
  if (condition?.match(/fair/i) || condition?.match(/average/i)) {
    return Condition.FAIR
  }
  if (condition?.match(/poor/i) || condition?.match(/worn/i)) {
    return Condition.POOR
  } else {
    return Condition.NA
  }
}

export const getConditionText = (condition: string) => {
  if (condition?.match(/new/i)) {
    return "New"
  }
  if (condition?.match(/perfect/i)) {
    return "Perfect"
  }
  if (condition?.match(/ex[c]*el/i)) {
    return "Excellent"
  }
  if (condition?.match(/^very\s*good/i)) {
    return "Very Good"
  }
  if (condition?.match(/^good/i)) {
    return "Good"
  }
  if (condition?.match(/fair/i) || condition?.match(/average/i)) {
    return "Fair"
  }
  if (condition?.match(/average/i)) {
    return "Average"
  }
  if (condition?.match(/worn/i)) {
    return "Worn"
  }
  if (condition?.match(/poor/i) || condition?.match(/worn/i)) {
    return "Poor"
  } else {
    return "NA"
  }
}