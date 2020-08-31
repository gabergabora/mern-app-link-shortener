const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))


  app.use("/", express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })


const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(
      config.get("mongoURI"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      console.log("Mongoose is here!!!")
    );

  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
app.listen(PORT, () =>
  console.log(`I\'ve created a Monster... on port ${PORT}`)
);