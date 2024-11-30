import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { PageHero, CartContent } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            go to fill your cart
          </Link>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <main>
        <PageHero title="Cart" />
        <Wrapper className="page">
          <CartContent />
        </Wrapper>
      </main>
    );
  }
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
