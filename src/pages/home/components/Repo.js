import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

import BaseLink from '@/components/BaseLink';

const Title = ({ repo }) => [
  <BaseLink key="repo-name" url={repo.homepage}>{ repo.name }</BaseLink>,
];
const Extra = ({ repo }) => [
  <BaseLink key="github-page" url={repo.githubPage}>
    <Icon type="github" />
  </BaseLink>,
];

class Repo extends Component {
  static defaultProps = {
    repo: null,
  }
  static propTypes = {
    repo: PropTypes.object,
  }
  render() {
    const { repo } = this.props;
    return (
      <Card
        title={<Title repo={repo} />}
        extra={<Extra repo={repo} />}
      >
        { repo.describe }
      </Card>
    );
  }
}

export default Repo;