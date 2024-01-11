import app from './server'

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
