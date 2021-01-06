// UI components
import ButtonLoading from "components/ButtonLoading";
// Styles
import { Colors } from "layout/AppTheme";


export const VisaButtonLoading = (props) => {

  return (
    <div style={{ marginTop: '0.25rem' }}>
      <ButtonLoading
        replaceTextWhenLoading={true}
        loading={true}
        disabled={true}
        loadingIconColor={Colors.lightestGrey}
        style={{
          width: "100%",
          height: "38px",
          fontWeight: 500,
          backgroundColor: Colors.foregroundColor,
          border: `1px solid ${Colors.lightGrey}`,
        }}
      />
      <div style={{ height: '0.5rem' }}></div>
      <ButtonLoading
        replaceTextWhenLoading={true}
        loading={true}
        disabled={true}
        loadingIconColor={Colors.lightestGrey}
        style={{
          width: "100%",
          height: "40px",
          fontWeight: 500,
          backgroundColor: Colors.secondaryBright
        }}
      />
    </div>
  )
}


export const PaypalButtonLoading = (props) => {
  return (
    <ButtonLoading
      replaceTextWhenLoading={true}
      loading={true}
      disabled={true}
      loadingIconColor={Colors.lightestGrey}
      style={{
        width: "100%",
        height: "40px",
        fontWeight: 500,
        marginBottom: '0.35rem', // paypal button annoying extra space
        backgroundColor: Colors.lightYellow
      }}
    />
  )
}
