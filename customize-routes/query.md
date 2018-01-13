---
title: Query Parameters & Filtering
---

The default `find` block automatically implements 'Find All' and 'Find by Id' endpoints, but does not include support for query parameters or filtering results out of the box. To allow for filtering, you need to include the `query()` function in your `find` block.

#### query()

The `query()` function receives the Express request object as the only parameter. It _must_ return an object that follows the [Mongo query syntax](https://docs.mongodb.com/manual/tutorial/query-documents/). In most use cases, the function simply translates the query parameters, `req.query`, into a valid query document.

In the below example, if a request for `messages` includes query parameters such as `GET /messages?label=unread`, the function will return a Mongo query document asking for all messages with the label 'unread'.

```javascript
// server/routes/v1/message.js

module.exports.autoroute = autorouteJson({
  model: Message,
  resource: 'message'

  find: {
    // translate params before querying database
    query(req) {
      // if param for 'label' exists
      if (req.query.label) {
        // query database for messages with matching 'label' attribute
        return {
          label: req.query.label,
        }
      }
    }
  }
});
```

#### Mongo query selectors

MongoDB has many [query selectors](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors) that can be used to construct complex query documents to filter your results. Consider the following request for `shirts`:

```
GET /shirts?color=blue&maxCost=100&minCost=50&size=XL
```

Our `query()` function needs to return a query document for blue shirts in size XL with a cost between $50 and $100. Using Mongo's query selectors, we can evaluate comparisons like 'greater-than-or-equal' ($gte). In the example below, we return a query document that will filter results to only those that match the specified size, color, and cost range:

```javascript
// server/routes/v1/message.js

module.exports.autoroute = autorouteJson({
  model: Message,
  resource: 'message'

  find: {
    query(req) {
      return {
        color: req.query.color, // blue
        size: req.query.size, // XL
        cost: { $and: [ // must fulfill both comparisons:
          { $gte: req.query.minCost }, // greater-than-or-equal to $50
          { $lte: req.query.maxCost }, // shirt.cost is lesser-than-or-equal to $100
        ]},
      }
    }
  }
});
```

Full documentation of Mongo's various query operators can be found on their [site](https://docs.mongodb.com/manual/reference/operator/query/).
