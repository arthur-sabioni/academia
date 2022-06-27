import React, { useState } from "react";
import { Paper, Tab, Tabs, makeStyles } from "@material-ui/core";
import Header from "../../components/Header/Header";
import Cart from "../../components/Cart/Cart";
import MenuSection from "../../components/FoodMenu/MenuSection"
import { primary } from "../../Utils/colors";

const Menu = () => {
  const { container, containerTab, containerMenu, tabs } = useStyles();

  const [showCart, setShowCart] = useState(false);

  const [value, setValue] = useState(0);

  return (
    <div className={container}>
      {showCart && <Cart onCloseCart={() => setShowCart(false)} />}
      <Header onShowCart={() => setShowCart(true)} />
      <div className={containerTab}>
        <Paper>
          <Tabs
            className={tabs}
            value={value}
            onChange={(event, index) => setValue(index)}
            centered
          >
            <Tab label="Promoções" />
            <Tab label="Comidas" />
            <Tab label="Bebidas" />
          </Tabs>
        </Paper>
      </div>
      <div className={containerMenu}>
        <MenuSection value={value} index={0} type="Promoções" />
        <MenuSection value={value} index={1} type="Comidas" />
        <MenuSection value={value} index={2} type="Bebidas" />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
  },
  containerTab: {
    flexGrow: 0,
    flexBasis: 'auto',
  },
  containerMenu: {
    flexGrow: 1,
    flexBasis: 'auto',
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  tabs: {
    '& * .MuiTab-textColorInherit.Mui-selected': {
      color: primary,
    },
    '& * .MuiTabs-indicator': {
      backgroundColor: primary,
    }
  }
});

export default Menu;