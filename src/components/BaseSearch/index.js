import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

import * as helper from './helper';

class BaseSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  // 搜索
  onSearch(value) {
    // console.log('on-search', { value });
    if (!value) {
      this.props.onSearch();
      return;
    }
    helper.queryRepoByName(value).then((result) => {
      // console.log({result});
      const { ok, data } = result;
      if (ok) {
        this.setState({ dataSource: data });
      }
    });
  }
  // 选择
  onSelect(value, option) {
    // console.log('on-select', { value, option });
    if (!value) {
      return;
    }
    helper.queryRepoDetailByName(value).then((result) => {
      const { ok, data } = result;
      if (ok) {
        this.props.onSelect(data);
      }
    });
  }
  render() {
    const { dataSource } = this.state;
    const debounceSearch = helper.debounce(this.onSearch, 500);
    return (
      <AutoComplete
        allowClear
        aotuFocus
        backfill
        style={{ width: '100%' }}
        dataSource={dataSource}
        placeholder="Search package name in your package.json"
        onSelect={this.onSelect}
        onSearch={debounceSearch}
      />
    );
  }
}

export default BaseSearch;