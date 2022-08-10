const router = require("express").Router();
const cloudinary = require("../utilsregister/cloudinary");
const upload = require("../utilsregister/multer");
const Admin = require("../model/adminregistermodel");

router.post("/", upload.single("image"), async (req, res) => {
  try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
  try {
    let admin = await Admin.find();
    res.json(admin);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;