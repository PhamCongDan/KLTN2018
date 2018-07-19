import React from 'react';
import PropTypes from 'prop-types';

function IssueIcon(props) {
  return (
    <img src={props.src} style={{width:18,marginRight:10}}/>
  );
}

export default IssueIcon;
