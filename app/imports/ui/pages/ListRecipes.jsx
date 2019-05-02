import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import Recipe from '../components/Recipe';
import Ingredient from '../components/Ingredient';

/** Renders a table containing all of the St  uff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
   // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='Background'>
          <Container>
            <Header as='h2' textAlign='center' inverted>List Recipes</Header>
            <Card.Group content>
              {this.props.recipes.map((recipe, index) => <Recipe key={index} recipe={recipe}
                                                                 ingredient={this.props.ingredient.filter(ingredient => (ingredient.name === recipe.name))}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ingredient: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionR = Meteor.subscribe('Recipes');
  const subscriptionI = Meteor.subscribe('Ingredient');
  //Meteor.subscribe('ListRecipes');
  return {
    ingredient: Ingredients.find({}).fetch,
    recipes: Recipes.find({}).fetch(),
    ready: subscriptionR.ready() && subscriptionI.ready(),
  };
})(ListRecipes);
