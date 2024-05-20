const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/:owner/:name', async (req, res) => {
	const upres = await axios.post("https://buf.build/buf.alpha.registry.v1alpha1.ResourceService/GetResourceByName",
		{
			owner: req.params.owner,
			name: req.params.name
		});
	res.send(upres.data).end();
	
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.listen(port)

