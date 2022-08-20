import { FormValidationError } from "../models/formValidationErrorModel";
import { Product } from "../models/productModel";
import { isRequired, isValidNumber, isValidHttpUrl } from "./validations";

export function productFormValidation(
  product: Product,
  setFormValidationErrors: React.Dispatch<
    React.SetStateAction<FormValidationError[]>
  >
) {
  let errors: FormValidationError[] = [];
  isRequired(product.name) ||
    errors.push({ id: "product_name", message: "You should enter a name" });
  isRequired(product.description) ||
    errors.push({
      id: "product_description",
      message: "You should enter a description",
    });
  isValidNumber(`${product.gr}`) ||
    errors.push({
      id: "product_gr",
      message: "You should enter a valid number",
    });
  isValidNumber(`${product.stock}`) ||
    errors.push({
      id: "product_stock",
      message: "You should enter a valid number",
    });


  for (let index = 0; index < product.images.length; index++) {
    const element =  product.images[index];
    if (element.href !== "" && isValidHttpUrl(element.href) === false ) {
      errors.push({
        id: "product_images",
        message: "You should enter a valid URL",
      });
      
    }
    
  }
  
   
  setFormValidationErrors(errors);
  return errors.length === 0 ? true : false;
}
