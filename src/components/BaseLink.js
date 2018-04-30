import React from 'react';

const BaseLink = (props) => (
  <a
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
    className={props.styleName}
  >
    { props.children }
  </a>
)

export default BaseLink