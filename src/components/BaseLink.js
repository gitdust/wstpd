import React from 'react';

const BaseLink = (props) => (
  <a
    href={props.url}
    target="_blank"
    rel="noopener noreferrer"
    className="link"
  >
    { props.children }
  </a>
)

export default BaseLink