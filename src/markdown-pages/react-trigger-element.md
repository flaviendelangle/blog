---
path: "/article/react/trigger-element"
date: "2019-08-13"
title: "The Trigger Element pattern"
category: "react"
---

If you have written some code with *ReactJS*, you have probably encountered very repetitive portions of code.
For instance, writing a toggle to open a **Modal** component used to look like this :

```jsx harmony
import * as React from 'react'
import { Modal, Button } from '@habx/thunder-ui'

import { ShareForm } from '@components/organisms'

class ShareModal extends React.Component {
  state = {
    isOpened: false,
  }

  handleModalOpen = () => this.setState({ isOpened: true })
  handleModalClose = () => this.setState({ isOpened: false })

  render () {
    return (
      <React.Fragment>
        <Button onClick={this.handleModalOpen}>Share !</Button>
        <Modal open={this.state.isOpened} onClose={this.handleModalClose}>
          <ShareForm {...this.props} />
        </Modal>
      </React.Fragment>
    ) 
  }
}
```

The a few months ago, hooks came and reduced the boilerplate for these simple state scenarios.

```jsx harmony
import * as React from 'react'
import { Modal, Button } from '@habx/thunder-ui'

import { ShareForm } from '@components/organisms'

const ShareModal = props => {
  const [isOpened, setOpened] = React.useState(false)

  const handleModalOpen = () => setOpened(true)
  const handleModalClose = () => setOpened(false)

  return (
    <React.Fragment>
      <Button onClick={handleModalOpen}>Share !</Button>
      <Modal open={isOpened} onClose={handleModalClose}>
        <ShareForm {...props} />
      </Modal>
    </React.Fragment>
  ) 
}
```

But it still feel like there is a lot of useless boilerplate here. We are writing about 20 lines of code just to create a Button and to link it with the modal.


```jsx harmony
import * as React from 'react'
import { Modal, Button } from '@habx/thunder-ui'

import { ShareForm } from '@components/organisms'

const ShareModal = props => (
  <Modal triggerElement={<Button>Share !</Button>}>
    <ShareForm {...props} />
  </Modal>
)
```


### Basic implementation

Our goal here, is to isolate the redundant parts into a High Order Components that will wrap components like Modal, Menu or Drawer.

```jsx harmony
import * as React from 'react'

const withTriggerElement = WrappedComponent => {
  const Wrapper = ({ triggerElement, onClose, ...rest }) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
      <React.Fragment>
        {React.cloneElement(triggerElement, { onClick: handleOpen })}
        <WrappedComponent
          {...rest}
          open={open}
          onClose={handleClose}
        />
      </React.Fragment>
    )
  }

  return Wrapper
}
```
