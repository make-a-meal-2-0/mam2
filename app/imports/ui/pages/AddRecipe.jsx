import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { DietType, DietTypeSchema } from '/imports/api/dietType/dietType';
import { RecipeFull, RecipeFullSchema } from '/imports/api/recipeFull/recipeFull';
import { Grid, Segment, Header, Form, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

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

  addIng(data) {
    const { name, ingredient, quantity, measurement } = data;
    Ingredients.insert({ name, ingredient, quantity, measurement }, this.insertCallback);
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, time, directions, servingSize, tool } = data;
    /*  const { isAtkins, isZone, isKeto, isVegan, isNonDairy, isNutFree } = data;
    const { recipe, ingredients, dietType } = data; */
    const owner = Meteor.user().username;
    /*    DietType.insert({ isAtkins, isZone, isKeto, isVegan, isNonDairy, isNutFree }, this.insertCallback); */
    Recipes.insert({ name, time, directions, owner, servingSize, tool }, this.insertCallback);
    // RecipeFull.insert({ recipe, ingredients, dietType });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const textStyle = { color: 'red' };
    return (
        <div className='Background'>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" style={textStyle}>Add Recipe</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={RecipeSchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='name'/>
                  <TextField name='time'/>
                  <TextField name='servingSize'/>
                  <TextField name='tool' label='Tools Required'/>
                  <AutoForm ref={(ref) => {
                    this.formRef = ref;
                  }} schema={IngredientSchema} onSubmit={this.addIng}>
                      <Input color='red'
                             name='ingredient'
                             icon='food'
                             label='Ingredient'
                             placeholder='Egg'/>
                      <Input color='red'
                             name='quantity'
                             label='Quantity'
                             placeholder='1,2,3...'/>
                      <Input color='red'
                             name='measurement'
                             label='Measurement'
                             placeholder='lb, ounces, nothing...'/>
                    <SubmitField value='Submit' name='Add Ingredient' icon='plus'/>
                  </AutoForm>
                  <Form.Group grouped>
                    <label>Diet Type</label>
                    <Form.Checkbox label='Atkins' control='input' type='checkbox'/>
                    <Form.Checkbox label='The Zone' control='input' type='checkbox'/>
                    <Form.Checkbox label='Ketogenic' control='input' type='checkbox'/>
                    <Form.Checkbox label='Vegetarian/Vegan' control='input' type='checkbox'/>
                    <Form.Checkbox label='Non-Dairy/Lactose Intolerant' control='input' type='checkbox'/>
                    <Form.Checkbox label='Nut-Free' control='input' type='checkbox'/>
                  </Form.Group>
                  <LongTextField name='directions'/>
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

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionRecipe = Meteor.subscribe('Recipes');
  const subscriptionIngredient = Meteor.subscribe('Ingredients');
  const subscriptionDietType = Meteor.subscribe('DietType');
  const subscriptionRecipeFull = Meteor.subscribe('RecipeFull');
  return {
    recipe: Recipes.find({}).fetch(),
    ingredient: Ingredients.find({}).fetch(),
    /*dietType: DietType.find({}).fetch(),
    recipefull: RecipeFull.find({}).fetch(), */
    readyRecipe: subscriptionRecipe.ready(),
    readyIngredient: subscriptionIngredient.ready(),
    /* readyDietType: subscriptionDietType.ready(),
    readyRecipeFull: subscriptionRecipeFull.ready(), */
  };
})(AddRecipe);
