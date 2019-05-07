import React from 'react';
import { Loader, Header, Icon, Divider, Segment, Container, Label } from 'semantic-ui-react';
import { Recipes } from '/imports/api/recipe/recipe';
import { Ingredients } from '/imports/api/ingredient/ingredient';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import IngredientPage from '../components/IngredientPage';
import IngredientPageList from '../components/IngredientPageList';
import Recipe from './ListRecipes';


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
        <div className='RecipeBackground'>
          <React.Fragment>
            <Segment>
              <Divider horizontal>
                <Header as='h4'>
                  <Label size='massive' color='red'> <Icon name='food'/> {this.props.recipe.name} </Label>
                </Header>
              </Divider>
              <Divider horizontal>
                <Header as='h4'>
                  <Label size='medium' color='yellow'> Ingredients </Label>
                </Header>
              </Divider>
              {this.props.ingredients.filter(ingredient => (ingredient.name === this.props.recipe.name)).map((ingredients, index) => <IngredientPage key={index} ingredients={ingredients}/>)}
              {/*{this.props.ingredients.map((ingredients, index) => <IngredientPageList key={index} ingredients={this.props.ingredients.filter(ingredient => (ingredient.name === this.recipe.name))}/>)}*/}
              <Divider horizontal>
                <Header as='h4'>
                  <Label size='medium' color='yellow'> <Icon name='clock'/>Preparation Time </Label>
                </Header>
              </Divider>
              <Container> {this.props.recipe.time} </Container>

              <Divider horizontal>
                <Header as='h4'>
                  <Label size='medium' color='yellow'> <Icon name='balance'/> Serving Size </Label>
                </Header>
              </Divider>
              <Container> {this.props.recipe.servingSize} </Container>

              <Divider horizontal>
                <Header as='h4'>
                  <Label size='medium' color='yellow'><Icon name='beer'/> Tools </Label>
                </Header>
              </Divider>
              <Container> {this.props.recipe.tool} </Container>
              <Divider horizontal>
                <Header as='h4'>
                  <Label size='medium' color='yellow'><Icon name='clipboard'/> Directions </Label>
                </Header>
              </Divider>
              <Container>{this.props.recipe.directions}</Container>
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
  Meteor.subscribe('ListRecipes');
  return {
    recipe: Recipes.findOne({ _id: documentId }),
    ingredients: Ingredients.find({}).fetch(),
    ready: subscription.ready() && subscriptionIngredient.ready(),
  };
})(RecipePage);
