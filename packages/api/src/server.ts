import bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/test', (req, res) => res.send(new Date().toISOString()))

export const server = app.listen(8080, () => console.log(`server running on port 8080`))
