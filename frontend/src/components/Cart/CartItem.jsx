import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { primary } from "../../Utils/colors";

const CartItem = ({ name, price, amount, onRemove, onAdd }) => {
  const { containerCartItem, title, buttons, buttonRemove, buttonAdd } = useStyles();

  const formattedPrice = `R$${price.toFixed(2)}`.replace(".", ",");

  return (
    <div className={containerCartItem}>
      <div className={title}>{name}</div>
      <div>{`${formattedPrice} x ${amount}`}</div>
      <div className={buttons}>
        <button className={buttonRemove} onClick={onRemove}>−</button>
        <button className={buttonAdd} onClick={onAdd}>+</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  containerCartItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  title: {
    fontSize: 24,
  },
  buttons: {
    display: 'flex',
    gap: 8,
  },
  buttonRemove: {
    border: 'none',
    borderRadius: 4,
    padding: '4px 8px',
    color: 'white',
    backgroundColor: primary,
    cursor: 'pointer',
  },
  buttonAdd: {
    border: 'none',
    borderRadius: 4,
    padding: '4px 8px',
    color: 'white',
    backgroundColor: primary,
    cursor: 'pointer',
  },
});

export default CartItem;