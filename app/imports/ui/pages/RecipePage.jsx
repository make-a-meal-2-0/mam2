import React from 'react';
import { Loader, Header, Table, Icon, Divider,Segment } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import IngredientPage from '../components/IngredientPage';

/** Renders the Page for editing a single document. */
class RecipePage extends React.Component {

  /** On successful submit, insert the data. */

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <div className='Background'>
        <React.Fragment>

          <Divider horizontal >
            <Header as='h4'>
              <Icon name='food' />
              {this.props.recipe.name}
            </Header>
          </Divider>

          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Ingredients</Table.Cell>
                <Table.Cell>
                  {this.props.ingredients.map((ingredients, index) => <Segment><IngredientPage
                      key={index} ingredients={ingredients}/></Segment>)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={2}>Preparation Time</Table.Cell>
                <Table.Cell>{this.props.recipe.time}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Serving Size</Table.Cell>
                <Table.Cell>{this.props.recipe.servingSize}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Tools</Table.Cell>
                <Table.Cell>{this.props.recipe.tools}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='spoon' />
              Directions
            </Header>
          </Divider>
          <Segment inverted color='red' >
            {this.props.recipe.directions}
          </Segment>
        </React.Fragment>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RecipePage.propTypes = {
  recipe: PropTypes.object.isRequired,
  ingredients: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Ingredient and Recipes documents.
  const subscriptionIngredient = Meteor.subscribe('Ingredients');
  const subscription = Meteor.subscribe('Recipes');
  return {
    recipe: Recipes.findOne({ _id: documentId }),
    ingredients: Ingredients.find({}).fetch(),
    ready: subscription.ready() && subscriptionIngredient.ready(),
  };
})(RecipePage);
