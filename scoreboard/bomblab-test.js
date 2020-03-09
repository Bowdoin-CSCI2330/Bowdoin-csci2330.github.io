/* bomblab-test.js - Skeleton for testing bomblab.js parsing and summary.
 *
 */

const INSTRUCTOR_USERID = 'houser';         // userid of The Prof
const SCORE_URL = 'bomblab-s20.scores.txt' // URL of score log.txt to display

var fs = require('fs'),
	path = require('path'),
	filePath = path.join(__dirname, SCORE_URL);

// Include bomblab.js, the script under test and development.
eval(fs.readFileSync('bomblab.js') + '');

// Read and parse scores
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
	if (!err) {
		bombs = parseScoreFile(data);
		bombScores = scoreBombs(bombs);
		console.log(bombScores);

		// summary = summarizeBombs(bombScores);
		// console.log(summary);
	} else {
		console.log(err);
	}
});
