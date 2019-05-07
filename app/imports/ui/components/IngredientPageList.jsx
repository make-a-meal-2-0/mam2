import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Ingredient from './Recipe';
import IngredientPage from './IngredientPage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IngredientPageList extends React.Component {

  render() {
    return (
        <Container>
        {this.props.ingredients.map((ingredients, index) => <IngredientPage key={index} ingredients={ingredients}/>)}
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientPageList.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IngredientPageList);
