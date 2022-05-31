import { FormEvent, useRef, useState } from 'react';
import './Checkout.css';
import './Cart.css';
import { IUserData } from './Cart';
import { formatMessage } from '@formatjs/intl';
import { useFormatMessage } from '../../hooks/useFormatMessage';

interface CheckoutProps {
    onCancel: ()=>void;
    onConfirm: (userData: IUserData)=>void;
}

function isEmpty(value: string){
    return value.trim() === '';
}
function isFourChars(value: string){
    return value.trim().length === 4;
}

export default function Checkout (props: CheckoutProps) {
    const formatMessage = useFormatMessage();
    const [formInputsValid, setFormInputsValid] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef<HTMLInputElement>(null);
    const streetInputRef = useRef<HTMLInputElement | null>(null);
    const postalCodeInputRef = useRef<HTMLInputElement | null>(null);
    const cityInputRef = useRef<HTMLInputElement | null>(null);
    

    function confirmHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        //validate user input
        debugger;
        const enteredName = nameInputRef.current ? nameInputRef.current.value : '';
        const enteredStreet = streetInputRef.current ? streetInputRef.current.value : '';
        const enteredPostalCode =  postalCodeInputRef.current ? postalCodeInputRef.current.value : '';
        const enteredCity = cityInputRef.current ? cityInputRef.current.value : ''; 

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFourChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

        if(!formIsValid){
            return 
        }

        //send to backend
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });

    }
//TODO change out all application text with the formatMessage hook
    return(
        <form onSubmit={confirmHandler}>
            <div className={`control ${formInputsValid.name ? '' : 'invalid'}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputsValid.name && <p>Please enter a name!</p>}
            </div>
            <div className={`control ${formInputsValid.street ? '' : 'invalid'}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formInputsValid.street && <p>Please enter a street!</p>}
            </div>
            <div className={`control ${formInputsValid.postalCode ? '' : 'invalid'}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef}/>
                {!formInputsValid.postalCode && <p>Please enter a valid postal code (4 digits)!</p>}
            </div>
            <div className={`control ${formInputsValid.city ? '' : 'invalid'}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formInputsValid.city && <p>Please enter a city!</p>}
            </div>
            <div className="actions">
                <button className="button--alt" type="button" onClick={props.onCancel}>{formatMessage('Cancel')}</button>
                <button className="button">{formatMessage('Confirm')}</button>
            </div>
        </form>
    );
}