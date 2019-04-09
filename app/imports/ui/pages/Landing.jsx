import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' horizontalAlign='middle' textAlign='center' column={1} stackable container>


          <Grid.Column width={8}>
            <Image size='small' circular src="/images/Pan.PNG"/>
            <p>Make-A-Meal is an application that students can use to create an account for their personal preferences
              which will save information about the user such as dietary restrictions, local food availability, and
              taste preferences.
            </p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
