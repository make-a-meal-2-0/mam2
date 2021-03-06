import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import RecipesAdmin from '../components/RecipesAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipesAdmin extends React.Component {

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
            <Header as='h2' textAlign='center' inverted>Admin Control of Recipes</Header>
            <Card.Group content>
              {this.props.recipes.map((recipe, index) => <RecipesAdmin
                  key={index}
                  recipe={recipe}
                  ingredients={this.props.ingredients.filter(ingredients => (ingredients.name === recipe.name))}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRecipesAdmin.propTypes = {
  recipes: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionR = Meteor.subscribe('Recipes');
  const subscriptionI = Meteor.subscribe('Ingredients');
  Meteor.subscribe('ListRecipesAdmin');
  return {
    ingredients: Ingredients.find({}).fetch(),
    recipes: Recipes.find({}).fetch(),
    ready: subscriptionR.ready() && subscriptionI.ready(),
  };
})(ListRecipesAdmin);
