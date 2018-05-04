import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

import * as helper from './helper';

const Option = AutoComplete.Option;

class BaseSearch extends Component {
  static defaultProps = {
    onSearch: () => {},
    onSelect: () => {},
  }
  static propTypes = {
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }
  // 搜索
  onSearch(value) {
    if (!value) {
      this.props.onSearch();
      return;
    }
    helper.queryRepoByName(value).then((result) => {
      const { ok, data } = result;
      if (ok) {
        this.setState({ data });
      }
    });
  }
  // 选择
  onSelect(value, option) {
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
  // 渲染下拉数据
  renderOptions() {
    const { data } = this.state;
    return data.map(option => <Option key={option._id}>{option.name}</Option>)
  }
  render() {
    const debounceSearch = helper.debounce(this.onSearch, 500);
    return (
      <AutoComplete
        allowClear
        aotuFocus
        backfill
        style={{ width: '100%' }}
        placeholder="Search package name in your package.json"
        onSelect={this.onSelect}
        onSearch={debounceSearch}
      >
        { this.renderOptions() }
      </AutoComplete>
    );
  }
}

export default BaseSearch;