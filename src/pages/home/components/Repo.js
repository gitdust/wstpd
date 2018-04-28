import React, { Component } from 'react';
import { Card, Icon } from 'antd';

const Title = (props) => [
  <Icon key="homepage" className="repo-homepage" type="chrome" />,
  <Icon key="github-homepage" className="repo-homepage" type="github" />,
  <span key="repo-name" className="repo-name">{props.repoName}</span>
];
const Extra = () => (
  <div>
    <Icon type="star" /> 555364
  </div>
)

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <Card
        loading={this.state.loading}
        title={<Title repoName="react" />}
        extra={<Extra />}
      >
        Whatever content
      </Card>
    );
  }
}

export default Repo;