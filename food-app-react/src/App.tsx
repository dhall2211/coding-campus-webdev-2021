import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { IntlProvider } from "react-intl";
import { DE, EN } from "./localization";
import FoodTheme from "./theme/foodTheme";

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function App() {
  //add state for cartmodal
  const [showCart, setShowCart] = useState(false);
  const [lang, setLang] = useState(DE);

  function showCartHandler() {
    setShowCart(true);
  }

  function hideCartHandler() {
    setShowCart(false);
  }
  useEffect(() => {
    if (window.navigator.language === "de-AT") {
      setLang(DE);
    }
    if (window.navigator.language === "en-US") {
      setLang(EN);
    }
  }, []);

  return (
    <IntlProvider messages={lang} locale="en" defaultLocale="en">
      <CartProvider>
         <FoodTheme>
          {showCart && <Cart onHideCart={hideCartHandler} />}
          <Header onShowCart={showCartHandler} />
          <main>
            <Meals />
          </main>
        </FoodTheme>
      </CartProvider>
    </IntlProvider>
  );
}
