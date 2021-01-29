const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Assignment2',
  password: '123456',
  port: 5432,
})

const getCars = (request, response) => {
  pool.query('SELECT car.id,car.name,model.modelname,make.makename FROM car INNER JOIN model on car.id=model.modelid INNER JOIN make On model.modelid=make.makeid', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getCarsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT car.id,car.name,model.modelname,make.makename FROM car INNER JOIN model on car.id=model.modelid INNER JOIN make On model.modelid=make.makeid WHERE car.id = $1', [id], (error, results) => {

    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createCar = (request, response) => {
  const carName = request.body.name;
  console.log(request.body)

  if (checkIfCarAlreadyExists(carName)) {
    response.json("Car Already Exist");
    return;
  }
  else {
    response.json("Car does not exist");
    return;
  }
 
  function checkIfCarAlreadyExists(carName) {
    console.log(carName)
    pool.query('Select * FROM car WHERE name = $1', [carName], (error, result) => {
      if (error) {
        response.status(500).json("Internal Server Error");
        throw error;
      }
      else if (result.rowCount > 0)
        return true;
      else
        return false;
    }
    )}
}


module.exports = {
  getCars,
  getCarsById,
  createCar
  //   updateUser,
  //   deleteUser,
}
