import React from 'react';
import BaseLink from '@/components/BaseLink';
import style from './Frame.less';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <span>
        &copy; 2018 what&#39;s the package do?<br />
        <BaseLink url="http://www.miitbeian.gov.cn/">皖ICP备17026479号-2</BaseLink>
      </span>
    </footer>
  );
}

export default Footer;