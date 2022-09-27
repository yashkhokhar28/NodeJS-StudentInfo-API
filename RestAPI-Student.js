const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Students = require("./model/Students");
mongoose
  .connect(
    "mongodb+srv://yash:yash@cluster0.j20jjlu.mongodb.net/DemoDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get("/", async (req, res) => {
      const data = await Students.find();
      res.send(data);
    });

    app.get("/:id", async (req, res) => {
      const data = await Students.findOne({ FacultyID: req.params.id });
      res.send(data);
    });
    app.post("/", async (req, res) => {
      const student = new Students();
      student.StudentID = req.body.StudentID;
      student.StudentName = req.body.StudentName;
      student.StudentEmail = req.body.StudentEmail;
      student.StudentMobile = req.body.StudentMobile;
      student.StudentParentMobile = req.body.StudentParentMobile;
      student.StudentImage = req.body.StudentImage;
      student.StudentDepartment = req.body.StudentDepartment;
      const data = await student.save();
      res.send(data);
    });
    app.put("/:id", async (req, res) => {
      const data = await Students.findOne({ FacultyID: req.params.id });
      data.StudentName = req.body.StudentName;
      data.StudentEmail = req.body.StudentEmail;
      data.StudentMobile = req.body.StudentMobile;
      data.StudentParentMobile = req.body.StudentParentMobile;
      data.StudentImage = req.body.StudentImage;
      data.StudentDepartment = req.body.StudentDepartment;
      await data.save();
      res.send(data);
    });
    app.delete("/:id", async (req, res) => {
      const data = await Students.deleteOne({ FacultyID: req.params.id });
      res.send(data);
    });

    app.listen(3003, () => {
      console.log("Server Started @https://localhost:3003");
    });
  });
