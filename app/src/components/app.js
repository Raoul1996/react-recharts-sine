/**
 * Created by out_xu on 17/3/16.
 */
import React, {Component} from 'react'
import {message, Form, Input, Button, Checkbox} from 'antd'
import 'antd/lib/style/index.css'
// use css modules
import style from './app.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8}
}
const formTailLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8, offset: 4}
}

@Form.create()
class AppComponent extends Component {
  state = {
    checkNick: false
  }
  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success')
        }
      }
    )
  }
  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked
    }, () => {
      this.props.form.validateFields(['nickname'], {force: true})
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div className={style.app}>
        <h1 className={style.title}>SPWM波生成器</h1>
        <div className={style.workplace}>
          <div className={style.arguments}>
            <div>
              <FormItem {...formItemLayout} label="Name">
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: 'Please input your name'
                  }]
                })(
                  <Input placeholder="Please input your name"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Nickname">
                {getFieldDecorator('nickname', {
                  rules: [{
                    required: this.state.checkNick,
                    message: 'Please input your nickname'
                  }]
                })(
                  <Input placeholder="Please input your nickname"/>
                )}
              </FormItem>
              <FormItem {...formTailLayout}>
                <Checkbox
                  value={this.state.checkNick}
                  onChange={this.handleChange}
                >
                  Nickname is required
                </Checkbox>
              </FormItem>
              <FormItem {...formTailLayout}>
                <Button type="primary" onClick={this.check}>
                  Check
                </Button>
              </FormItem>
            </div>

          </div>
          <div className={style.charts}>在这里显示图表</div>
        </div>
      </div>
    )
  }
}

export default AppComponent
