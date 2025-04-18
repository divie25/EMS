const GreenInitiative = require("../models/GreenInitiative");

exports.addInitiative = async (req, res) => {
  try {
    // Handle the files from the uploaded images
    const images = req.files.map(file => file.path); // Store file paths or URLs if you're uploading to a cloud storage
    
    // Create a new GreenInitiative instance
    const newInitiative = new GreenInitiative({
      ...req.body,
      images: images // Store the image paths in your initiative
    });

    // Save the new initiative
    await newInitiative.save();
    
    res.status(201).json(newInitiative); // Return the saved initiative
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllInitiatives = async (req, res) => {
  const initiatives = await GreenInitiative.find();
  res.json(initiatives);
};



exports.DeleteInitiatives = async (req, res) => {
  const initiatives = await GreenInitiative.findByIdAndDelete(req.params.id);
  res.json(initiatives);
};
exports.UpdateInitiatives = async (req, res) => {
  try {
    const { id } = req.params;

    // Destructure body data
    const {
      initiativeName,
      organization,
      type,
      description,
      impact,
      date,
      location
    } = req.body;

    const updatedData = {
      initiativeName,
      organization,
      type,
      description,
      impact,
      date,
      location
    };

    // If images are uploaded
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map(file => file.filename); // or file.path if using full path
    }

    const updatedInitiative = await GreenInitiative.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedInitiative) {
      return res.status(404).json({ message: "Initiative not found" });
    }

    res.json({
      message: "Initiative updated successfully",
      data: updatedInitiative
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
