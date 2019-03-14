import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import Http from '../../utils/http';

import './index.scss'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

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
class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log('this.props=====' + this.props, "nextProps=====" + nextProps)
  }

  componentWillMount() {
    this.props
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goTo = () => {
    // Taro.navigateTo({url:'/pages/help/index'})
    Http.setRequestHeader({"Authorization": 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4bSIsIm5hbWUiOiLnhormoqYiLCJ1c2VySWQiOiI4NDEiLCJ0ZWxQaG9uZSI6IjEyMzQ1Njc4OTAiLCJyZW1hcmsiOiIiLCJkZWFsZXJDb2RlIjoiMDAwMDAiLCJkZWFsZXJOYW1lIjoi5bm_5rG95Liw55Sw5rG96L2m5pyJ6ZmQ5YWs5Y-4IiwidXNlck5hbWUiOiLnhormoqYiLCJraWNrT3V0IjpmYWxzZSwiZXhwIjoxNTczMDQxMTc4fQ.pH7iVdBkgH9B9OJdJMnPo3BC0b8p5co929dmXdzDfe4ooQQtKXqBA_YCvuAtfzpVGzsNPkjWEFy4fCHEZg2yWHFiBGiM5dqMB9sZly4KgJAEOy1EXlTtr0mnhzg5oHY3tMyQoylgh1zDReJxYYb7oJO03T4-nWIV83CYxt4LmZs'})
    Http.get('/api/intention/H5ManageController/carColorInfoTest', { carMode: 'C-HR' }, res => {
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
        <Button className='dec_btn' onClick={this.goTo}>页面跳转测试</Button>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
