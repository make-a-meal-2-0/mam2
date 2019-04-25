import React from 'react';
import { Button, Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Recipe extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.recipe.name}
            </Card.Header>
            <Card.Meta>
              <Label color='red' ribbon>Preperation Time:<div className='detail'>{this.props.recipe.time}</div> </Label>
            </Card.Meta>
            <Label color='red' ribbon>Serving Size:<div className='detail'>{this.props.recipe.servingSize}</div>
            </Label>
            <Card.Meta>
              <Label color='red' ribbon>Required Materials:<div className='detail'>{this.props.recipe.tool}</div>
              </Label>
            </Card.Meta>
             /*<Card.Content>
                 <Label ribbon color='red'>
                   <div className ='detail'>{this.props.ingredients.name}</div>
                 </Label>
             </Card.Content> */
            <Card.Description>
              {this.props.recipe.directions}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
              <Button positive>
                Save
              </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

Ingredients.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Recipe);
