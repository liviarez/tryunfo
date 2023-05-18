import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      allCards: [],
    };
  }

  validateEnableButton = () => {
    const sumMax = 210;
    const maxPoint = 90;
    const { cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;

    const isStringValid = cardName && cardImage && cardDescription;
    // A soma dos valores dos 3 atributos (attr1-input, attr2-input e attr3-input) não pode ultrapassar o valor 210.
    const isSumValid = (+cardAttr1)
      + (+cardAttr2)
      + (+cardAttr3) <= sumMax;

    const totalPointsAttr1 = cardAttr1 >= 0 && cardAttr1 <= maxPoint;
    const totalPointsAttr2 = cardAttr2 >= 0 && cardAttr2 <= maxPoint;
    const totalPointsAttr3 = cardAttr3 >= 0 && cardAttr3 <= maxPoint;

    this.setState(() => ({
      isSaveButtonDisabled: !(isStringValid
        && isSumValid
        && totalPointsAttr1
        && totalPointsAttr2
        && totalPointsAttr3),
    }));
  };

  onSaveButtonClick = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardTrunfo,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      allCards } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardTrunfo,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    };
    allCards.push(...allCards, newCard);

    this.setState(() => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      allCards,
    }));
  };

  onInputChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const cardInfo = type === 'checkbox' ? checked : value;
    this.setState((prev) => ({
      ...prev.state,
      [name]: cardInfo,
    }), () => {
      this.validateEnableButton();
    });
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          { ...this.state }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <section>
          {}
        </section>
      </div>
    );
  }
}

// ... spread operator - unpacks elements from arrays or objects, allowing you to combine or copy them easily.
//
export default App;
