---
path: "/article/react/trigger-element"
date: "2019-08-19"
title: "The Trigger Element pattern"
category: "react"
---

If you have done some projects with *ReactJS*, you have probably encountered very repetitive code snippets.
For instance, writing a toggle to open a **Modal** component used to look like this :

```jsx
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

A few months ago, hooks came out and reduced slightly the boilerplate for these simple state scenarios.

```jsx
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

Yet, it still feels like there is a lot of useless code here. We are writing about 20 lines just to create a Button and to link it with the modal.

---
### How could we improve this ?

Before creating a non-trivial function, try to first take a look at what a code using it should look like.

In this problem, the part that we try to get rid of, is the toggle management represented by these three statements :

```jsx
const [isOpened, setOpened] = React.useState(false)

const handleModalOpen = () => setOpened(true)
const handleModalClose = () => setOpened(false)
```

As expected, removing these three lines leaves us with an error.

```jsx
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

```jsx
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

---
### Basic implementation

Our goal is to isolate the redundant parts into a *High Order Components* that will wrap components like modals, menus or drawers.

The behavior of this function is pretty straightforward. 
We are using *React.cloneElement* to inject our *handleOpen* property into the trigger element and given our *handleClose* to the wrapped component.

```jsx
// withTriggerElement.tsx
import * as React from 'react'

const withTriggerElement = WrappedComponent => {
  const Wrapper = ({ triggerElement, onClose, ...rest }) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
      <React.Fragment>
        // highlight-start
        {React.cloneElement(triggerElement, { onClick: handleOpen })}
        // highlight-end
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

```jsx
// Modal.tsx
import * as React from 'react'
import withTriggerElement from '@helpers/withTriggerElement'

const Modal = () => {
  /* My old modal component untouched */
}

export default withTriggerElement(Modal)
```

```jsx
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

---
### What is missing ?

Most of the time, the first draft handle the basic use cases but you will soon reach scenarios where it doesn't work.
Let's focus on some basic ones :

#### What if we don't want to use a trigger element on a specific modal ?

This is probably the easiest scenario. You just have to check if *triggerElement* exists and to do nothing if it doesnt.

```jsx
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

#### What if we pass a custom onClose / open property to my modal ?

When you build a High Order Component which inject props into your component, always check the scenario where a component gives you a property with the same name.

##### Passing "open" + "triggerElement"

For this HOC, we don't want to handle this scenario because it does not make sense.
If we give a *triggerElement* to the modal, it's because we don't want to handle to toggling behavior.

```jsx
const ShareModal = props => (
  <Modal triggerElement={<Button>Share !</Button>} open={false}>
    <ShareForm {...props} />
  </Modal>
)
```

##### Passing "onClose" + "triggerElement"

For the *onClose* property, it is different because you may want to trigger some logic when the user closes the modal (tracking, closing subscription etc...)

```jsx
const ShareModal = props => (
  <Modal 
    triggerElement={<Button>Share !</Button>} 
    onClose={() => window.analytics.track('User closed the modal')}
  >
    <ShareForm {...props} />
  </Modal>
)
```

```jsx
// withTriggerElement.tsx
import * as React from 'react'

const withTriggerElement = WrappedComponent => {
  const Wrapper = ({ triggerElement, onClose, ...rest }) => {
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)

    // highlight-start
    const handleClose = (...args) => {
      setOpen(false)

      if (onClose) {
        return onClose(...args)
      } 
    }
    // highlight-end

    if (!triggerElement) {
      return <WrappedComponent {...rest} />
    }

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

#### What if we have two buttons to open the same modal ?

If we continue to search for corner case, we will try to find these kind of weird scenarios.
Or course we could rework our High Order Components to take two *triggerElement*, or even references to other buttons if there are not next to one another. 
But this would make our whole code a lot heavier and harder to read for just a few weird scenarios that will rarely happens.

This is why it is important to let the component pass manually *onClose* and *open* if he wants to. That way, you are never blocking any weird corner case.


```jsx
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
      <span>There is something between those buttons</span>
      <button onClick={handleModalOpen}>Share n°2 !</button>
      <Modal open={isOpened} onClose={handleModalClose}>
        <ShareForm {...props} />
      </Modal>
    </React.Fragment>
  ) 
}

export default ShareModal
```

---
### Recap

- When you are building a reusable function, try to first ask yourself *"What should the function call look like ?"*

- Focus on a simple implementation that will cover most of the use cases.

- Don't make your method incomprehensible by trying to handle every use case imaginable.
