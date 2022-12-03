import express from 'express';
import fs from 'fs';
import path from 'path'
import https from 'https';
import dotenv from 'dotenv';

dotenv.config()
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
    baseURL: externalUrl || `https://localhost:${port}`
};

app.get('/',(req, res) => {
    res.redirect('/home')
  });

app.get('/home', (req, res) =>{
    res.render('home');
});

if (externalUrl) {
    const hostname = '127.0.0.1';
    app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
    outside on ${externalUrl}`);
    });
}else{
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
        }, app)
        .listen(port, function () {
          console.log(`Server running at https://localhost:${port}/`);
      });
}