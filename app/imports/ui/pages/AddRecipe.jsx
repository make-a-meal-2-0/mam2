import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { RecipeFull, RecipeFullSchema } from '/imports/api/recipeFull/recipeFull';
import { Grid, Segment, Header, Form, Input, Button } from 'semantic-ui-react';
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
      this.formRef.reset();
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
              }} schema={RecipeFullSchema} onSubmit={this.submit}>
                <AutoForm ref={(ref) => {
                  this.formRef = ref;
                }} schema={RecipeSchema} onSubmit={this.submit}>
                <Segment>
                  <Header as="h2" textAlign="center" style={textStyle}>Add Recipe</Header>
                  <TextField name='name' placeholder='Grilled Cheese'/>
                  <TextField name='time' placeholder='40-60 minutes'/>
                  <TextField name='servingSize' label='Serving Size' placeholder='1 Grilled Cheese'/>
                  <TextField name='tool' label='Tools Required' placeholder='Pan, Knife'/>
                  <AutoForm ref={(ref) => {
                    this.formRef = ref;
                  }} schema={IngredientSchema} onSubmit={this.addIng}>
                    <Segment>
                      <Input color='red'
                             name='ingredient'
                             icon='food'
                             label='Ingredient'
                             placeholder='Egg, Cheese'/>
                      <Input color='red'
                             name='quantity'
                             label='Quantity'
                             placeholder='1,2,3...'/>
                      <Input color='red'
                             name='measurement'
                             label='Measurement'
                             placeholder='lb, ounces, nothing...'/>
                    </Segment>
                    <Button value='Submit' name='Add Ingredient' icon='plus'/>
                  </AutoForm>
                  <Form.Group grouped>
                    <label>Diet Type</label>
                    <Input label='Vegetarian/Vegan' control='input' type='checkbox' value='isVegan'/>
                    <Input label='Non-Dairy/Lactose Intolerant' control='input' type='checkbox'
                                   value='isNonDairy'/>
                    <Input label='Nut-Free' control='input' type='checkbox' value='isNutFree' />
                  </Form.Group>
                  <LongTextField name='directions' placeholder='Add Sauce'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
                </AutoForm>
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
  const subscriptionRecipeFull = Meteor.subscribe('RecipeFull');
  return {
    recipe: Recipes.find({}).fetch(),
    ingredient: Ingredients.find({}).fetch(),
    recipefull: RecipeFull.find({}).fetch(),
    readyRecipe: subscriptionRecipe.ready(),
    readyIngredient: subscriptionIngredient.ready(),
    readyRecipeFull: subscriptionRecipeFull.ready(),
  };
})(AddRecipe);
