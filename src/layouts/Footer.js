import React from 'react';
import BaseLink from '@/components/BaseLink';

const styles = {
  copy: {
    fontSize: '16px',
    display: 'block',
  },
  beian: {
    fontSize: '12px',
    display: 'block',
  },
}

const Footer = () => {
  return (
    <footer>
      <span style={styles.copy}>&copy; 2018 what&#39;s the package do?</span>
      <span style={styles.beian}><BaseLink url="http://www.miitbeian.gov.cn/">皖ICP备17026479号-2</BaseLink></span>
    </footer>
  );
}

export default Footer;