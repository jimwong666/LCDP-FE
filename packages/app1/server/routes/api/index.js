const express = require('express');

const router = express.Router();
router.get('/test', function (req, res) {
	res.send({
		a: 1111,
		b: 22222,
	});
});

router.post('/test', function (req, res) {
	res.send({
		a: 6666,
		b: 77777,
	});
});

module.exports = router;
