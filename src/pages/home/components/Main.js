import React, { Component } from 'react';
import { AutoComplete } from 'antd';

import * as api from '../api';
import Repo from './Repo';

const dataSource = [
  'react',
  'react-dom',
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  // 选择
  onSelect(value, option) {
    console.log('on-select', { value, option });
    api.QueryRepoDetailByName(value);
  }
  // 搜索
  onSearch(value) {
    // console.log('on-search', { value });
    api.QueryRepoByName(value);
  }
  render() {
    return (
      <main>
        <section className="search">
          <AutoComplete
            allowClear
            aotuFocus
            // backfill
            dataSource={dataSource}
            placeholder="search package name..."
            onSelect={this.onSelect}
            onSearch={this.onSearch}
          />
        </section>
        <section className="result">
          <Repo />
          <Repo />
          <Repo />
          <Repo />
        </section>
      </main>
    );
  }
}

export default Main;