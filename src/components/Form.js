import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Form extends Component {
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
      // hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div>
        <form>
          <label>
            Name:
            <input
              type="text"
              onChange={ onInputChange }
              data-testid="name-input"
              value={ cardName }
              name="cardName"
            />
          </label>

          <label>
            Descrição:
            <input
              type="text"
              name="cardDescription"
              onChange={ onInputChange }
              value={ cardDescription }
              data-testid="description-input"
            />
          </label>

          <label>
            Attr01
            <input
              type="number"
              value={ cardAttr1 }
              onChange={ onInputChange }
              data-testid="attr1-input"
              name="cardAttr1"
            />
          </label>

          <label>
            Attr02
            <input
              type="number"
              value={ cardAttr2 }
              onChange={ onInputChange }
              data-testid="attr2-input"
              name="cardAttr2"
            />
          </label>

          <label>
            Attr03
            <input
              type="number"
              value={ cardAttr3 }
              name="cardAttr3"
              onChange={ onInputChange }
              data-testid="attr3-input"
            />
          </label>

          <label>
            Imagem
            <input
              type="text"
              value={ cardImage }
              name="cardImage"
              onChange={ onInputChange }
              data-testid="image-input"
            />
          </label>

          <label>
            Raridade
            <select
              data-testid="rare-input"
              value={ cardRare }
              name="cardRare"
              onChange={ onInputChange }
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          <label>
            Super Trybe Trunfo
            <input
              type="checkbox"
              name="cardTrunfo"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>

          <button
            type="submit"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  // hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
