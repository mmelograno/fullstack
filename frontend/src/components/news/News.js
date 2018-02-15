import React from 'react';

import './styles.css';
import Card from './Card';

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [{
        id: 1,
        image: {
          url: 'http://constructs.stampede-design.com/wp-content/uploads/2017/01/javascriptlogo-2.jpg',
          title: 'Card Cap 1',
        },
        title: 'Javascript Course',
        text: 'ES6 JS Course',
        timestamp: '8 ENE 2018',
      }, {
        id: 2,
        image: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          title: 'Card Cap 2',
        },
        title: 'NodeJs Course',
        text: 'NodeJS Advanced Course',
        timestamp: '20 DIC 2017',
      }, {
        id: 3,
        image: {
          url: 'https://dev.codetrick.net/wp-content/uploads/2017/05/7.png',
          title: 'Card Cap 3',
        },
        title: 'React Course',
        text: 'React Redux Course',
        timestamp: '19 DIC 2017',
      }, {
        id: 4,
        image: {
          url: 'http://constructs.stampede-design.com/wp-content/uploads/2017/01/javascriptlogo-2.jpg',
          title: 'Card Cap 4',
        },
        title: 'Javascript Course',
        text: 'Design Patterns JS Course',
        timestamp: '15 NOV 2017',
      }, {
        id: 5,
        image: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          title: 'Card Cap 5',
        },
        title: 'NodeJs Course',
        text: 'NodeJS Testing Course',
        timestamp: '15 AUG 2017',
      }, {
        id: 6,
        image: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          title: 'Card Cap 6',
        },
        title: 'NodeJs Course',
        text: 'NodeJS Production Course',
        timestamp: '10 AUG 2017',
      }, {
        id: 7,
        image: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          title: 'Card Cap 7',
        },
        title: 'NodeJs Course',
        text: 'NodeJS Express Course',
        timestamp: '5 AUG 2017',
      }, {
        id: 8,
        image: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          title: 'Card Cap 8',
        },
        title: 'NodeJs Course',
        text: 'NodeJS First Application Course',
        timestamp: '1 AUG 2017',
      }],
    };
  }

  render() {
    return (
      <div>
        <h3 className="title-selected">News</h3>
        <hr className="divider" />
        <div className="card-deck">
          {this.state.cards.map(card => <Card key={card.id} card={card} /> )}
        </div>
        <hr className="divider" />
      </div>
    );
  }
}

export default News;
