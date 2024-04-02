/* internal import */
const settingsService = require("../services/settings.service");

/* create new settings */
exports.createSettings = async (req, res, next) => {
  console.log("settings.controller",req.body)

    try {
      const result = await settingsService.createSettings(req.body);
      
      res.status(201).json({
        acknowledgement: true,
        message: "Created",
        description: "Successfully created new settings",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/* display all settings */
exports.displaySettings = async (req, res, next) => {
    console.log('req.query', req.query)
    try {
      const result = await settingsService.displaySettings(req.query);
      console.log('result.settings.controller', result)
  
      res.status(200).json({
        acknowledgement: true,
        message: "OK",
        description: "Successfully fetch all settings",
        count: result.count,
        data: result.settings,
      });
    } catch (error) {
      next(error);
    }
  };

/* display specific settings */
exports.displaySetting = async (req, res, next) => {
    try {
      const result = await settingsService.displaySetting(req.params);
  
      res.status(200).json({
        acknowledgement: true,
        message: "OK",
        description: "Successfully fetch specific settings",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/* remove specific settings */
exports.removeSettings = async (req, res, next) => {
  try {
    const result = await productService.removeSettings(req.params);

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "Successfully remove specific settings",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
