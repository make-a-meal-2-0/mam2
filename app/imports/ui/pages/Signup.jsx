import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Menu } from 'semantic-ui-react/dist/commonjs/collections/Menu';


// const options = [
//   { key: 'isVegan', text: 'Vegan', value: false },
//   { key: 'isVegetarian', text: 'Vegetarian', value: false },
//   { key: 'isNutFree', text: 'Nut', value: false },
//   { key: 'isDairyAllergyFree', text: 'Dairy', value: false },
//   { key: 'isSeafoodFree', text: 'Seafood', value: false },
//   { key: 'isGForeman', text: 'GForeman', value: false },
//   { key: 'isMicrowave', text: 'Microwave', value: false },
//   { key: 'isToasterOven', text: 'Toaster Oven', value: false },
// ];

/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      vegan: false,
      vegetarian: false,
      nut: false,
      dairy: false,
      seafood: false,
      gforeman: false,
      microwave: false,
      toaster: false,
    };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckedv = this.handleCheckedv.bind(this);
    this.handleCheckedveg = this.handleCheckedveg.bind(this);
    this.handleCheckednut = this.handleCheckednut.bind(this);
    this.handleCheckeddairy = this.handleCheckeddairy.bind(this);
    this.handleCheckedsea = this.handleCheckedsea.bind(this);
    this.handleCheckedgfor = this.handleCheckedgfor.bind(this);
    this.handleCheckedmicro = this.handleCheckedmicro.bind(this);
    this.handleCheckedtoast = this.handleCheckedtoast.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleCheckedv () {
    this.setState({ vegan: !this.state.vegan});
  }
  handleCheckedveg () {
    this.setState({ vegetarian: !this.state.vegetarian});
  }
  handleCheckednut () {
    this.setState({ nut: !this.state.nut});
  }
  handleCheckeddairy () {
    this.setState({ dairy: !this.state.dairy});
  }
  handleCheckedsea () {
    this.setState({ seafood: !this.state.fish});
  }
  handleCheckedgfor () {
    this.setState({ gforeman: !this.state.gforeman});
  }
  handleCheckedmicro () {
    this.setState({ microwave: !this.state.microwave});
  }
  handleCheckedtoast () {
    this.setState({ toaster: !this.state.toaster});
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { email, password, vegan, vegetarian, nut, dairy, seafood, gforeman, microwave, toaster } = this.state;
    Accounts.createUser({
      email, username: email,
      password,
      vegan,
      vegetarian,
      nut,
      dairy,
      seafood,
      gforeman,
      microwave,
      toaster,
    }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
        // to
      }
    });
  }

  /** Display the signup form. */
  render() {
    return (
        <div className='SignBackground'>
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Make-A-Meal-2.0
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <label black>Choose your dietary restrictions</label>
                  <Form.Checkbox label = 'Vegan' name= 'vegan' onChange={ this.handleCheckedv}/>
                  <Form.Checkbox label = 'Vegetarian' name= 'Vegetarian' onChange={ this.handleCheckedveg} />
                  <Form.Checkbox label = 'Nut-Free' name= 'Nut-Free' onChange={ this.handleCheckednut} />
                  <Form.Checkbox label = 'Non-Dairy' name= 'Non-Dairy' onChange={ this.handleCheckeddairy} />
                  <Form.Checkbox label = 'Seafood Free' name= 'Seafood Free' onChange={ this.handleCheckedsea} />
                  <label black>Choose your tools</label>
                  <Form.Checkbox label = 'George Foreman Grill' name= 'gforeman' onChange={ this.handleCheckedgfor}/>
                  <Form.Checkbox label = 'Microwave' name= 'microwave' onChange={ this.handleCheckedmicro} />
                  <Form.Checkbox label = 'Toaster Oven' name= 'toaster' onChange={ this.handleCheckedtoast} />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}
