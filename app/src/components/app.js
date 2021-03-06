/**
 * Created by out_xu on 17/3/16.
 */
import React, {Component} from 'react'
import {message, Form, Input, Button, Spin} from 'antd'
import {rounding, calcSine} from '../utils'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import CopyToClipboard from 'react-copy-to-clipboard'
// use css modules
import style from './app.less'

const FormItem = Form.Item
const {TextArea} = Input
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
}

@Form.create()
class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      array: [],
      loading: false
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
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          this.setState({loading: true})
          const {max, number, bit} = values
          if (!max.isNumber) {
            message.error('请输入数字')
          }
          this.createSineTable(max, number, bit)
          this.setState({
            loading: false
          })
          message.success('数据生成成功，并成功拷贝到剪切板')
        } catch (e) {
          this.setState({
            loading: false
          })
          message.error('出现错误')
          console.log(e)
        }
      }
    })
  }
  handleCopy = (e) => {
    try {
      this.setState({copied: true})
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {data, array, loading} = this.state
    return (
      <Spin size="large" spinning={loading}>
        <div className={style.app}>
          <h1 className={style.title}>正弦表生成器</h1>
          <div className={style.workplace}>
            <div className={style.arguments}>
              <Form onSubmit={this.handleSubmit} className={style.form}>
                <FormItem {...formItemLayout} label="幅值">
                  {getFieldDecorator('max', {
                    rules: [{
                      required: true,
                      message: '请输入幅值'
                    }]
                  })(
                    <Input placeholder="请输入幅值"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="关键点数">
                  {getFieldDecorator('number', {
                    rules: [{
                      required: true,
                      message: '请输入关键点数目'
                    }]
                  })(
                    <Input placeholder="请输入关键点数目"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="保留位数">
                  {getFieldDecorator('bit', {
                    rules: [{
                      required: true,
                      message: '请输入最大保留位数'
                    }]
                  })(
                    <Input placeholder="请输入保留位数"/>
                  )}
                </FormItem>
                <FormItem>
                  <CopyToClipboard text={array} onCopy={this.handleCopy}>
                    <Button type="primary" htmlType="submit">
                      Create&&Copy
                    </Button>
                  </CopyToClipboard>
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
      </Spin>
    )
  }
}

export default AppComponent
