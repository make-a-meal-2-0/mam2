import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Grid, Segment, Header, Form, } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Ingredient from '../components/Ingredient';
import AddIngredient from '../components/AddIngredient';

// const options = [
//   { key: 'vegan', text: 'Vegan', value: 'vegan' },
//   { key: 'vegetarian', text: 'Vegetarian', value: 'vegetarian' },
//   { key: 'nutfree', text: 'Nut free', value: 'nutfree' },
//   { key: 'dairyfree', text: 'Dairy free', value: 'dairyfree' },
//   { key: 'seafree', text: 'Seafood free', value: 'seafree' },
// ];

const options = [
  { key: 'isVegan', text: 'Vegan', value: false },
  { key: 'isVegetarian', text: 'Vegetarian', value: false },
  { key: 'isNutFree', text: 'Nut', value: false },
  { key: 'isDairyAllergyFree', text: 'Dairy', value: false },
  { key: 'isSeafoodFree', text: 'Seafood', value: false },
];

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  // const options = [
  //   { key: 'isVegan', text: 'Vegan' , value:'isVegan', isChosen:false}
  // ]
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.handleCheckedv = this.handleCheckedv.bind(this);
    this.handleCheckedveg = this.handleCheckedveg.bind(this);
    this.handleCheckednut = this.handleCheckednut.bind(this);
    this.handleCheckeddairy = this.handleCheckeddairy.bind(this);
    this.handleCheckedsea = this.handleCheckedsea.bind(this);
    this.state = {
      vegan: false,
      vegetarian: false,
      nut: false,
      dairy: false,
      seafood: false,
    };
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  handleCheckedv() {
    this.setState({ vegan: !this.state.vegan });
  }

  handleCheckedveg() {
    this.setState({ vegetarian: !this.state.vegetarian });
  }

  handleCheckednut() {
    this.setState({ nut: !this.state.nut });
  }

  handleCheckeddairy() {
    this.setState({ dairy: !this.state.dairy });
  }

  handleCheckedsea() {
    this.setState({ seafood: !this.state.fish });
  }

  /** On submit, insert the data. */
  submit(data) {
    const isVegan = options[0].value;
    const isVegetarian = options[1].value;
    const isNutAllergySafe = options[2].value;
    const isDairyAllergySafe = options[3].value;
    const isSeafoodAllergySafe = options[4].value;
    const {
      name, time, directions, servingSize, tool,
    } = data;
    const owner = Meteor.user().username;
    Recipes.insert({
      name, time, directions, owner, servingSize, tool, isVegan, isVegetarian,
      isNutAllergySafe, isSeafoodAllergySafe, isDairyAllergySafe,
    }, this.insertCallback);
    Ingredients.insert(name);
    this.formRef.reset();

  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const textStyle = { color: 'black' };

    if (this.state.vegan) {
      options[0].value = true;
    } else {
      options[0].value = false;
    }

    if (this.state.vegetarian) {
      options[1].value = true;
    } else {
      options[1].value = false;
    }

    if (this.state.nut) {
      options[2].value = true;
    } else {
      options[2].value = false;
    }

    if (this.state.dairy) {
      options[3].value = true;
    } else {
      options[3].value = false;
    }

    if (this.state.seafood) {
      options[4].value = true;
    } else {
      options[4].value = false;
    }

    return (
        <div className='AddBackground'>
          <Grid container centered>
            <Grid.Column>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={RecipeSchema} onSubmit={this.submit}>
                <Segment>
                  <Header as="h2" textAlign="center" style={textStyle}>Add Recipe</Header>
                  <TextField name='name' placeholder='Grilled Cheese'/>
                  <TextField name='time' placeholder='40-60 minutes'/>
                  <TextField name='servingSize' label='Serving Size' placeholder='1 Grilled Cheese'/>
                  <TextField name='tool' label='Tools Required' placeholder='Pan, Knife'/>
                  <AddIngredient ingredient={this.props.ingredient}/>
                  <Form.Group grouped>
                    <label>Diet Type</label>
                    <Form.Checkbox
                        label='Vegan'
                        name='vegan'
                        onChange={this.handleCheckedv}

                    />
                    <Form.Checkbox label='Vegetarian' name='Vegetarian' onChange={this.handleCheckedveg}/>
                    <Form.Checkbox label='Nut-Free' name='Nut-Free' onChange={this.handleCheckednut}/>
                    <Form.Checkbox label='Non-Dairy' name='Non-Dairy' onChange={this.handleCheckeddairy}/>
                    <Form.Checkbox label='Seafood Free' name='Seafood Free' onChange={this.handleCheckedsea}/>

                  </Form.Group>
                  <LongTextField name='directions' placeholder='Add Sauce'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AddRecipe.propTypes = {
  ingredient: PropTypes.array.isRequired,
  // ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionIngredient = Meteor.subscribe('Ingredients');
  return {
    ingredient: Ingredients.find({}).fetch(),
    readyIngredient: subscriptionIngredient.ready(),
  };
})(AddRecipe);