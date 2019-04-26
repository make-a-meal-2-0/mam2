import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
<<<<<<< HEAD
    const divStyle = { backgroundColor: '#bd100f', color: 'white',
=======

    const divStyle = { backgroundColor: '#644021', color: 'white',
>>>>>>> 5c2e05ad0c2b4fc8c4afd7ba51301201ef58d53f
      height: '300px', width: '2000px' };

    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
<<<<<<< HEAD
              Make A Meal 2.0 <br />
=======

              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822
              Make A Meal 2.0 <br />

>>>>>>> 5c2e05ad0c2b4fc8c4afd7ba51301201ef58d53f
          </div>
        </footer>
    );
  }
}

export default Footer;
