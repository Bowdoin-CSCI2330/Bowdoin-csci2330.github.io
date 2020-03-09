function updateBomb(bombScore, bombs) {
    var bomb_id = bombScore['bomb_id'];

    if (!(bomb_id in bombs)) {
        bombs[bomb_id] = {
			'bomb_id': bomb_id,
			'date': bombScore['date'],
			'userid': bombScore['userid'],
			'password': bombScore['password'],
			'version': bombScore['version'],
			'phase_status': [null, null, null, null, null, null],
			'phase_explosions': [0, 0, 0, 0, 0, 0],
            'explosions': 0,
            'score': 0,
            'status': 'invalid'
		};
    }

    var bomb = bombs[bomb_id];
    bomb['date'] = bombScore['date'];

    var phase = bombScore['phase'];
    bomb['phase_status'][phase - 1] = bombScore['status'];

    // count explosions
    if (bombScore['status'] == 'exploded') {
        bomb['phase_explosions'][phase - 1] += 1;
    }
} 

function parseScoreLine(line) {
    var fields = line.split('|')
    if (fields.length != 6) {
        return {};
    }

    var [hostname, date, userid, password, version] = fields.slice(0, 5)
    if (hostname === undefined | date === undefined | userid === undefined | password === undefined) {
        return {};
    }

    var [bomb_id, status, phase, code] = fields[5].split(':');
    if (bomb_id === undefined | status === undefined | phase === undefined | code === undefined) {
        return {};
    }

    return {
        'hostname': hostname,
        'date': date,
        'userid': userid,
        'password': password,
        'version': version,
        'bomb_id': bomb_id,
        'status': status,
        'phase': phase,
        'code': code
    };
}

function parseScoreFile(scoreFile) {
    bombs = {};
    scoreFile.split('\n').forEach(scoreLine => {
        bombScore = parseScoreLine(scoreLine);
        if (bombScore.bomb_id != undefined) {
            updateBomb(bombScore, bombs)
        }
    });

	var scores = scoreBombs(bombs);

    return bombs;
};

function scoreDefusals(bomb) {
	let total_score = bomb['phase_status'].reduce(function (score, status, phase) {
		if (status == 'defused') {
			switch (phase + 1) {
				case 1: return score + 10;
				case 2: return score + 20;
				case 3: return score + 20;
				case 4: return score + 20;
				case 5: return score + 10;
			}
		}

		return score ;
	}, 0);

	return total_score;
}

function scoreExplosions(bomb) {
	/*
	let phase_scores = bomb['phase_explosions'].map(function (explosions, phase) {
		switch (phase + 1) {
			case 1: return Math.min(explosions * 0.5, 5.0);
			case 2: return Math.min(explosions * 0.5, 10);
			case 3: return Math.min(explosions * 0.5, 12.5);
			case 4: return Math.min(explosions * 0.5, 15);
			case 5: return Math.min(explosions * 0.5, 9.0);
		}

		return 0;
	});

	let total_score = phase_scores.reduce(function (score, phase_score) {
		return score + phase_score;
	});
	*/
	let total_score = bomb['phase_explosions'].reduce(function (score, explosions, phase) {
		switch (phase + 1) {
			case 1: return score + Math.min(explosions * 0.5, 5.0);
			case 2: return score + Math.min(explosions * 0.5, 10);
			case 3: return score + Math.min(explosions * 0.5, 12.5);
			case 4: return score + Math.min(explosions * 0.5, 15);
			case 5: return score + Math.min(explosions * 0.5, 9.0);
		}

		return score;
	}, 0);

	return total_score;
}

function countExplosions(bomb) {
	let explosions = bomb['phase_explosions'].reduce(function (sum, current) {
		return sum + current;
	});

	return explosions;
}

function countDefused(bomb) {
	let defused = bomb['phase_status'].reduce(function (phases_defused, status) {
		if (status == 'defused') {
			phases_defused++;
		}
		return phases_defused;
	}, 0);

	return defused;
}

function scoreBomb(bomb) {
	var score = scoreDefusals(bomb) - scoreExplosions(bomb);
	bomb['score'] = Math.max(score, 0);
	bomb['explosions'] = countExplosions(bomb);
	bomb['defused'] = countDefused(bomb);
	bomb['status'] = 'valid';
	return bomb;
}

function scoreBombs(bombs) {
	let scores = Array.from(Object.values(bombs));
	scores = scores.map(scoreBomb);
	return scores;
}

var fs = require('fs'),
	path = require('path'),
	filePath = path.join(__dirname, 'bomblab-s20.scores.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
	if (!err) {
		bombs = parseScoreFile(data);
		scores = scoreBombs(bombs)
		console.log(scores);
	} else {
		console.log(err);
	}
});
