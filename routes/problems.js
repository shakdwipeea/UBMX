/**
 * Created by Akash on 01-10-2015.
 */
var express = require('express');
var router = express.Router();
var problems = require('../controller/problems');

/**
 * @api {get} /problems Get problems
 * @apiName Problems list
 * @apiGroup IDK
 *
 * @apiSuccess {Object[]} problems List of problems
 * @apiSuccess {String} problems.id Id of problem
 * @apiSuccess {String} problems.name Name of problems
 * @apiError {String} error Cause of the error
 *
 */

router.get('/', (req, res) => {
    problems.getAllProblems((err, problems) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            res.json({
                "problems": problems
            })
        }
    })
});

router.post('/', (req, res) => {
    res.status(500).json({
        "error": "Not Implemented"
    });
});

module.exports = router;