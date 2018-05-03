import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button } from 'antd';
import BaseSearch from '@/components/BaseSearch';
import * as api from '../api';

const FormItem = Form.Item;
const { TextArea } = Input;

class Admin extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
    this.onUpdate = this.onUpdate.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  // 更新数据
  onUpdate(e) {
    const { token } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        api.updateRepo({
          token,
          repo: values,
        });
      }
    });
  }
  // 重置表单
  onReset() {
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { token } = this.state;
    return (
      <div style={{ padding: 10 }}>
        <Input placeholder="TOKEN" value={token} style={{ margin: '10px 0' }} />
        <BaseSearch
          onSearch={() => {}}
          onSelect={() => {}}
        />
        <Form style={{ marginTop: 5 }}>
          <FormItem>
            {getFieldDecorator('email')(
              <Input placeholder="Package name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('homepage')(
              <Input placeholder="homepage" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('githubPage')(
              <Input placeholder="githubPage" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('describe')(
              <TextArea placeholder="describe" row="4" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.onUpdate}>新增/更新</Button>
            <Button onClick={this.onReset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedAdmin = Form.create()(Admin);
export default WrappedAdmin;