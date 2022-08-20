import React from "react";
import { ProductImage } from "../models/productImageModel";
import { Product } from "../models/productModel";

type Props = {
  productUpdated: Product;
  setProductUpdated: React.Dispatch<React.SetStateAction<Product>>;
};

const ImageForm = ({ productUpdated, setProductUpdated }: Props) => {
  function addImageFieldHandler() {
    const blankImage: ProductImage = { href: "", id: "" };
    const productImagesNew = [...productUpdated.images, blankImage];
    setProductUpdated({ ...productUpdated, images: productImagesNew });
  }

  function removeImageFieldHandler(index: number) {
    const images = productUpdated.images.filter((e, idx) => idx !== index);
    setProductUpdated({ ...productUpdated, images: images });
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="images">Image</label>
        <div
          className="bg-cinder-800 rounded-full m-1 cursor-pointer"
          onClick={() => addImageFieldHandler()}
        >
          <img width={20} src="assets/add.svg" alt="add"></img>{" "}
        </div>
      </div>

      {productUpdated.images &&
        productUpdated.images.map((e, idx) => (
          <div className="flex flex-col" key={idx}>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex flex-auto">
                <input
                  key={e.id}
                  type="text"
                  onChange={(evt) => {
                    var imagesList = [...productUpdated.images];

                    const image = {
                      id: "",
                      href: evt.target.value,
                    };

                    imagesList.length > 0
                      ? (imagesList[idx] = image)
                      : imagesList.push(image);

                    setProductUpdated({
                      ...productUpdated,
                      images: imagesList,
                    });
                  }}
                  className="p-1 border border-gray-500 w-full"
                  name="images"
                  id="images"
                  value={e.href}
                />
              </div>
              <div
                className="bg-red-500 rounded-full m-1 cursor-pointer"
                onClick={() => removeImageFieldHandler(idx)}
              >
                <img width={20} src="assets/remove.svg" alt="add"></img>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageForm;
