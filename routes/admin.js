const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Admin = require("../model/admin");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new admin
    let admin = new Admin({
      name: req.body.name,
      description:req.body.description,
      phnumber:req.body.phnumber,
      basis:req.body.basis,
      timedu:req.body.timedu,
      compensation:req.body.compensation,
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

router.delete("/:id", async (req, res) => {
  try {
    // Find admin by id
    let admin = await admin.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(admin.cloudinary_id);
    // Delete admin from db
    await admin.remove();
    res.json(admin);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(admin.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || admin.name,
      description:req.body.name || admin.description,
      phnumber:req.body.name || admin.phnumber,
      basis:req.body.basis || admin.basis,
      timedu:req.body.timedu || admin.timedu,
      compensation:req.body.compensation || admin.compensation,
      avatar: result?.secure_url || admin.avatar,
      cloudinary_id: result?.public_id || admin.cloudinary_id,
    };
    admin = await admin.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(admin);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find admin by id
    let admin = await admin.findById(req.params.id);
    res.json(admin);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;