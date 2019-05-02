import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { RecipeFull, RecipeFullSchema } from '/imports/api/recipeFull/recipeFull';
import { Grid, Segment, Header, Form, Input, Button, Feed } from 'semantic-ui-react';
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
import Ingredient from '../components/Recipe';
import { Card } from 'semantic-ui-react/dist/commonjs/views/Card';

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.addIng = this.addIng.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.formIng = null;
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

  insertCallbackIng(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Ingredient Add Failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Added Ingredient' });
      this.formIng.reset();
    }
  }

  addIng(data) {
    const { name, ingredient, quantity, measurement } = data;
    Ingredients.insert({ name, ingredient, quantity, measurement }, this.insertCallbackIng);
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, time, directions, servingSize, tool, isVegan, isVegetarian, isNutAllergySafe,
      isNutFree, isDairyAllergySafe } = data;
    const { recipe, ingredients } = data;
    const owner = Meteor.user().username;
    Recipes.insert({ name, time, directions, owner, servingSize, tool, isVegan, isVegetarian, isNutAllergySafe,
      isNutFree, isDairyAllergySafe }, this.insertCallback);
    RecipeFull.insert({ recipe, ingredients });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const textStyle = { color: 'black' };
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
                  {/*                 <Feed>
                    {this.props.ingredient.map((ingredient, index) => <Ingredient key={index} ingredient={ingredient} />)}
                  </Feed>*/}
                  <div className='ui form segment' ref={(ref) => {
                    this.formIng = ref;
                  }} schema={IngredientSchema}>
                    <div className='three fields'>
                      <div className='field'>
                        <label>Ingredient Name</label>
                      <input color='red'
                             name='ingredient'
                             icon='food'
                             label='Ingredient'
                             placeholder='Egg, Cheese'/>
                            </div>
                      {/* <div className='field'>
                        <label>Quantity</label>
                      <input color='red'
                             name='quantity'
                             label='Quantity'
                             placeholder='1,2,3...'/>
                      </div>
                      <div className='field'>
                        <label>Measurement</label>
                      <input color='red'
                             name='measurement'
                             label='Quantity'
                             icon='scale'
                             placeholder='lb, ounces, nothing...'/>
                      </div> */}
                      <Button value='Add Ingredient' label='Add Ingredient' icon='plus' onClick={this.addIng}/>
                    </div>

                  </div>
                  <Form.Group grouped>
                    <label>Diet Type</label>
                    <Form.Checkbox label='Vegetarian/Vegan' control='input' type='checkbox' value='isVegan'/>
                    <Form.Checkbox label='Non-Dairy/Lactose Intolerant' control='input' type='checkbox'
                                   value='isNonDairy'/>
                    <Form.Checkbox label='Nut-Free' control='input' type='checkbox' value='isNutFree' />
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
  const subscriptionRecipe = Meteor.subscribe('Recipes');
  const subscriptionIngredient = Meteor.subscribe('Ingredients');
  return {
    recipe: Recipes.find({}).fetch(),
    ingredient: Ingredients.find({}).fetch(),
    readyRecipe: subscriptionRecipe.ready(),
    readyIngredient: subscriptionIngredient.ready(),
  };
})(AddRecipe);
