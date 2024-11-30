import React, { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { InputByType, Label } from "./InputByType";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState("");
  const PAYMENT_METHOD = {
    QR_CODE: "qr_code",
    CREDITS: "credits",
    ATM: "atm",
    WALLET: "wallet",
  };
  const onChangePaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <Wrapper style={{ maxWidth: "420px" }} className="section section-center">
      <CartColumns />
      {cart.map((cartItem) => {
        return <CartItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "16px",
        }}
        className="flex flex-col gap-y-4 w-full"
      >
        <div
          style={{ display: "flex", gap: "14px" }}
          className="flex items-center gap-x-2"
        >
          <InputByType
            id="radio-payment-1"
            checked={paymentMethod === PAYMENT_METHOD.QR_CODE}
            onChange={() => onChangePaymentMethod(PAYMENT_METHOD.QR_CODE)}
          />
          <Label
            htmlFor="radio-payment-1"
            className="cursor-pointer"
            haveColor={true}
          >
            Thanh Toán QR
          </Label>
        </div>
        <div
          style={{ display: "flex", gap: "14px" }}
          className="flex items-center gap-x-2"
        >
          <InputByType
            id="radio-payment-2"
            checked={paymentMethod === PAYMENT_METHOD.CREDITS}
            onChange={() => onChangePaymentMethod(PAYMENT_METHOD.CREDITS)}
          />
          <Label
            className="cursor-pointer"
            haveColor={true}
            htmlFor="radio-payment-2"
          >
            Thẻ tín dụng/ ghi nợ (Visa, Master, JCB, UnionPay, American Express)
          </Label>
        </div>
        <div
          style={{ display: "flex", gap: "14px" }}
          className="flex items-center gap-x-2"
        >
          <InputByType
            id="radio-payment-3"
            checked={paymentMethod === PAYMENT_METHOD.ATM}
            onChange={() => onChangePaymentMethod(PAYMENT_METHOD.ATM)}
          />
          <Label
            className="cursor-pointer"
            haveColor={true}
            htmlFor="radio-payment-3"
          >
            Thẻ ATM nội địa (40 ngân hàng)
          </Label>
        </div>
        <div
          style={{ display: "flex", gap: "14px" }}
          className="flex items-center gap-x-2"
        >
          <InputByType
            id="radio-payment-4"
            checked={paymentMethod === PAYMENT_METHOD.WALLET}
            onChange={() => onChangePaymentMethod(PAYMENT_METHOD.WALLET)}
          />
          <Label
            className="cursor-pointer"
            haveColor={true}
            htmlFor="radio-payment-4"
          >
            Ví điện tử
          </Label>
        </div>
      </div>
      {/* <Buttons clearCart={clearCart} /> */}
      <CartTotals />
    </Wrapper>
  );
};

const Buttons: React.FC<{ clearCart: () => void }> = ({ clearCart }) => {
  return (
    <div className="link-container">
      <Link to="/products" className="link-btn">
        continue shopping
      </Link>
      <button type="button" className="link-btn clear-btn" onClick={clearCart}>
        clear shopping cart
      </button>
    </div>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    column-gap: 0.25rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
