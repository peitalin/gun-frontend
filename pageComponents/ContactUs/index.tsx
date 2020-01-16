import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils
import Loading from "components/Loading";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
// Components
import { sendTicket } from "utils/emails";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";



const ContactUs: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  //loading
  const [loading, setLoading] = useState(false);


  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        name: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      }}
      validationSchema={validationSchemas.CreateSupportTicket}
      onSubmit={async(values, { setSubmitting }) => {
        // Dispatch Apollo Mutation after validation
        setLoading(true)
        let ticketId = uuidv4();
        await sendTicket({
          ticketId: ticketId,
          name: (values.name && values.lastName)
            ? `${values.name} ${values.lastName}`
            : values.name ? values.name : values.email,
          email: values.email,
          subject: values.subject,
          body: values.message,
        })
        setLoading(false)
        setTimeout(() => {
          router.push(`/contact-us/${ticketId}`)
        })
      }}
    >
      {(fprops) => {

        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          validateField,
          validateForm,
        } = fprops;

        return (
          <form onSubmit={handleSubmit}>
            <div className={classes.root}>
              <div className={classes.innerRoot}>

                <div className={classes.flexCol}>
                  <Typography className={classes.title} variant="h3">
                    Contact Us
                  </Typography>
                </div>

                <Typography variant="subtitle1" className={classes.subtitle}>
                  First Name
                </Typography>
                <div className={clsx(classes.formContainer, "fadeInFast")}>
                  <TextInput
                    name="name"
                    placeholder="First Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={(e) => fprops.setFieldValue("name", e.target.value)}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%' }}}
                    errorMessage={errors.name}
                    touched={touched.name}
                  />
                </div>

                <Typography variant="subtitle1" className={classes.subtitle}>
                  Last Name
                </Typography>
                <div className={clsx(classes.formContainer, "fadeInFast")}>
                  <TextInput
                    name="Last Name"
                    placeholder="Last Name"
                    className={classes.textField}
                    value={values.lastName}
                    onChange={(e) => fprops.setFieldValue("lastName", e.target.value)}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%' }}}
                    errorMessage={errors.lastName}
                    touched={touched.lastName}
                  />
                </div>

                <Typography variant="subtitle1" className={classes.subtitle}>
                  Email
                </Typography>
                <div className={clsx(classes.formContainer, "fadeInFast")}>
                  <TextInput
                    name="email"
                    placeholder="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={(e) => fprops.setFieldValue("email", e.target.value)}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%' }}}
                    errorMessage={errors.email}
                    touched={touched.email}
                  />
                </div>

                <Typography variant="subtitle1" className={classes.subtitle}>
                  Subject
                </Typography>
                <div className={clsx(classes.formContainer, "fadeInFast")}>
                  <TextInput
                    name="subject"
                    placeholder="Subject"
                    className={classes.textField}
                    value={values.subject}
                    onChange={(e) => fprops.setFieldValue("subject", e.target.value)}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%' }}}
                    errorMessage={errors.subject}
                    touched={touched.subject}
                  />
                </div>


                <Typography variant="subtitle1" className={classes.subtitle}>
                  Message
                </Typography>
                <div className={clsx(classes.formContainer, "fadeInFast")}>
                  <TextInput
                    name="message"
                    placeholder="What would you like to ask us?"
                    className={classes.textField}
                    value={values.message}
                    onChange={(e) => fprops.setFieldValue("message", e.target.value)}
                    onBlur={handleBlur}
                    inputProps={{ style: { width: '100%' }}}
                    multiline
                    rows={4}
                    errorMessage={errors.message}
                    touched={touched.message}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    classes={{
                      root: classes.sendMessageButton
                    }}
                    onClick={() => {
                      console.log("formik errors:", errors)
                      console.log("formik values:", values)
                    }}
                  >
                    Submit Message
                  </Button>
                </div>

                <Loading fixed loading={loading}/>

              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  name: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}



const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: '4rem 2rem 2rem 2rem',
    marginBottom: '1rem',
    borderRadius: '2px',
    backgroundColor: Colors.foregroundColor,
    minHeight: 'calc(100vh - 90px - 120px)',
    width: '100%',
  },
  innerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
    maxWidth: 400,
  },
  // avatar outline circle
  avatar: {
    width: 90,
    height: 90,
    border: "1px solid #fafafa",
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginTop: '0.5rem',
    marginBottom: '0.25rem',
    width: '100%',
  },
  // avatar image
  textField: {
    flexGrow: 1,
    minWidth: 300,
  },
  sendMessageButton: {
    marginTop: '1rem',
    minWidth: 180,
    backgroundColor: Colors.red,
  },
});


export default withStyles(styles)( ContactUs );