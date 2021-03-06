import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Divider, Checkbox, Grid, Visibility, Ref, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import Recipe from '../components/Recipe';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRecipes extends React.Component {
  state = {
    vegan: false,
    vegetarian: false,
    nut: false,
    dairy: false,
    seafood: false,
  };

  handleVegan = (e, { checked }) => this.setState({ vegan: checked })

  handleVege = (e, { checked }) => this.setState({ vegetarian: checked })

  handleNut = (e, { checked }) => this.setState({ nut: checked })

  handleDairy = (e, { checked }) => this.setState({ dairy: checked })

  handleSea = (e, { checked }) => this.setState({ seafood: checked })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { vegan, vegetarian, nut, dairy, seafood } = this.state;
    const final = this.props.recipes.filter(recipe => (
            (recipe.isVegan && vegan) ||
            (recipe.isVegetarian && vegetarian) ||
            (recipe.isNutAllergySafe && nut) ||
            (recipe.isDairyAllergySafe && dairy) ||
            (recipe.isSeafoodAllergySafe && seafood)));

    return (
        <div className='Background'>
          <Container>
            <Header as='h2' textAlign='center' inverted>List Recipes</Header>
            <Grid>
              <Grid.Column width={2}>
                <Checkbox toggle label='Vegan' checked={vegan} onChange={this.handleVegan}/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label='Vegetarian' checked={vegetarian} onChange={this.handleVege}/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label='Nut Free' checked={nut} onChange={this.handleNut}/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label='Dairy Free' checked={dairy} onChange={this.handleDairy}/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Checkbox toggle label='Seafood Free' checked={seafood} onChange={this.handleSea}/>
              </Grid.Column>
              <Divider/>
            </Grid>
            <Card.Group>
              {final.map((recipe) => <Recipe
                  key={recipe._id}
                  recipe={recipe}
                  ingredients={this.props.ingredients.filter(ingredient => (ingredient.name === recipe.name))}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}
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
