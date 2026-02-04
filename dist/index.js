import http from 'node:http';
import { hello } from '#hello';
import moment from 'moment';
const requestListener = (_req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.write(`Hello, World! Waktu Saat Ini: ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    res.end(JSON.stringify({
        message: hello(),
        time: moment().format('YYYY-MM-DD HH:mm:ss')
    }));
};
const server = http.createServer(requestListener);
server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});
//# sourceMappingURL=index.js.map