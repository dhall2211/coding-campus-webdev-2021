import { Fragment, useContext, useState } from 'react';
import { useFormatMessage } from '../../hooks/useFormatMessage';
import CartContext, { CartItem } from '../../store/CartContext';
import Modal from '../UI/Modal';
import './Cart.css';
import CartListItem from './CartListItem';
import Checkout from './Checkout';

export interface IUserData{
  name: string;
  street: string;
  city: string;
  postalCode: string;
}

interface CartProps {
  onHideCart: ()=>void;
}

export default function Cart(props: CartProps){
  const formatMessage = useFormatMessage()
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id: string){
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item: CartItem){
    cartCtx.addItem(item);
  }

  function orderHandler(){
    setIsCheckout(true);
  }

  async function submitOrderhandler(userData: IUserData){
    setIsSubmitting(true);
    await fetch('https://foa1-129ed-default-rtdb.europe-west1.firebasedatabase.app/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

    const cartItems = (
        <ul className='cart-items'>
        { cartCtx.items.map((item) => (
          <CartListItem 
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onAdd={cartItemAddHandler.bind(null, {...item, quantity: 1})}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        ))}
    </ul>);

    const modalActions = <div className='actions'>
      <button className='button--alt' onClick={props.onHideCart}>Schließen</button>
      {hasItems && <button className='button--alt' onClick={orderHandler}>Bestellen</button>}
    </div>;

    const cartModalContent = <Fragment>
            <div className='cart-items'>{cartItems}</div>
            <div className='total'>
                <span>{formatMessage('Total')}</span>
                <span>{`€ ${cartCtx.totalPrice.toFixed(2)}`}</span>
            </div>
            { isCheckout && <Checkout onConfirm={submitOrderhandler} onCancel={props.onHideCart}/> }
            {!isCheckout && modalActions}
    </Fragment>

    const isSubmittingModalContent = <p>{formatMessage('SendingOrderData')}</p>;

    const didSubmitModalContent = <p>{formatMessage('OrderSuccessfullySubmitted')}</p>;

    return(
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}