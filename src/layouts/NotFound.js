import React from 'react';
import { Link } from 'react-router-dom';

// TODO: UI 改进
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <p>404 - The page you are looking for is either stolen by aliens or never existed.</p>
      <p><Link to="/">返回首页</Link></p>
    </div>
  );
}

export default NotFound;