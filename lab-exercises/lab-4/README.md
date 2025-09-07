# Stream Some Content

The following code creates a stream with a built-in delay when the `stream` function is called:

```js
const { Readable, Transform } = require('stream');

function stream() {
  const readable = Readable.from(
    ['this', 'is', 'a', 'stream', 'of', 'data'].map(s => s + '<br>')
  );
  const delay = new Transform({
    transform(chunk, enc, cb) {
      setTimeout(cb, 500, null, chunk);
    }
  });
  return readable.pipe(delay);
}
```

Using either Fastify or Express, create a new route at path `/data` and send the data from this stream to the response when the `/data` route is requested.

**Example using Fastify:**