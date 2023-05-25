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
      filteredCards: [],
    };
  }

  validateEnableButton = () => {
    const sumMax = 210;
    const maxPoint = 90;
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const isStringValid = cardName && cardImage && cardDescription;
    // A soma dos valores dos 3 atributos (attr1-input, attr2-input e attr3-input) não pode ultrapassar o valor 210.
    const isSumValid = +cardAttr1 + +cardAttr2 + +cardAttr3 <= sumMax;

    const totalPointsAttr1 = cardAttr1 >= 0 && cardAttr1 <= maxPoint;
    const totalPointsAttr2 = cardAttr2 >= 0 && cardAttr2 <= maxPoint;
    const totalPointsAttr3 = cardAttr3 >= 0 && cardAttr3 <= maxPoint;

    this.setState(() => ({
      isSaveButtonDisabled: !(
        isStringValid
        && isSumValid
        && totalPointsAttr1
        && totalPointsAttr2
        && totalPointsAttr3
      ),
    }));
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      allCards,
    } = this.state;
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

    this.setState(() => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: cardTrunfo || hasTrunfo,
      // cardTrunfo ? cardTrunfo : hasTrunfo,
      isSaveButtonDisabled: true,
      allCards: [...allCards, newCard],
    }));
  };

  onDeleteButtonClick = (cardName) => {
    const { allCards } = this.state;
    // Expects to filter all cards ins the array but the selected one
    const updatedAllCards = allCards.filter(
      (card) => card.cardName !== cardName.target.id,
    );
    // Expects to find matching Super Trunfo in HTML
    const isRemovedCardTrunfo = cardName.target
      .previousElementSibling.lastChild.textContent
      === 'Super Trunfo';
    // Expects hasTrunfo to be false if found the Super Trunfo in HTML
    if (isRemovedCardTrunfo) {
      this.setState(() => ({
        allCards: updatedAllCards,
        hasTrunfo: false,
      }));
    }
    this.setState(() => ({
      allCards: updatedAllCards,
    }));
  };

  filterByCardName = ({ target }) => {
    const { allCards } = this.state;
    const filteredCard = allCards.filter((card) => card.cardName.includes(target.value));

    this.setState(() => ({
      allCards: filteredCard,
    }));
  };

  filterByRarity = ({ target }) => {
    const { allCards } = this.state;

    this.setState(() => {
      if (target.value === 'todas') {
        return { filteredCards: allCards };
      }
      return {
        filteredCards: allCards.filter(
          (card) => card.cardRare === target.value,
        ),
      };
    });
  };

  onInputChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const cardInfo = type === 'checkbox' ? checked : value;

    this.setState(
      (prev) => ({
        ...prev.state,
        [name]: cardInfo,
      }),
      () => {
        this.validateEnableButton();
      },
    );
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
      allCards,
      isSaveButtonDisabled,
      filteredCards,
    } = this.state;

    return (
      <div>
        <h1 className="title">Tryunfo</h1>
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
        <div>
          <h1>TODAS AS CARTAS</h1>
          <label>
            Filtros de busca:
            <input
              type="text"
              data-testid="name-filter"
              placeholder="Nome da Carta"
              onChange={ this.filterByCardName }
            />
          </label>
          <select
            data-testid="rare-filter"
            onChange={ this.filterByRarity }
            /* disabled={ disabledFilters } */
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </div>
        <Card { ...this.state } />
        {filteredCards.length > 0 ? (
          <div className="container">
            <section className="Card__content">
              {filteredCards.map((card) => (
                <div key={ card.cardName }>
                  <Card
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <button
                    type="button"
                    data-testid="delete-button"
                    id={ card.cardName }
                    onClick={ this.onDeleteButtonClick }
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="container">
            <section className="Card__content">
              {allCards.map((card) => (
                <div key={ card.cardName }>
                  <Card
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <button
                    type="button"
                    data-testid="delete-button"
                    id={ card.cardName }
                    onClick={ this.onDeleteButtonClick }
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    );
  }
}
// ... spread operator - unpacks elements from arrays or objects, allowing you to combine or copy them easily.
//
export default App;

// tem como separar as funções em arquivo separado pra reduzir o numero de linhas e organizar o codigo?
