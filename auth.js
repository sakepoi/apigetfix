const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(credentials)
});

//create new user with auth
app.post('/signup', async (req,res) => {
	const user = {
		email : req.body.email,
		password : req.body.password
	}
	const userRespone = await admin.auth().createUser({
		email: user.email,
		password: user.password,
		emailVerified: false,
		disabled : false
	});
	res.json(userRespone);

})
