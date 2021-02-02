const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Assignment2',
  password: '123456',
  port: 5432,
})

const getCars = (request, response) => {
  pool.query('SELECT car.carid,car.name,model.modelname,make.makename FROM car INNER JOIN model on car.carid=model.modelid INNER JOIN make On model.modelid=make.makeid', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getCarsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT car.carid,car.name,model.modelname,make.makename FROM car INNER JOIN model on car.carid=model.modelid INNER JOIN make On model.modelid=make.makeid WHERE car.carid = $1', [id], (error, results) => {

    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCar = async (request,response) => {
  let carName = request.body.name;
  let makeName = request.body.makename;
  let modelName = request.body.modelname;

  console.log(carName);

  const oldCar = await pool.query("Select name from car where name = $1",[carName]);
  if(oldCar.rowCount >= 1){
    response.send("Car already exist");
  }
  else{
     //Checking about makename exists or not
    const oldMakeId = await pool.query("Select makeid,makename from make where makename = $1",[makeName]);
    if(oldMakeId.rowCount >= 1){
      newMakeId = oldMakeId.rows[0].makeid;
      console.log(newMakeId);
    }
    else{
          const result1 = await pool.query("Insert into make(makename) values($1) RETURNING makeid",[makeName]);
          if(result1.rowCount >= 1){
            newMakeId = await pool.query("Select makeid,makename from make where makename = $1",[makeName]);
          }
          if(newMakeId.rowCount >= 1){
            newMakeId = newMakeId.rows[0].makeid;
            console.log(newMakeId);
          }
      }
      //Checking about modelname exists or not
      const oldModelId = await pool.query("Select modelid,modelname from model where modelname = $1",[modelName]);
        if(oldModelId.rowCount >= 1){
        newModelId = oldModelId.rows[0].modelid;
        console.log(newModelId);
      }
      else{
            const result2 = await pool.query("Insert into model(modelname) values($1) RETURNING modelid",[modelName]);
            if(result2.rowCount >= 1){
              newModelId = await pool.query("Select modelid,modelname from model where modelname = $1",[modelName]);
            }
            if(newModelId.rowCount >= 1){
              newModelId = newModelId.rows[0].modelid;
              console.log(newModelId);
            }
      }

      await pool.query("Insert into car(name,makeid,modelid) values($1,$2,$3) RETURNING carid",[carName,newMakeId,newModelId],(error,result) =>{
        if(error)
          throw error;
        response.status(201).send(`Successfully added new Car`)
      } )
  }
}

const deleteCar = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM car WHERE carid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Car deleted with ID: ${id}`)
  })
}


const insertCarImage = (request,response) => {
    let id = parseInt(request.body.id);
    let carId = parseInt(request.params.id);
    let fileName = request.file.filename;

    pool.query("Insert into carimage(filename,carid) values($1,$2)",[fileName,carId],(error,result) => {
     
      if(error){
        throw error;
      }
      response.status(201).json(`Image Uploaded Succesfully`)
    })
}

module.exports = {
  getCars,
  getCarsById,
  createCar,
  deleteCar,
  insertCarImage
}
