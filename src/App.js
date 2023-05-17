import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      /* hasTrunfo: false, */
      isSaveButtonDisabled: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value, type, checked } = target;
    const cardInfo = type === 'checkbox' ? checked : value;
    console.log(cardInfo);
    this.setState(() => ({
      [name]: cardInfo,
    }));
  };

  onSaveButtonClick = () => {
    // Logic for handling the save button click
    // You can access the form data from the component state and perform the necessary actions.
    console.log('Save button clicked');
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
export default App;
