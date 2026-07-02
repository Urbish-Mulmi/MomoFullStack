// multer to view file, image data sent via postman

import multer from "multer";
import fs from "fs";

//  multer to enable image upload
// below multer code is copy pasted from multer docs

// ensure the temp upload folder exists (Render's filesystem won't have
// this folder by default since empty folders aren't tracked by git)
const tempDir = "public/temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //define a destination public/temp for disk allocated to store images
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    // add a unique prefix to avoid filename collisions if two uploads
    // happen with the same original filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;