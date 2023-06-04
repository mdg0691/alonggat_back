import RSSParser from "rss-parser";
import cors from "cors";
import express from "express";

const feedURL = "https://www.israeltoday.co.il/read/israel/feed/";
const parser = new RSSParser();
let articles = [];

const parse = async () => {
  try {
    const feed = await parser.parseURL(feedURL);
    console.log(feed.title);
    articles = feed.items.map(item => ({ item }));
  } catch (error) {
    console.error("Error parsing RSS:", error);
  }
};

parse();

const app = express();
app.use(cors());

const updateInterval = 5000; // 5 seconds

// Function to periodically fetch and parse the RSS feed
const updateArticles = () => {
  parse();
  setTimeout(updateArticles, updateInterval);
};

updateArticles();

const server = app.listen("4000", () => {
  console.log("Server listening on port 4000");
});

app.get("/", (req, res) => {
  res.send(articles);
});

export default server;
