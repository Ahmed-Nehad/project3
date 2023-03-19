const fs = require('fs');
const express = require('express');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

app.use(express.json());

// get all the movies
app.get('/api/v1/movies/:id?', (req, res) => {
    if(!req.params.id){
        res.status(200).json({
            status: "sucess",
            count: movies.length,
            data: {
                movies: movies,
            }
        });
    }else{
        const id = req.params.id * 1;
        const movie = movies.find(m => m.id === id);
        if(movie){
            res.status(200).json({
                status: "sucess",
                data: {
                    movies: movie,
                }
            });
        }else{
            return res.status(404).json({
                status: "fail",
                message: 'movie with id: ' + id + ' is not found'
            });
        };
    }
});

app.post('/api/v1/movies', (req, res) => {
    const id = movies.length;
    const movie = Object.assign({id: id}, req.body);
    movies.push(movie);
    fs.writeFile('./data/movies.json', JSON.stringify(movies), err => {
        if(err){
            return res.status(404).json({
                status: "fail",
                message: err.message
            });
        }
        res.status(201).json({
            status: "sucess",
            data: {
                movies : movie
            }
        });
    });
});

app.patch('/api/v1/movies/:id', (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find(m => m.id === id);
    const movieIndex = movies.indexOf(movie);
    if(movie){
        const newMovie = Object.assign(movie, req.body);
        movies[movieIndex] = newMovie;
        fs.writeFile('./data/movies.json', JSON.stringify(movies), err => {
            if(err){
                return res.status(404).json({
                    status: "fail",
                    message: err.message
                });
            }
            res.status(201).json({
                status: "sucess",
                data: {
                    movies : newMovie
                }
            });
        });
    }else{
        return res.status(404).json({
            status: "fail",
            message: 'movie with id: ' + id + ' is not found'
        });
    };
});

app.delete('/api/v1/movies/:id', (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find(m => m.id === id);
    const movieIndex = movies.indexOf(movie);
    if(movie){
        movies.splice(movieIndex, 1);
        fs.writeFile('./data/movies.json', JSON.stringify(movies), err => {
            if(err){
                return res.status(404).json({
                    status: "fail",
                    message: err.message
                });
            }
            res.status(201).json({
                status: "sucess"
            });
        });
    }else{
        return res.status(404).json({
            status: "fail",
            message: 'movie with id: ' + id + ' is not found'
        });
    };
});

const port = 5000;
app.listen(port, () => { console.log(`listening on http://127.0.0.1:${port}`) });
console.log(`listening on http://127.0.0.1:${port}/api/v1/movies`);