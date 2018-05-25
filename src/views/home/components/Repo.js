import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag } from 'antd';

import BaseLink from '@/components/BaseLink';

const Title = ({ repo }) => {
  if (repo.homepage) {
    return <BaseLink key="repo-name" url={repo.homepage}>{ repo.name }</BaseLink>;
  }
  return `${repo.name}(无官网)`;
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
          { repo.isBrowser && <Tag color="#4285f4">Browser</Tag> }
          { repo.isNodejs && <Tag color="#34a853">Node.js</Tag> }
          { repo.isMaintain && <Tag color="#fbbc05">Not Maintain</Tag>}
          { repo.isDeprecated && <Tag color="#ea4335">Deprecated</Tag> }
        </div>
      </Card>
    );
  }
}

export default Repo;