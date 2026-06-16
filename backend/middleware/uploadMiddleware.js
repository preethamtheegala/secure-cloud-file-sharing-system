import multer from "multer";


const storage = multer.memoryStorage();

const allowedTypes = [

  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "application/vnd.ms-powerpoint",

  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "image/jpeg",

  "image/jpg",

  "image/png",

  "image/gif",

  "image/webp",

  "application/zip",

  "application/x-rar-compressed"

];

const fileFilter = (
  req,
  file,
  cb
) => {

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(
      null,
      true
    );

  } else {

    cb(
      new Error(
        "Invalid file type"
      ),
      false
    );

  }

};

const upload = multer({

  storage,

  limits: {
    fileSize:
      20 *
      1024 *
      1024
  },

  fileFilter

});

export default upload;