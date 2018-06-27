import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

import * as helper from './helper';

const Option = AutoComplete.Option;

class BaseSearch extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
  }
  static defaultProps = {
    onSearch: () => {},
    onSelect: () => {},
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
      if (result) {
        this.setState({ data: result });
      }
    });
  }
  // 选择
  onSelect(id, option) {
    if (!id) {
      return;
    }
    helper.queryRepoDetailByID(id).then((result) => {
      if (result) {
        this.props.onSelect(result);
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