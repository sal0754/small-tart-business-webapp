import dotenv from "dotenv"
dotenv.config()

import express from "express"
import dbTestRoutes from "./routes/dbTest.js"

const app = express()
const port = 8080

app.use("/api", dbTestRoutes)

app.get("/", (req, res) => {
  res.json({ status: "backend works" })
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})