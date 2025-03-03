
import { addApplicationValidation } from "../modules/application/application.validation.js";
import { AppError } from "../utils/appError.js"



export const validate = (schema) => {

    return (req, res, next) => {
        let filter = {};

        if (schema == addApplicationValidation) {
            filter = { userResume: req.file, ...req.body, ...req.params, ...req.query }
        }
        else {
            filter = { ...req.params, ...req.body, ...req.query };
        }

        let { error } = schema.validate(filter, { abortEarly: false })



        if (!error) {

            next()
        } else {

            let errMsgs = error.details.map((err) => err.message)

            next(new AppError(errMsgs, 401))
        }
    }
}




/*
if(req.file){
    if(schema == addCategoryValidation || schema == updateCategoryValidation){
        filter = {image : req.file   ,  ...req.body , ...req.params , ...req.query}
    }else{
        filter = {logo : req.file   ,  ...req.body , ...req.params , ...req.query}
    }
}else if (req.files) {
    filter = { ...req.files, ...req.params, ...req.body, ...req.query };
  } else {
    filter = { ...req.params, ...req.body, ...req.query };
  }
*/


/*
        if(schema == addCategoryValidation || schema == updateCategoryValidation){
            filter = {image : req.file   ,  ...req.body , ...req.params , ...req.query}
        }else if(schema == addBrandValidation || schema== updateBrandValidation ){
            filter = {logo : req.file   ,  ...req.body , ...req.params , ...req.query}
        }else if(schema == addProductValidation || schema == updateProductValidation ){
            filter = {...req.files   ,  ...req.body , ...req.params , ...req.query}
        }else {
            filter = { ...req.params, ...req.body, ...req.query };
        }

        let { error} = schema.validate({image : req.file , ...req.body , ...req.params , ...req.query} , {abortEarly : false})

*/
