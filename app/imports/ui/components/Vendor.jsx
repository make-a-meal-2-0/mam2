import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Vendor extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.vendor.image} />
            <Card.Header>{this.props.vendor.name}</Card.Header>
            <Card.Meta>{this.props.vendor.address}</Card.Meta>
            <Card.Meta>{this.props.vendor.phone}</Card.Meta>
            <Card.Meta>{this.props.vendor.operation}</Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Vendor.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Vendor);
