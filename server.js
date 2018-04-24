const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentDate', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('upper', (text) =>{
	return text.toUpperCase();
});

app.set('view engin','hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(now);
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) =>{
		if(err){
			console.log('Could not write the logs in file');
		}
	});
	next();

});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home Page'
	});
});

app.get('/about', (req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		welcomeMessage: 'Welcome to About Page'
	});
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage: 'Bad Page'
	});
});

app.listen(port, () => {
	console.log(`Server is up on ${port} port`);
});