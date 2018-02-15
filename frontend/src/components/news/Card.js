import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  return (
    <div className="card">
      <img className="card-img-top cap-image mx-auto" src={props.card.image.url} alt={props.card.image.title}/>
      <div className="card-block">
        <h4 className="card-title">{props.card.title}</h4>
        <p className="card-text">{props.card.text}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">{props.card.timestamp}</small>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Card;
