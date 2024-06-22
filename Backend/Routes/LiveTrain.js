const trainAPI = require('./Other.js');  
const { logger } = require('./Other.js');  
  

const handleInvalidPath = (req, res) => {  
  const errorMsg = `Path ${req.originalUrl} not found`;  
  logger.error(errorMsg);  
  res.status(404).send(errorMsg);  
}; 
const getLiveTrainInfo = (req, res) => {  
    trainAPI.getLiveTrainInfo(req.query.trainNo,req.query.date)  
      .then(data => res.json(data))  
      .catch(error => res.status(500).json({ error: error.toString() }));  
  };

  module.exports={getLiveTrainInfo, handleInvalidPath }