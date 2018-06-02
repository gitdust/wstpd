import React, { Component } from 'react';
import { Button } from 'antd';

import WebWorker from '@/utils/my.worker';
import { error } from '@/utils/feedback';
import { isArray } from '@/utils/tools';
import BaseSearch from '@/components/BaseSearch';
import * as api from '../api';
import Repo from './components/Repo';

const MyWorker = new WebWorker();
MyWorker.addEventListener('error', (evt) => {
  error("line:" + evt.lineno + "\nmessage:" + evt.message + "\nfile:" + evt.filename);
}, false);  

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
    this.initialData = this.initialData.bind(this);
    this.onReceiveData = this.onReceiveData.bind(this);
    MyWorker.addEventListener("message", this.onReceiveData);
  }
  componentDidMount () {
    this.initialData();
  }
  componentWillUnmount() {
    MyWorker.terminate();    
  }
  // 选择
  onSelect(data) {
    this.setState({ repo: data });
    MyWorker.postMessage(data);
  }
  // 搜索
  onSearch() {
    this.setState({ repo: null });
  }
  onDataHandler(originData, workerData) {
    const data = [ ...originData ];
  
    const obj = {};
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      obj[el.fullName] = el;
    }

    Object.keys(workerData).forEach((fullName) => {
      Object.assign(obj[fullName], workerData[fullName]);
    });
    return Object.values(obj);
  }
  // 收到 worker 数据
  onReceiveData(event) {
    const receiveData = event.data;
    if (isArray(receiveData)) {
      console.log('array true');
      this.setState({
        repos: receiveData,
        repo: null,
      });
    } else {
      this.setState({ repo: receiveData });
    }
  }
  // 初始化数据请求
  initialData() {
    api.getRandomRepos().then((result) => {
      if (result) {
        this.setState({ repos: result });
        // 向 worker 发送数据
        MyWorker.postMessage(result);
      }
    });
  }
  showRepos() {
    const { repos, repo } = this.state;
    if (this.state.repo) {
      return (<Repo repo={repo} />);
    }
    if (repos.length) {
      return repos.map(r => <Repo key={r._id} repo={r} />);
    }
    return (
      <div>
        没有随机到数据(*&gt;﹏&lt;*)
        <Button onClick={this.initialData} size="small" icon="reload">再试一次</Button>
      </div>
    );
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