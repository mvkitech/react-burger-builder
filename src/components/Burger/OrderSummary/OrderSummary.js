import React from 'react';

import Aux from '../../../hoc/_Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  // Transforms an object into an array of ingredients
  //   where the value of the object determines how many ingredients are needed,
  //   and the key determines the type of the ingredient to use.
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:{' '}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
