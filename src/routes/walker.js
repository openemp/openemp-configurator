const express = require('express');
const fs = require('fs');
const router = express.Router();
const scripts = require('../utils/scripts');
const path = require('path');
const properties = require('../utils/properties');

router.get('/:set/:service', (req, res) => {
    let dirPath = path.join(properties.path, req.params.set, req.params.service).toString();
    let propertyValue;
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return err;
        }
        files.forEach(filePath => {
            let file = path.join(dirPath, filePath);
            let fileExt = path.extname(file).toLowerCase();
            for (fileExt in properties.supportedFileType) {
                let propertyName = req.query.prop;
                console.log("here");
                propertyValue = scripts.getProperties(file.toString(), propertyName);
                console.log(propertyValue);
                if (propertyValue) res.json({[propertyName]: propertyValue});
                console.log("passed");
            }
            if (!propertyValue) res.status(404).send('Property not found')
        })
    });
});

module.exports = router;
