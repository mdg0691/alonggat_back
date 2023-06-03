import RSSParser from "rss-parser"
import cors from "cors"
import express from "express"

// const feedURL = "http://netflixtechblog.com/feed"
const feedURL ="https://www.israeltoday.co.il/read/israel/feed/"

const parser = new RSSParser()
const articles =[]

const parse =async url =>{
    const feed = await parser.parseURL(url)
    console.log(feed.title)
    feed.items.forEach(item => 
        articles.push({item})
        // console.log(`${item.title}\n ${item.link}`)
        )
}

parse(feedURL)

const app = express()
app.use(cors())

const server = app.listen("4000", () =>{
    console.log("server on port 4000")
})
app.get('/', (req,res) => {
    res.send(articles)
})
export default server