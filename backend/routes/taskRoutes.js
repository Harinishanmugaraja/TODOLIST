const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {

  try {

    const { title } = req.body;

    const newTask = new Task({
      title
    });

    await newTask.save();

    res.status(201).json({
      message: "Task Added Successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const tasks = await Task.find();

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    const taskId = req.params.id;

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({
      message: "Task Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.put("/:id", async (req, res) => {

  try {

    const taskId = req.params.id;
    const { title } = req.body;

    await Task.findByIdAndUpdate(
      taskId,
      { title }
    );

    res.status(200).json({
      message: "Task Updated Successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;