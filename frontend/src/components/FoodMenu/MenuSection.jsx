import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useHttp from "../../hooks/useHttp";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { primary } from "../../Utils/colors";
import Item from "./Item";
import { requestConfigPromotions, requestConfigFoods, requestConfigDrinks } from "../../Utils/requestsConfigs";

const MenuSection = ({ index, value, type }) => {
  const { containerMenuSection, progress, gridAdjust } = useStyles({ value, index });

  const { loading, error, data, sendRequest } = useHttp('');

  const [items, setItems] = useState([]);

  useEffect(() => {
    let requestConfig = {}
    if (type === "Promoções") {
      requestConfig = requestConfigPromotions;
    } else if (type === "Comidas") {
      requestConfig = requestConfigFoods;
    } else if (type === "Bebidas") {
      requestConfig = requestConfigDrinks;
    }

    sendRequest(requestConfig);
    if (error) {
      return;
    }
  }, [type])

  useEffect(() => {
    const loadedItems = []
    for (const item in data.rows) {
      loadedItems.push({
        "id": data.rows[item].id,
        "name": data.rows[item].nome,
        "description": data.rows[item].descricao,
        "price": data.rows[item].preco,
        "image": data.rows[item].imagem,
      })
    }
    setItems(loadedItems)
  }, [data])

  const itemsList = items.map((item) => (
    <Item
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
      type={type}
    />
  ));

  return (
    <div className={containerMenuSection} id={`${type}-${index}`} hidden={value !== index}>
      {loading ? <CircularProgress className={progress} /> : (value === index && <div className={gridAdjust}>{itemsList}</div>)}
    </div>
  );
};

MenuSection.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  containerMenuSection: ({ value, index }) => ({
    display: value !== index ? 'none' : 'flex',
    height: '100%',
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
  }),
  progress: ({ value, index }) => ({
    margin: 'auto',
    color: `${primary}`,

    '& * .MuiCircularProgress-root': {
      display: value !== index ? 'none' : 'block',
    }
  }),
  gridAdjust: {
    display: 'grid',
    justifyItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 40,
    gridRowGap: 40,
    padding: 40,
  }

});

export default MenuSection;