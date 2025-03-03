import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/appError.js';




const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`)
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname)
    }
  })

  function fileFilter(req, file, cb) {
    console.log(file);
    if (file.mimetype.startsWith('application')) {
      cb(null, true)
    } else {
      cb(new AppError('application only', 401), false)
    }


  }

  const upload = multer({
    storage, fileFilter, limits: {
      fileSize: 1 * 1024 * 1024, // 4 MB in bytes
    }
  })

  return upload

}




export const uploadSingleFile = (fieldName, folderName) => {

  return fileUpload(folderName).single(fieldName)

}


export const uploadMixOfFiles = (arrayOfFields, folderName) => {


  return fileUpload(folderName).fields(arrayOfFields)

}


export const uploadMixOfFields = (fieldName, maxCount) => {


  return fileUpload().array(fieldName, maxCount)

}


