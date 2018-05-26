import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button, Row, Col, Checkbox } from 'antd';
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
    this.onInputChange = this.onInputChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  onInputChange(e) {
    this.setState({ token: e.target.value });
  }
  // 更新数据
  onUpdate(e) {
    const { token } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log(values);
      if (!err) {
        api.updateRepo({
          token,
          repo: values,
        }).then((result) => {
          if (result) {
            this.onReset();
          }
        });
      }
    });
  }
  // 重置表单
  onReset() {
    this.props.form.resetFields();
  }
  // 选择
  onSelect(repo) {
    const fields = {};
    Object.keys(repo).forEach((key) => {
      fields[key] = { value: repo[key] }
    });
    // console.log(fields);
    this.props.form.setFields(fields);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { token } = this.state;
    return (
      <div style={{ padding: 10 }}>
        <Input placeholder="TOKEN" value={token} onChange={this.onInputChange} style={{ margin: '10px 0' }} />
        <BaseSearch onSelect={this.onSelect} />
        <Form style={{ marginTop: 5 }}>
          <FormItem label="包名称">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [{ required: true, message: '请输入包名称' }],
            })(
              <Input placeholder="Package name" />,
            )}
          </FormItem>
          <FormItem label="官方主页">
            {getFieldDecorator('homepage', {
              initialValue: '',
            })(
              <Input placeholder="homepage" />,
            )}
          </FormItem>
          <FormItem label="Github主页">
            {getFieldDecorator('githubPage', {
              initialValue: '',
            })(
              <Input placeholder="githubPage" />,
            )}
          </FormItem>
          <FormItem label="作用描述">
            {getFieldDecorator('describe', {
              initialValue: '',
            })(
              <TextArea placeholder="describe" row="4" />,
            )}
          </FormItem>
          <Row>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isBrowser', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>浏览器</Checkbox>,
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isNodejs', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>Node.js</Checkbox>,
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isDeprecated', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>过时</Checkbox>,
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isNotMaintained', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>不在维护</Checkbox>,
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isArchived', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>归档</Checkbox>,
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                {getFieldDecorator('isStabilized', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>稳定</Checkbox>,
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="">
            <Button type="primary" onClick={this.onUpdate} style={{ marginRight: '8px' }}>新增/更新</Button>
            <Button onClick={this.onReset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedAdmin = Form.create()(Admin);
export default WrappedAdmin;