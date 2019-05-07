import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Divider, Checkbox, Grid, Visibility, Ref, Segment} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import Recipe from '../components/Recipe';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {
  state = {
    vegan: false,
    // vegetarian: false,
    // nut: false,
    // dairy: false,
    // seafood: false,
    // gforeman: false,
    // microwave: false,
    // toaster: false,
    //
    // {this.props.recipes.map((recipe) => <Recipe
    //     key={recipe._id}
    //     recipe={recipe}
    //     ingredients={this.props.ingredients.filter(ingredient => (ingredient.name === recipe.name))}/>)}
    //
    //props.recipes.filter(recipe => (recipe.isVegan === true))
  };

  handleVegan = (e, { checked }) =>
      this.setState({ vegan: checked })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
   // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { vegan } = this.state;
    return (

        <div className='Background'>
          <Container>
            <Header as='h2' textAlign='center' inverted>List Recipes</Header>
            <Grid>
              <Grid.Column width={2}>
            <Checkbox toggle label = 'Vegan' checked={vegan} onChange={this.handleVegan} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label = 'Vegetarian' />
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label = 'Nut Free' />
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label = 'Dairy Free' />
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label = 'Seafood Free' />
              </Grid.Column>
            <Divider/>
            </Grid>
            <Card.Group content>
              {(vegan) ? (
                  {this.props.}
                )
              ) : null }

            </Card.Group>
          </Container>
        </div>
    );
  }
}

// {this.props.recipes.filter(recipe => (recipe.isVegan === true)).map((recipe) => <Recipe
//     key={recipe._id}
//     recipe={recipe}
//     ingredients={this.props.ingredients.filter(ingredient => (ingredient.name === recipe.name))}/>)}}


/** Require an array of Stuff documents in the props. */
ListRecipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionR = Meteor.subscribe('Recipes');
  const subscriptionI = Meteor.subscribe('Ingredients');
  // Meteor.subscribe('ListRecipes');
  return {
    ingredients: Ingredients.find({}).fetch(),
    recipes: Recipes.find({}).fetch(),
    ready: (subscriptionR.ready() && subscriptionI.ready()),
  };
})(ListRecipes);

