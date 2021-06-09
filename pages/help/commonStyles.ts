import { Colors } from "layout/AppTheme";

export const commonStyles = {
  title: {
    fontSize: '1.75rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  subtitle: {
    marginTop: '2rem',
    marginBottom: '0rem',
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  paragraph: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  link: {
    marginLeft: '0.3rem',
    marginRight: '0.3rem',
    color: Colors.ultramarineBlueDarker,
    "&:hover": {
      color: Colors.ultramarineBlueLight,
    },
  },
}