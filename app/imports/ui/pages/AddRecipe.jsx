import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
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
import AddIngredient from './AddIngredient';

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
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

  /** On submit, insert the data. */
  submit(data) {
    const {
      name, time, directions, servingSize, tool, /*isVegan, isVegetarian, isNutAllergySafe,
      isNutFree, isDairyAllergySafe,*/
    } = data;
    const owner = Meteor.user().username;
    Recipes.insert({
      name, time, directions, owner, servingSize, tool, /*isVegan, isVegetarian, isNutAllergySafe,
      isNutFree, isDairyAllergySafe,*/
    }, this.insertCallback);
    Ingredients.insert(name);
    this.formRef.reset();

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
                  <AddIngredient ingredient={this.props.ingredient}/>
                  <Form.Group grouped>
                    <label>Diet Type</label>
                    {/*<Form.Checkbox label='Vegan' name = "isVegan" unchecked = {this.state.vegan === false} checked={this.state.vegan === true} onCheck={(e, checked) => this.onChange(checked)}/>*/}
                    {/*<Form.Checkbox label='Vegetarian' control='input' type='checkbox' value='isVegetarian'/>*/}
                    {/*<Form.Checkbox label='Nut-Free' control='input' type='checkbox' value='isNutFree' />*/}
                    {/*<Form.Checkbox label='Non-Dairy/Lactose Intolerant' control='input' type='checkbox'*/}
                                   {/*value='isNonDairy'/>*/}
                    {/*<Form.Checkbox label='Seafood Free' control='input' type='checkbox'*/}
                                   {/*value='isSeaFoodFree'/>*/}

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
