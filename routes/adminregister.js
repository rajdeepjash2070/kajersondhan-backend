const router = require("express").Router();
const cloudinary = require("../utilsregister/cloudinary");
const upload = require("../utilsregister/multer");
const Admin = require("../model/adminregistermodel");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new admin
    let admin = new Admin({
      name: req.body.name,
      address:req.body.address,
      email:req.body.email,
      password:req.body.password,
      contactnumber:req.body.contactnumber,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
   
    });
    // Save admin
    await admin.save();
    res.json(admin);
  } catch (err) {
    console.log(err);
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