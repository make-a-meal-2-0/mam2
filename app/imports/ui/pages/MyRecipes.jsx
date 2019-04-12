import React from 'react';
import { Container, Image,Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Container centered>
          <Header as='h2' centered> My Recipes Mockup</Header>
            <Image src={'./images/myrecipes.png'}/>
        </Container>
    );
  }
}

export default AddRecipe;
