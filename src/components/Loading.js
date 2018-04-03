import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = ({fullScreen}) => {
  return (
    <div className={classNames({ 'loading': true, 'loading--is-fullscreen': fullScreen })}>
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}

Loading.propTypes = {
  fullScreen: PropTypes.bool,
}

export default Loading;