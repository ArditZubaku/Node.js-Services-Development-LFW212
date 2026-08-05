import { Injectable } from '@nestjs/common';
import { Readable, Transform } from 'stream';

@Injectable()
export class StreamService {
    getStream(): NodeJS.ReadableStream {
        const readable = Readable.from(
            ['this', 'is', 'a', 'stream', 'of', 'data'].map((s) => s + '<br>')
        );
        const delay = new Transform({
            transform(chunk, enc, cb) {
                setTimeout(cb, 500, null, chunk);
            },
        });
        return readable.pipe(delay);
    }
}
