const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

exports.getMovies = (req, res) => {
    if(!req.params.id){
        return res.status(200).json({
            status: "sucess",
            timeOfRequest: req.time,
            count: movies.length,
            data: {
                movies: movies,
            }
        });
    }else{
        const id = req.params.id * 1;
        const movie = movies.find(m => m.id === id);
        if(movie){
            return res.status(200).json({
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
};
exports.uploadMovie = (req, res) => {
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
        else
            res.status(201).json({
                status: "sucess",
                data: {
                    movies : movie
                }
            });
    });
};
exports.updateMovie = (req, res) => {
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
            else
                return res.status(201).json({
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
};
exports.deleteMovie = (req, res) => {
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
            return res.status(201).json({
                status: "sucess"
            });
        });
    }else{
        return res.status(404).json({
            status: "fail",
            message: 'movie with id: ' + id + ' is not found'
        });
    };
};