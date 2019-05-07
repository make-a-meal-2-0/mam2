import React from 'react';
import { Label, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IngredientPage extends React.Component {

  render() {
    return (
        <Container>
          <Label ribbon color='orange'>
            {this.props.ingredients.ingredient}
          </Label>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientPage.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IngredientPage);
