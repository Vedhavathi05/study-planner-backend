
const Resource = require("../models/Resource"); 

exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create({
      userId: req.user._id,
      subjectId: req.body.subjectId,
      title: req.body.title,
      url: req.body.url,
    });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: "Error adding resource" });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      userId: req.user._id,
      subjectId: req.params.subjectId,
    });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resources" });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted", resource });
  } catch (err) {
    res.status(500).json({ message: "Error deleting resource" });
  }
};
