require('dotenv').config();

const express			= require('express');
const mongoose			= require('mongoose');
const expressUpload		= require('express-fileupload');
const app				= express();
const PORT				= process.env.PORT || 5000;
const cors				= require('cors');

app.use(cors());
app.use(express.json({extended: true}));
app.use(expressUpload());
app.use('/sell/', require('./routes/reqData'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/offer', require('./routes/offer.routes'));

(async function startApp() {
	await mongoose.connect(
		process.env.DB_URL, 
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true
		}, 
		(err) => err ? console.log(err) : console.log("\x1b[34m", "[DATABASE] Connection success!")
		);
	app.listen(PORT, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`\x1b[34m [SERVER] Connection success - http://localhost:${PORT}`);
		}
	});
})();