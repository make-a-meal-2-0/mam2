import React from 'react';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import { Segment, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddIngredient extends React.Component {

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
      Bert.alert({ type: 'danger', message: `Ingredient wasn't added: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Ingredient Added' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, ingredient } = data;
    Ingredients.insert({ name, ingredient }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (

        <AutoForm ref={(ref) => {
          this.formRef = ref;
        }} schema={IngredientSchema} onSubmit={this.submit}>
          <Segment>
            <TextField
                icon='food'
                placeholder='2 ounces of milk' label="Ingredient (Amount, Name, Measurement)" name='ingredient'/>
            <Button value='Add Ingredient' label='Add Ingredient' icon='plus' color='green' onClick={this.submit}/>
            <ErrorsField/>
            <HiddenField name='name' value='Something'/>
          </Segment>
        </AutoForm>
    );
  }
}

export default AddIngredient;
