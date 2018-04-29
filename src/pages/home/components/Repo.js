import React, { Component } from 'react';
import { Card, Icon } from 'antd';

const Title = (props) => [
  <a key="repo-name" className="repo-name" href={props.githubPage}>{props.repoName}</a>,
  <Icon key="homepage" className="repo-homepage" type="chrome" />,
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