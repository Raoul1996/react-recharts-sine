/**
 * Created by out_xu on 17/3/16.
 */
import React, {Component} from 'react'
import {message, Form, Input, Button, Checkbox} from 'antd'
import {rounding, calcSine} from '../utils'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
// use css modules
import style from './app.less'

const FormItem = Form.Item
const {TextArea} = Input
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
}

@Form.create()
class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sin: {},
      data: [], array: []
    }
    this.createSineTable = this.createSineTable.bind(this)
  }

  componentDidMount() {
    this.createSineTable(100, 200, 3)
  }

  /**
   * 计算sinTable
   * @param {number} max 幅值最大值
   * @param {number} num 计算的点数
   * @param {number} bit 保留的位数
   */
  createSineTable = (max, num, bit) => {
    const sine = calcSine(num) || []
    const {xIndex, sineRes} = sine
    const data = sineRes.map((item, index) => {
      const res = rounding((item * 0.5 + 0.5) * max, bit, true)
      return Object.assign({}, {sine: res}, {xIndex: xIndex[index]})
    }) || []
    const array = sineRes.map(item => {
      return rounding((item * 0.5 + 0.5) * max, bit, true)
    }) || []
    this.setState({
      data, array
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {max, number, bit} = values
        this.createSineTable(max, number, bit)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {data, array} = this.state
    return (
      <div className={style.app}>
        <h1 className={style.title}>SPWM波生成器</h1>
        <div className={style.workplace}>
          <div className={style.arguments}>
            <Form onSubmit={this.handleSubmit} className={style.form}>
              <FormItem {...formItemLayout} label="幅值">
                {getFieldDecorator('max', {
                  rules: [{
                    required: true,
                    message: '请输入幅值最大值'
                  }]
                })(
                  <Input placeholder="请输入幅值最大值"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="点数">
                {getFieldDecorator('number', {
                  rules: [{
                    required: true,
                    message: '请输入点数'
                  }]
                })(
                  <Input placeholder="请输入点数"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="保留位数">
                {getFieldDecorator('bit', {
                  rules: [{
                    required: true,
                    message: '请输入保留位数'
                  }]
                })(
                  <Input placeholder="请输入保留位数"/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </FormItem>
            </Form>
          </div>
          <TextArea autosize={false} style={{resize: 'vertical'}} rows="11"
                    className={style.textArea} value={array.length > 0 ? array : '在这里显示正弦表数据'}/>
        </div>
        <div className={style.charts}>
          <LineChart className={style.lineChart} width={1100} height={300} data={data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="xIndex"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="sine" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
        </div>
      </div>
    )
  }
}

export default AppComponent
