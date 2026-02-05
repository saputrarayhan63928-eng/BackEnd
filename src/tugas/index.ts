import http from "http"
import moment from "moment";
import { Json1 } from "#Json1";
import { Json2 } from "#Json2";
import { Json3 } from "#Json3";
import { Json4 } from "#Json4";
import { Json5 } from "#Json5";

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) =>{
      res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/") {
    res.end(
      JSON.stringify({
        message: Json1(),
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
        url: req.url,
      }),
    );
  } 
  else if (req.url === "/2") {
      res.end(
        JSON.stringify({
          message: Json2(),
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          url: req.url,
        }),
      );
    }
      else if (req.url === "/3") {
      res.end(
        JSON.stringify({
          message: Json3(),
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          url: req.url,
        }),
      );
    }
      else if (req.url === "/4") {
      res.end(
        JSON.stringify({
          message: Json4(),
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          url: req.url,
        }),
      );
    }
      else if (req.url === "/5") {
      res.end(
        JSON.stringify({
          message: Json5(),
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
          url: req.url,
        }),
      );
    }
    else {
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        message: "You Are Accessing endpoind that not found",
        url: req.url,
      }),
    );
    res.end();
  }
}

const server = http.createServer(requestListener);

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});