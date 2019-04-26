import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const logoStyle = { color: 'yellow' };
    return (
        <div className='Background'>
          <Grid verticalAlign='middle' textAlign='center' column={2} stackable container>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image centered size='small' src="/images/Icon.PNG" rounded/>
              <p>Make A Meal 2.0 is an application that students can use to create
                an account for their personal preferences which will save information about the user such as dietary
                restrictions, local food availability, and taste preferences.
              </p>
            </Grid.Column>

          </Grid>
          <Grid verticalAlign='middle' textAlign='center' column={1} stackable container>
          </Grid>
          <Grid verticalAlign='middle' textAlign='center' column={2} stackable container>
          </Grid>
        </div>
    );
  }
}

export default Landing;
