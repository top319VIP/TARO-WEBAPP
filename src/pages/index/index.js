import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import Http from '../../utils/http';

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    x: [1, 2]
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  goTo = () => {
    // Taro.navigateTo({url:'/pages/index2/index'})
    Http.setRequestHeader({"Authorization": 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4bSIsIm5hbWUiOiLnhormoqYiLCJ1c2VySWQiOiI4NDEiLCJ0ZWxQaG9uZSI6IjEyMzQ1Njc4OTAiLCJyZW1hcmsiOiIiLCJkZWFsZXJDb2RlIjoiMDAwMDAiLCJkZWFsZXJOYW1lIjoi5bm_5rG95Liw55Sw5rG96L2m5pyJ6ZmQ5YWs5Y-4IiwidXNlck5hbWUiOiLnhormoqYiLCJraWNrT3V0IjpmYWxzZSwiZXhwIjoxNTczMDQxMTc4fQ.pH7iVdBkgH9B9OJdJMnPo3BC0b8p5co929dmXdzDfe4ooQQtKXqBA_YCvuAtfzpVGzsNPkjWEFy4fCHEZg2yWHFiBGiM5dqMB9sZly4KgJAEOy1EXlTtr0mnhzg5oHY3tMyQoylgh1zDReJxYYb7oJO03T4-nWIV83CYxt4LmZs'})
    Http.get('/api/intention/H5ManageController/carColorInfoTest', res => {
      console.log(res)
    })
  }


  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <Button className='dec_btn' onClick={this.goTo.bind(this)}>页面跳转测试</Button>
      </View>
    )
  }
}


