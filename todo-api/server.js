const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");

const app = express();

function logRequest({ method, url }, res, next) {
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next();
}

app.use(express.json());
app.use(logRequest);

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
  } else if ((count > 1 && count < 5) || (count % 10 > 1 && count % 10 < 5)) {
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
  let mostFrequentword = "";
  for (let word of words) {
    wordFreqMap[word] ? wordFreqMap[word]++ : (wordFreqMap[word] = 1);
    if (wordFreqMap[word] > max) {
      max = wordFreqMap[word];
      mostFrequentword = word;
    }
  }
  let amountUniquewords = Object.keys(wordFreqMap).length.toString();
  return { amountUniquewords, mostFrequentword };
}

// curl localhost:5000/headers
app.get("/headers", (req, res) => {
  res.json(req.headers);
});

//curl 'localhost:5000/plural?number=2&forms=person,people,people'
app.get("/plural", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const number = queryObject.number;
  const form = queryObject.forms.split(",");
  res.end(pluralWord(number, form[0], form[1], form[2]));
});

//curl localhost:5000/frequency
app.get("/frequency", (req, res) => {
  res.end(`method: ${req.method}\n path: ${url.parse(req.url).pathname}`);
});
//curl -X POST localhost:5000/frequency --data-raw "Little fox red fox jumps fox over logs. Fox is red"
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/frequency", (req, res) => {
  const newData = wordFrequency(Object.keys(req.body).toString());
  res.setHeader("amountUniquewords", newData.amountUniquewords);
  res.setHeader("mostFrequentword", newData.mostFrequentword);
  res.setHeader("Content-Type", "application/json");
  res.end(
    `amountUniquewords: ${newData.amountUniquewords} \nmostFrequentword: ${newData.mostFrequentword} `
  );
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server at localhost:${port}`);
});
