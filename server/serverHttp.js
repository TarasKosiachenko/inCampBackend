const http = require("http");
const url = require("url");

function logRequest({ method, url }) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
}

function pluralWord(count, one, few, many) {
  let form = "";
  let valNum = 0;
  if (count > 100) {
    valNum = count.toString().slice(-2);

    if (valNum % 10 == 1) {
      form = one;
    } else if (valNum % 10 > 1 && valNum % 10 < 5) {
      form = few;
    } else {
      form = many;
    }
  } else if (count == 1 || (count % 10 == 1 && count % 10 != 11)) {
    form = one;
  } else if (
    (count > 1 && count < 5) ||
    (count % 10 > 1 && count % 10 < 5)
  ) {
    form = few;
  } else {
    form = many;
  }
  return count + " " + form;
}

function wordFrequency(string) {
  let words = string.match(/\w+/g);
  let wordFreqMap = {};
  let max = 0;
  let mostFrequentword = '';

  for (let word of words) {
    (wordFreqMap[word]) ? wordFreqMap[word]++ : wordFreqMap[word] = 1;
    if (wordFreqMap[word] > max) {
      max = wordFreqMap[word];
      mostFrequentword = word;
    }
  }

  let amountUniquewords = (Object.keys(wordFreqMap).length).toString()

  return { amountUniquewords, mostFrequentword }
}

const server = http.createServer((req, res) => {
  logRequest(req);
  const pathname = url.parse(req.url).pathname;

  //curl localhost:5000/headers
  if (pathname === "/headers") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(req.headers));
  }
  //curl 'localhost:5000/plural?number=2&forms=person,people,people'
  else if (pathname === "/plural") {
    const queryObject = url.parse(req.url, true).query;
    const number = queryObject.number;
    const form = queryObject.forms.split(",");

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(pluralWord(number, form[0], form[1], form[2]));
  }
  //curl -X POST localhost:5000/frequency --data-raw "Little fox red fox jumps fox over logs. Fox is red"
  else if (pathname === "/frequency") {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('method: GET, path: /frequency');
    } else if (req.method === 'POST') {
      let data = [];

      req.on('data', chunk => data.push(chunk))
      req.on('end', () => {
        const newData = wordFrequency(data.toString())

        res.setHeader('amountUniquewords', newData.amountUniquewords);
        res.setHeader('mostFrequentword', newData.mostFrequentword);
        res.setHeader('Content-Type', 'application/json');
        res.end(`amountUniquewords: ${newData.amountUniquewords} \nmostFrequentword: ${newData.mostFrequentword} `)
      })
    } else {
      res.writeHead(404, "Not Found");
      res.end();
    }
  }
  else {
    res.writeHead(404, "Not Found");
    res.end();
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});