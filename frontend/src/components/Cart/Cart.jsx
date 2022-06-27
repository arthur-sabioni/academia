import { useState, useContext } from "react";
import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import CartItem from "./CartItem";
import React from "react"
import Modal from "../../UI/Modal"
import { useHttp } from "../../hooks";
import GymContext from "../../context/GymContext";
import { requestConfigOrder } from "../../Utils/requestsConfigs";
import { gray100, primary } from "../../Utils/colors";

const Cart = (props) => {
  const { containerCart, containerCartItems, block, finished, center, progress, finish, total, button, address } = useStyles();

  const cartCtx = useContext(GymContext);

  const [isCheckout, setIsCheckout] = useState("false");

  const { loading, sendRequest } = useHttp('');

  const sendOrder = () => sendRequest(requestConfigOrder(cartCtx));

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    item.id <= 13 ? cartCtx.addItem({ ...item, amount: 0.5 }) : cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    let totalItems = 0;
    let item = {};
    for (item in cartCtx.items) {
      totalItems += cartCtx.items[item].amount;
    }
    if (totalItems % 1 === 0) {
      sendOrder();
      cartCtx.clearCart();
      setIsCheckout("true");
    }
    else {
      setIsCheckout("error");
    }
  };

  const totalAmount = `R$${cartCtx.totalAmount.toFixed(2)}`.replace(".", ",");

  const cartItems = (
    <div className={containerCartItems}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </div>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      <div className={containerCart}>
        {cartItems}
        {isCheckout === "error" ? <div className={block}>{'Não é permitida a compra de meia pizza avulsa!'.toUpperCase()}</div> : <></>}
        {isCheckout === "true" ?
          <div className={center}>{loading ? <CircularProgress className={progress} /> : <div className={finished}>Pedido realizado!</div>}</div>
          :
          <>
            <div className={finish}>
              <div className={total}>{`Total: ${totalAmount}`}</div>
              <Button className={button} variant="contained" disabled={cartCtx.items.length === 0} onClick={orderHandler}>Finalizar</Button>
            </div>
            <div className={address}>{`Endereço para entrega: ${cartCtx.address}`}</div>
          </>
        }
      </div>
    </Modal>
  );
};

const useStyles = makeStyles({
  containerCart: {
    padding: 32,
  },
  containerCartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  block: {
    marginTop: 64,
    textAlign: 'center',
    color: 'red',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  finished: {
    fontSize: 30,
    fontWeight: 500,
  },
  progress: {
    color: primary,
  },
  finish: {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr',
    marginTop: 64,
  },
  total: {
    fontSize: 30,
    fontWeight: 500,
    alignItems: 'center',
  },
  button: {
    width: 'fit-content',
    marginLeft: 'auto',
    color: gray100,
    backgroundColor: primary,
    padding: '8px 16px',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: primary,
      boxShadow: '0 4px 1em gray',
    },
  },
  address: {
    marginTop: 24,
  },
});

export default Cart;