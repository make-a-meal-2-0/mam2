import React from 'react';
import { Button, Card, Label } from 'semantic-ui-react';
import { Recipes, OwnerSchema } from '/imports/api/recipe/recipe';
import { Ingredients, IngredientSchema } from '/imports/api/ingredient/ingredient';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import Ingredient from '../components/Ingredient';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Failed to save recipe: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Recipe saved :D' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit() {
    const newOwner = Meteor.user().username;
    Recipes.update(
        { _id: this.props.recipe._id },
        {
          $addToSet: { owner: newOwner },
        }, this.insertCallback,
    );
  }

  render() {
    return (
        <Card
        href={`#/r/${this.props.recipe._id}`} raised>
          <Card.Content>
            <Card.Header>
              {this.props.recipe.name}
            </Card.Header>
            <Card.Meta>
              <Label color='red' ribbon>Preperation Time:
                <div className='detail'>{this.props.recipe.time}</div>
              </Label>
            </Card.Meta>
            <Label color='red' ribbon>Serving Size:
              <div className='detail'>{this.props.recipe.servingSize}</div>
            </Label>
            <Card.Meta>
              <Label color='red' ribbon>Required Materials:
                <div className='detail'>{this.props.recipe.tool}</div>
              </Label>
            </Card.Meta>
            <Card.Meta>
              {this.props.ingredients.map((ingredients, index) => <Ingredient key={index} ingredients={ingredients}/>)}
            </Card.Meta>
            <Card.Description>
              {this.props.recipe.directions}
            </Card.Description>
            <Card.Content extra>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={OwnerSchema}
                      onSubmit={this.submit}>
                <Button value='Save' color='green' onClick={SubmitField}>Save</Button>
              <ErrorsField/>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
            </AutoForm>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
};


/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  const subscriptionI = Meteor.subscribe('Ingredients');
  return {
    readyI: subscriptionI.ready(),
  };
})(Recipe);
