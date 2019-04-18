import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { backgroundColor: '#bd100f', color: 'white',
      height: '300px', width: '2000px' };

    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Make A Meal 2.0 <br />

          </div>
        </footer>
    );
  }
}

export default Footer;
