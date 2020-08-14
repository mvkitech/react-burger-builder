import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  bacon: 0.7,
  lettuce: 0.5,
  tomato: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      lettuce: 0,
      tomato: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2.5,
    purchasable: false,
    purchasing: false,
  };

  /**
   * Used to add a new specified ingredient type to the burger.
   */
  addIngredientHandler = (type) => {
    // Increment ingredient values
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // Set state using new "price" and "ingredient" values
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  /**
   * Used to remove a specified ingredient type from the burger.
   */
  removeIngredientHandler = (type) => {
    // Decrement ingredient values
    if (this.state.ingredients[type] <= 0) return;
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // Set state using new "price" and "ingredient" values
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  /**
   * Used to update the purchase state.
   */
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  /**
   * Used to handle burger purchases.
   */
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  /**
   * Used to cancel burger purchases.
   */
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
