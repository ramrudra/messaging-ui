import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import { ListItem } from 'material-ui/List'
// to fix bug in material-ui caused by normalize.css
// https://github.com/callemall/material-ui/issues/4008

export class FixedMenuItem extends React.Component {


  render() {
    const { style, children, ...other } = this.props
    return (
      <MenuItem
        style={{ WebkitAppearance: "none", ...style }}
        {...other}
        >
        {children}
      </MenuItem>
    )
  }

}

export class FixedListItem extends React.Component {


  render() {
    const { style, children, ...other } = this.props
    return (
      <ListItem
        style={{ WebkitAppearance: "none", ...style }}
        {...other}
        >
        {children}
      </ListItem>
    )
  }

}

export default FixedMenuItem
