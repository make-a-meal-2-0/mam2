import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react/dist/commonjs/views/Card';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='Background'>
          <Grid verticalAlign='middle' textAlign='center' column={1} stackable container>


            <Grid.Column width={8}>
              <Image size='small' verticalAlign='middle' circular src="/images/Pan.PNG"/>
              <p>Make-A-Meal is an application that students can use to create
                an account for their personal preferences which will save information about the user such as dietary
                restrictions, local food availability, and taste preferences.
              </p>
            </Grid.Column>

          </Grid>
          <Grid verticalAlign='middle' textAlign='center' column={1} stackable container>
          <div className="ui blue button">
            SIGN UP NOW TO SAVE RECIPES JUST FOR YOU
          </div>
          </Grid>
          <Grid verticalAlign='middle' textAlign='center' column={2} stackable container>
          </Grid>
        </div>
    );
  }
}

export default Landing;
