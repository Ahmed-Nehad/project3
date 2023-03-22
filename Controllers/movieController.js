const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

exports.checkId = (req, res, next, value) => {
  const id = value * 1;
  const movie = movies.find(m => m.id === id);
  if(!movie){
    return res.status(404).json({
      status: "fail",
      message: 'movie with id: ' + id + ' is not found'
    });
  };
  next();
};
exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.year || !req.body.time){
        return res.status(404).json({
            status: "fail",
            message: 
            `the movie you want to add is missing data (name:${!(!req.body.name)}, year:${!(!req.body.year)}, time:${!(!req.body.time)})`
        });
    }
    next();
};
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
      return res.status(200).json({
          status: "sucess",
          data: {
              movies: movie,
          }
      });
  }
};
exports.uploadMovie = (req, res) => {
  const id = movies[movies.length - 1].id + 1;
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
                  movie : movie
              }
          });
  });
};
exports.updateMovie = (req, res) => {
  const id = req.params.id * 1;
  const movie = movies.find(m => m.id === id);
  const movieIndex = movies.indexOf(movie);
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
                movie : newMovie
            }
        });
  });
};
exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movie = movies.find(m => m.id === id);
    const movieIndex = movies.indexOf(movie);
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
};