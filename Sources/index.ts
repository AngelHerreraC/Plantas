import express from 'express'
import path from 'path'
import router from './routes/plantsroutes'


const app = express()
const PORT = 3000


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'register')));
app.use(express.static(path.join(__dirname, 'weather')));
app.use(express.static(path.join(__dirname, 'viewPlants')));
app.use(express.static(path.join(__dirname, 'main')));
app.use(express.json())


// app.use(express.static(path.join(__dirname, 'register')))


// app.get('/register', (_req ,res) => {
//     res.sendFile(path.join(__dirname,'register', 'register.html'));
//   });
app.get('/register', (_req, res) => {
    res.sendFile(path.join(__dirname, 'register', 'register.html'));
  });
app.get('/weather', (_req, res) => {
  res.sendFile(path.join(__dirname, 'weather', 'weather.html'))
})

app.get('/plants', (_req, res) => {
  res.sendFile(path.join(__dirname, 'viewPlants', 'plants.html'))
})

app.get('/main', (_req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'main.html'))
})

app.use('/api/plantas', router)


app.listen(PORT,()=>{
    console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})

export default app