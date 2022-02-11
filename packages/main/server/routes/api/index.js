const express = require('express');

const router = express.Router();
router.get('/error', function (req, res) {
	res.send({
		a: 123,
		b: 456,
	});
});

module.exports = router;
