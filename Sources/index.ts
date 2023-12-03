import express from 'express'
import placeHolderRouter from './routes/placeholderroute'


const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) =>{
    console.log("pong")
    res.send("pong")
})

app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})

app.use('/api/plantas', placeHolderRouter)