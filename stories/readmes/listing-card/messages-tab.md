# Messages Tab - No Messages

When the component is passed an empty message list, it should look like this.  This state is different than the `default` state (when the `Info` tab is active).  Specifically:

1. The image is now a thumbnail in the upper left.
2. `Mouse hovers` no longer raise thumbnail images.
3. The rating stars have been replaced with the email address of the person the user is sending a message to.
4. The bottom portion of the card is replaced by the messaging interface.

### Props
```
...otherProps,
messages: Immutable.List([])
agentEmail: 'AgentAnnie@gmail.com'
```

![](http://i.imgur.com/KBqyWt8.png)
