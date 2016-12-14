# Messages Tab - Save Message Template

The user should be able to save a message they've previously sent. By clicking "Save as Template," a dialogue should appear that allows the user to enter a name for this saved message.

![](http://i.imgur.com/c1CwH55.png)

### Event Handlers

When the user clicks the "Save" button, a `handler` should invoke a `handler callback` with a signature like this:

```
  saveTemplate(templateName: string, templateBody: string,  attachment: null)
  ```

  ### Props
```
...otherProps,
messages: Immutable.List([ {
    message123: {
      body: "Hi, can you tell me if the laundry for this apartment is in-unit or shared?",
      authorName: "Me",
      timestamp: 1235314314 // a unix epoch timestamp
      authorUID: "user123456"
  }]),
agentEmail: 'AgentAnnie@gmail.com'
```
