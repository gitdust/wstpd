import React from 'react';

export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

export const hasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

export const PopImg = (name) => {
  const image = require(`Images/${name}.jpg`);
  return <img className="pop-img" src={image} alt={`${name} qrcode`} />;
}

// 千分位
// TODO: 数据类型判断不完整
export const Thousandth = (val) => {
  try {
    if (!val) {
      return '';
    }
    let tmp = `${val}`;
    const reg = /(-?\d+)(\d{3})/;
    while(reg.test(tmp)) {
      tmp = tmp.replace(reg, '$1,$2');
    }
    return tmp;
  } catch (error) {
    return val;
  }
}
