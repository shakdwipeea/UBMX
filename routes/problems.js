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


/**
 * @api {get} /problems Get problems
 * @apiName Problems list
 * @apiGroup IDK
 *
 * @apiParam {String} name Name of problem
 * @apiSuccess {Object[]} problem Name of problem added
 * @apiSuccess {String} problem.id Id of problem
 * @apiSuccess {String} problem.name Name of problems
 * @apiError {String} error Cause of the error
 *
 */
router.post('/', (req, res) => {
    if (req.body.user.user === 'admin') {
        problems.addProblem({
            name: req.body.name
        }, (err, type) => {
            if (err) {
                res.status(500).json({
                    "error": err
                });
            } else {
                res.json({
                    "type": type
                })
            }
        })
    } else {
        res.status(403).json({
            "error": "Not authorized"
        });
    }
});

module.exports = router;