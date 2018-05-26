import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag, Icon } from 'antd';

import BaseLink from '@/components/BaseLink';

const Title = ({ repo }) => {
  if (repo.homepage) {
    return (
      <BaseLink key="repo-name" url={repo.homepage}>
        <Icon type="home" />
        { repo.name }
      </BaseLink>
    );
  }
  return repo.name;
}

const Extra = ({ repo }) => [
  <BaseLink key="github-page" url={repo.githubPage}>
    {/* <Icon type="github" /> */}
    <Button size="small" icon="github" />
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
        // hoverable
        loading={!repo}
        title={<Title repo={repo} />}
        extra={<Extra repo={repo} />}
      >
        <div>{ repo.describe }</div>
        <div>
          {/* TODO: Tag 抽象 */}
          { repo.isBrowser && <Tag color="blue">浏览器</Tag> }
          { repo.isNodejs && <Tag color="green">Node</Tag> }
          { repo.isNotMaintained && <Tag color="red">不再维护</Tag>}
          { repo.isDeprecated && <Tag color="orange">过时</Tag> }
          { repo.isArchived && <Tag color="geekblue">归档</Tag> }
          { repo.isStabilized && <Tag color="lime">稳定</Tag> }
        </div>
      </Card>
    );
  }
}

export default Repo;