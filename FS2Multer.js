const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadmulter");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "..." + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/single", upload.single("singlefile"), (req, res) => {
  res.send("file uploaded successfully...");
});

app.post("/multiple", upload.array("multiplefile", 2), (req, res) => {
  res.send("multifile uploaded successfully...");
});

app.listen(port, () => {
  console.log("server Started...");
});
