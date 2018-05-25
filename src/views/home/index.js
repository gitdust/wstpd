import React, { Component } from 'react';

import BaseSearch from '@/components/BaseSearch';
import * as api from '../api';
import Repo from './components/Repo';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      repo: null,
    }
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showRepos = this.showRepos.bind(this);
  }
  componentDidMount () {
    api.getRandomRepos().then((result) => {
      if (result) {
        this.setState({ repos: result });
      }
    });
  }
  // 选择
  onSelect(data) {
    this.setState({ repo: data });
  }
  // 搜索
  onSearch() {
    this.setState({ repo: null });
  }
  showRepos() {
    const { repos, repo } = this.state;
    if (this.state.repo) {
      return (<Repo repo={repo} />);
    }
    if (repos.length) {
      return repos.map(r => <Repo key={r._id} repo={r} />);
    }
    return 'Something wrong, buddy!';
  }
  render() {
    return [
      <section key="search" className="search">
        <BaseSearch
          onSelect={this.onSelect}
          onSearch={this.onSearch}
        />
      </section>,
      <section key="result" className="result">
        { this.showRepos() }
      </section>,
    ];
  }
}

export default Main;