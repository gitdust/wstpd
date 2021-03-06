import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag, Icon, Spin } from 'antd';

import BaseLink from '@/components/BaseLink';
import { Thousandth } from '@/utils/tools';

import style from '../Home.less';

const Title = ({ repo }) => {
  if (repo.homepage) {
    return (
      <BaseLink key="repo-name" url={repo.homepage}>
        { repo.homepage && <Icon type="home" /> }
        { repo.name }
      </BaseLink>
    );
  }
  return repo.name;
}

const Extra = ({ repo }) => [
  <BaseLink key="github-page" url={repo.githubpage}>
    <Button size="small" icon="github">{ Thousandth(repo.star) || <Spin size="small" /> }</Button>    
  </BaseLink>,
];

class Repo extends Component {
  static propTypes = {
    repo: PropTypes.object,
  }
  static defaultProps = {
    repo: null,
  }
  render() {
    const { repo } = this.props;
    return (
      <div className={style.repo}>
        <div className={style.title}>
          <Title repo={repo} />
          <Extra repo={repo} />
        </div>
        <div className={style.content}>
          { repo.describe }
        </div>
        <div className={style.tags}>
          {/* TODO: Tag 抽象 */}
          { repo.isBrowser && <Tag color="blue">浏览器</Tag> }
          { repo.isNodejs && <Tag color="green">Node</Tag> }
          { repo.isNotMaintained && <Tag color="red">不再维护</Tag>}
          { repo.isDeprecated && <Tag color="orange">过时</Tag> }
          { repo.isArchived && <Tag color="geekblue">归档</Tag> }
          { repo.isStabilized && <Tag color="lime">稳定</Tag> }
        </div>
      </div>
      // <Card
      //   // hoverable
      //   loading={!repo}
      //   title={<Title repo={repo} />}
      //   extra={<Extra repo={repo} />}
      // >
      //   <div>{ repo.describe }</div>
      //   <div>

      //   </div>
      // </Card>
    );
  }
}

export default Repo;