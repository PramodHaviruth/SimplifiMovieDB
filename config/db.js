const mssql = require("mssql");

const dbconfig = {
  server: "PRAMOD-PC\\SQLEXPRESS",
  user: "pramod",
  password: "demo1234",
  database: "SimplifiMovieDB",
  port: 55555
};

var conn = new mssql.ConnectionPool(dbconfig);

const initDB = new Promise((resolve, reject) => {
  conn.connect(err => {
    if (err) {
      console.log("Failed to Connect DB...!");
      reject(err);
    } else {
      console.log("Connected to DB...!");
      return resolve(new mssql.Request(conn));
    }
  });
});

const getMovieDetails = new Promise((resolve, reject) => {
  initDB
    .then(req => {
      req.query("Select * from Movie", (err, res) => {
        if (err) throw err;
        else {
          resolve(res.recordset);
        }
      });
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
});

const getMovieCastDetails = function(movieId) {
  return new Promise((resolve, reject) => {
    initDB
      .then(req => {
        req.query(
          `select Cast from Movie where ID = ${movieId}`,
          (err, res) => {
            if (err) throw err;
            else {
              resolve(res.recordset);
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const setMovieDetails = function(movieInfoParams) {
  return new Promise((resolve, reject) => {
    initDB
      .then(req => {
        req.query(
          `insert into Movie values('${movieInfoParams.Name}',
             ${movieInfoParams.Year}, ${movieInfoParams.Rating}, 
             ${movieInfoParams.Poster}, '${movieInfoParams.Cast}')`,
          (err, res) => {
            if (err) {
              console.log(err);
              throw err;
            } else {
              resolve(res.recordset);
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const validateUserDetails = function(userName, password) {
  return new Promise((resolve, reject) => {
    initDB
      .then(req => {
        req.query(
          `select ID from Users where Name = '${userName}' and Password = '${password}'`,
          (err, res) => {
            if (err) throw err;
            else {
              console.log("res.recordset is =" + res.recordset.ID);
              resolve(res.recordset);
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports.getMovieDetails = getMovieDetails;
module.exports.getMovieCastDetails = getMovieCastDetails;
module.exports.setMovieDetails = setMovieDetails;
module.exports.validateUserDetails = validateUserDetails;
