// multer to view file, image data sent via postman

import multer from "multer";

//  multer to enable image upload
// below multer code is copy pasted from multer docs
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        
        //define a destination public/temp for disk allocated to store images
        cb(null, "public/temp");
          
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage });

export default upload;