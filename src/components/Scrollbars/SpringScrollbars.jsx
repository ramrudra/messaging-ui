// https://github.com/malte-wessel/react-custom-scrollbars/blob/master/examples/simple/components/SpringScrollbars/SpringScrollbars.js

import React, { createClass } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { SpringSystem, MathUtil } from 'rebound'

export default createClass({

  displayName: 'SpringScrollbars',

  componentDidMount() {
    this.springSystem = new SpringSystem()
    this.spring = this.springSystem.createSpring()
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate })
  },

  componentWillUnmount() {
    this.springSystem.deregisterSpring(this.spring)
    this.springSystem.removeAllListeners()
    this.springSystem = undefined
    this.spring.destroy()
    this.spring = undefined
  },

  getScrollTop() {
    return this.refs.scrollbars.getScrollTop()
  },

  getScrollHeight() {
    return this.refs.scrollbars.getScrollHeight()
  },

  getHeight() {
    return this.refs.scrollbars.getHeight()
  },

  scrollTop(top) {
    this.spring.setEndValue(top)
  },

  handleSpringUpdate(spring) {
    const { scrollbars } = this.refs
    const val = spring.getCurrentValue()
    scrollbars.scrollTop(val)
  },

  render() {
    return (
      <Scrollbars
        {...this.props}
        ref='scrollbars'
      />
    )
  }
})
