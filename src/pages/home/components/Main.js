import React, { Component } from 'react';
import { AutoComplete } from 'antd';

import * as api from '../api';
import Repo from './Repo';

// 函数防抖 from lodash
const debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var later = function () {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      repos: [],
      repo: null,
    }
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showRepos = this.showRepos.bind(this);
  }
  componentDidMount () {
    api.getRandomRepos().then((result) => {
      const { ok, data } = result;
      if (ok) {
        this.setState({ repos: data });
      }
    });
  }
  
  // 选择
  onSelect(value, option) {
    // console.log('on-select', { value, option });
    if (!value) {
      return;
    }
    api.QueryRepoDetailByName(value).then((result) => {
      const { ok, data } = result;
      if (ok) {
        this.setState({ repo: data[0] });
      }
    });
  }
  // 搜索
  onSearch(value) {
    // console.log('on-search', { value });
    if (!value) {
      this.setState({ repo: null });
      return;
    }
    api.QueryRepoByName(value).then((result) => {
      // console.log({result});
      const { ok, data } = result;
      if (ok) {
        this.setState({ dataSource: data });
      }
    });
  }
  showRepos() {
    const { repos, repo } = this.state;
    if (this.state.repo) {
      return (<Repo repo={repo} />);
    }
    return repos.map(r => <Repo key={r.id} repo={r} />);
  }
  render() {
    const { dataSource } = this.state;
    const debounceSearch = debounce(this.onSearch, 500);
    return (
      <main>
        <section className="search">
          <AutoComplete
            allowClear
            aotuFocus
            backfill
            dataSource={dataSource}
            placeholder="Search package name in your package.json"
            onSelect={this.onSelect}
            onSearch={debounceSearch}
          />
        </section>
        <section className="result">
          { this.showRepos() }
        </section>
      </main>
    );
  }
}

export default Main;