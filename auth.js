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

const getAuthToken = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split('')[0] === 'Bearer')
		{
		  req.authToken=req.headers.authorization.split('')[1];
		} else{
			req.authToken = null;
		}
	next ();
};

const checkAuth = (req, res, next) => {
	getAuthToken(req, res, async () => {
		try {
			const { authToken } = req;
			const userInfo = await admin
				.auth()
				.verifyIdToken(authToken);
				req.authId = userInfo.uid;
			return next();
		}
		catch (e) {
			return res
				.status(401)
				.send({error: 'Kamu Belum Login"});
		}
	});
};

