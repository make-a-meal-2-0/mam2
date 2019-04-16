import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { backgroundColor: '#644021', color: 'white',
      height: '300px', width: '2000px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822
              Make A Meal 2.0 <br />
          </div>
        </footer>
    );
  }
}

export default Footer;
