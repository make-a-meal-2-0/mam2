import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
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
