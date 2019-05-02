import React from 'react';
import { Button, Card, Label, Feed } from 'semantic-ui-react';
import { Recipes, OwnerSchema } from '/imports/api/recipe/recipe';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    this.delete = this.delete.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Save failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Save succeeded' });
      this.formRef.reset();
    }
  }

  deleteCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
      this.formRef.reset();
    }
  }

  delete() {
    Recipes.remove((this.props.recipe._id),
        this.deleteCallback);
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
        <Card>
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
                {console.log(this.props.ingredients[0])}
            </Card.Meta>
            <Card.Description>
              {this.props.recipe.directions}
            </Card.Description>
            <Card.Content extra>
            <Button.Group>
              <Button onClick={this.delete} name='Delete' color='red'>Delete</Button>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={OwnerSchema}
                      onSubmit={this.submit}>
              <Card.Content extra>
                <Button value='Save' color='green' onClick={SubmitField}>Save</Button>
              </Card.Content>
              <ErrorsField/>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
            </AutoForm>
            </Button.Group>
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
export default withRouter(Recipe);
