import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Injectable()
export class ProxyService {
    private readonly targetUrl = 'https://jsonplaceholder.typicode.com';

    async proxyRequest(req: Request, res: Response): Promise<void> {
        try {
            const targetPath = req.path;
            const targetUrl = `${this.targetUrl}${targetPath}`;

            const response = await axios({
                method: req.method as any,
                url: targetUrl,
                data: req.body,
                headers: {
                    ...req.headers,
                    host: undefined, // Remove host header to avoid conflicts
                },
                params: req.query,
                responseType: 'stream',
            });

            // Set response headers
            Object.keys(response.headers).forEach(key => {
                res.setHeader(key, response.headers[key]);
            });

            // Set status code
            res.status(response.status);

            // Pipe the response data
            response.data.pipe(res);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500);
                res.send(error.response?.data || 'Proxy Error');
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
}
