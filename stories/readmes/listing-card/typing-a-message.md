# Messages Tab - Typing a Message

When the user begins typing a message:
1. The message field should grow vertically with the length of the message.
2. When the message area reaches a maximum height (~50% of the card vertical height), a scrollbar should appear in the message box to handle the overflow.
3. The user must click `send` to send the message.  Pressing 'return' should only insert a new line, it **should not** be a shortcut for `send`.

![](http://i.imgur.com/B6xP5UU.png)

### Event Handlers

When the user clicks the "Send" button, a `handler` should invoke a `handler callback` with a signature like this:

```
  sendMessage(listingID: string, messageBody: string,  attachments: null
    )
  ```
