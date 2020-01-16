import React from "react";
import CartPromoCodesInput from "./CartPromoCodesInput";
import CartPromoCodesList from "./CartPromoCodesList";
import Typography from "@material-ui/core/Typography";


export interface CartPromoCodesProps {
  closePromoCodes?(): void;
}

const CartPromoCodes: React.FC<CartPromoCodesProps> = props => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <CartPromoCodesInput />
      <CartPromoCodesList />
      <a onClick={props.closePromoCodes}>
        <Typography variant="body1">
          Add Promo Code
        </Typography>
      </a>
    </div>
  );
};

export default CartPromoCodes;
