import React from 'react';
import { Card, Segment } from 'semantic-ui-react';
import { Recipes, OwnerSchema } from '/imports/api/recipe/recipe';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AutoForm from 'uniforms-semantic/AutoForm';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import ErrorsField from 'uniforms-semantic/ErrorsField';


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
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
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
        },
    );
  }

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.recipe.name} {this.props.recipe.time}
            </Card.Header>
            <Card.Meta>
              {this.props.recipe.ingredients}
            </Card.Meta>
            <Card.Description>
              {this.props.recipe.directions}
            </Card.Description>
            <AutoForm ref={(ref) => {
              this.formRef = ref;
            }} schema={OwnerSchema}
                onSubmit={this.submit}>
                <SubmitField value='Save'/>
              <ErrorsField/>
              <HiddenField name='owner' value='fakeuser@foo.com'/>
            </AutoForm>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Recipe);
