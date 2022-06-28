import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GymContext from '../../context/GymContext.js';
import { useContext } from 'react';
import { gray100, primary } from '../../Utils/colors.js';

const Item = ({ id, name, description, price, image, type }) => {
  const { containerItem, picture, texts, title, pricestyle, buttons, button } = useStyles();

  const cartCtx = useContext(GymContext)

  const formattedPrice = `R$${price.toFixed(2)}`.replace(".", ",");

  const addItemHandler = () => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: 1,
    });
  }

  const addHalfItemHandler = () => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: 0.5,
    });
  }

  return (
    <div id={id} className={containerItem}>
      <div>
        <img className={picture} alt={name} src={`https://drive.google.com/thumbnail?id=${image}`} />
      </div>
      <div className={texts}>
        <div className={title}>{name}</div>
        <div>{description}</div>
        <div className={pricestyle}>{formattedPrice}</div>
      </div>
      <div>
        {type !== 'Comidas' ?
          <Button className={button} onClick={addItemHandler}>Escolher</Button>
          :
          <div className={buttons}>
            <Button className={button} onClick={addItemHandler}>Inteira</Button>
            <Button className={button} onClick={addHalfItemHandler}>Meia</Button>
          </div>
        }
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  containerItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 24,
    padding: 24,
    minWidth: 400,
    maxWidth: 400,
    borderRadius: 8,
    textAlign: "center",
    border: `solid 1px ${primary}`,
  },
  picture: {
    borderRadius: 8,
    padding: 1,
    opacity: 0.8,
  },
  texts: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
  },
  pricestyle: {
    fontSize: 40,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    width: 'fit-content',
    color: gray100,
    backgroundColor: primary,
    padding: '8px 16px',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: primary,
      boxShadow: '0 4px 1em gray',
    }
  },
});

export default Item;