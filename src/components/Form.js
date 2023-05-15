import React, { Component } from 'react';

export default class Form extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="nome" data-testid="name-input" />
          </label>

          <label>
            Descrição:
            <input type="text" name="descrição" data-testid="description-input" />
          </label>

          <label>
            Attr01
            <input type="number" name="attr01" data-testid="attr1-input" />
          </label>

          <label>
            Attr02
            <input type="number" name="attr02" data-testid="attr2-input" />
          </label>

          <label>
            Attr03
            <input type="number" name="attr03" data-testid="attr3-input" />
          </label>

          <label>
            Imagem
            <input type="text" name="image" data-testid="image-input" />
          </label>

          <label>
            Raridade
            <select data-testid="rare-input">
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>

          <label>
            Super Trybe Trunfo
            <input type="checkbox" data-testid="trunfo-input" />
          </label>

          <button type="submit" data-testid="save-button">Salvar</button>

        </form>
      </div>
    );
  }
}
