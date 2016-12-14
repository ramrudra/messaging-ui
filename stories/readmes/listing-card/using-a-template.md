# Messages Tab - Using a Template

The user should be able send a saved message to a new recipient. When the user clicks the "SAVED" button in an empty text box, they're presented with a list of messages they've saved before (a.k.a., "template").  Clicking a template inserts the text into the body, but __it doesn't send the message__.

![](http://i.imgur.com/nFANDhk.png)

### Event Handlers

When the user clicks "Use", the text of the template should populate the text field.  This action will not trigger a `callback` from the parent.

**Note:** It isn't pictured here, but templates can include file attachments, too.

  ### Props

```
...otherProps,
messages: Immutable.List([ {
    message123: {
      body: "Hi, can you tell me if the laundry for this apartment is in-unit or shared?",
      authorName: "Me",
      timestamp: 1235314314 // a unix epoch timestamp
      authorUID: "user123456"
  },
  message: 124: { // the response message
    body: "Hello!  The laundry ...",// etc etc
    authorName: "Agent Annie",
    timestamp: 1235314314, // a unix epoch timestamp
    authorUID: "userABC",
    authorName: "Agent Annie",
    timestamp: 1235314314 // a unix epoch timestamp
  }]),
agentEmail: 'AgentAnnie@gmail.com',
savedTemplates: Immutable.List([
  {
    title: 'Laundry Question',
    body: 'Hi, can you tell me whether the laundry...', // etc
    attachment: null
  },
  {
    title: 'Interested in Viewing',
    body: 'Hi, can you tell me whether the laundry...', // etc
    attachment: null
  }
])
```
