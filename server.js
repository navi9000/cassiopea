import { createServer } from "node:http"
import { readFile } from "node:fs/promises"

const server = createServer()
server.on("request", async (req, res) => {
  const url = req.url
  const data = await readFile(url === "/" ? "index.html" : "." + url)
  res.end(data)
})

server.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
