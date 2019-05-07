import React from 'react';
import { List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Ingredient extends React.Component {

  render() {
    return (
        <List bulleted>
          <List.Item>
            <Label color='yellow' ribbon>{this.props.ingredients.ingredient}</Label></List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
Ingredient.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Ingredient);
