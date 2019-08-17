---
path: "/article/react/trigger-element"
date: "2019-08-13"
title: "The Trigger Element pattern"
category: "react"
---

If you have done some projects with *ReactJS*, you have probably encountered very repetitive code snippets.
For instance, writing a toggle to open a **Modal** component used to look like this :

```jsx harmony
// ShareModal.tsx
import * as React from 'react'
import Modal from '@components/Modal'

import ShareForm from '@components/ShareForm'


class ShareModal extends React.Component {
  state = {
    isOpened: false,
  }

  handleModalOpen = () => this.setState({ isOpened: true })
  handleModalClose = () => this.setState({ isOpened: false })

  render () {
    return (
      <React.Fragment>
        <button onClick={this.handleModalOpen}>Share !</button>
        <Modal open={this.state.isOpened} onClose={this.handleModalClose}>
          <ShareForm {...this.props} />
        </Modal>
      </React.Fragment>
    ) 
  }
}

export default ShareModal
```

A few months ago, hooks came out and reduced the boilerplate for these simple state scenarios.

```jsx harmony
// ShareModal.tsx
import * as React from 'react'
import Modal from '@components/Modal'

import ShareForm from '@components/ShareForm'

const ShareModal = props => {
  const [isOpened, setOpened] = React.useState(false)

  const handleModalOpen = () => setOpened(true)
  const handleModalClose = () => setOpened(false)

  return (
    <React.Fragment>
      <button onClick={handleModalOpen}>Share !</button>
      <Modal open={isOpened} onClose={handleModalClose}>
        <ShareForm {...props} />
      </Modal>
    </React.Fragment>
  ) 
}

export default ShareModal
```

Yet, it still feels like there is a lot of useless boilerplate here. We are writing about 20 lines of code just to create a Button and to link it with the modal.

When I try to solve a problem, I like to first take a look at the code I would like to write. 
In this problem, the part that I try to get rid of, is the toggle management represented by these three statements :

```jsx harmony
const [isOpened, setOpened] = React.useState(false)

const handleModalOpen = () => setOpened(true)
const handleModalClose = () => setOpened(false)
```

Of course, removing these three lines leaves us with an error.

```jsx harmony
// Error: handleModalOpen, handleModalClose and isOpened are not defined
const ShareModal = props => (
  <React.Fragment>
    <Button onClick={handleModalOpen}>Share !</Button>
    <Modal open={isOpened} onClose={handleModalClose}>
      <ShareForm {...props} />
    </Modal>
  </React.Fragment>
)
```

The idea here is to let the modal handle the toggling behavior.

```jsx harmony
// ShareModal.tsx
import * as React from 'react'
import Modal from '@components/Modal'
import ShareForm from '@components/ShareForm'

const ShareModal = props => (
  <Modal triggerElement={<Button>Share !</Button>}>
    <ShareForm {...props} />
  </Modal>
)

export default ShareModal
```


### Basic implementation

Our goal is to isolate the redundant parts into a High Order Components that will wrap components like Modal, Menu or Drawer.

```jsx harmony
// withTriggerElement.tsx
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

```jsx harmony
// Modal.tsx
import * as React from 'react'
import withTriggerElement from '@helpers/withTriggerElement'

const Modal = () => {
  /* My old modal component untouched */
}

export default withTriggerElement(Modal)
```

```jsx harmony
import * as React from 'react'
import Modal from '@components/Modal'
import ShareForm from '@components/ShareForm'

const ShareModal = props => (
  <Modal triggerElement={<Button>Share !</Button>}>
    <ShareForm {...props} />
  </Modal>
)

export default ShareModal
```

### What is missing ?

Most of the time, the first draft handle the basic use cases but you will soon reach scenarios where it doesn't work.
Let's focus on some basic ones :

#### What if I don't want to use a trigger element on a specific modal ?

This is probably the easiest scenario. You just have to check of *triggerElement* exist and to do nothing if it doesnt.

```jsx harmony
// withTriggerElement.tsx
import * as React from 'react'

const withTriggerElement = WrappedComponent => {
  const Wrapper = ({ triggerElement, ...rest }) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // highlight-start
    if (!triggerElement) {
      return <WrappedComponent {...rest} />
    }
    // highlight-end

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

#### What if I pass a custom onClose property to my modal ?

