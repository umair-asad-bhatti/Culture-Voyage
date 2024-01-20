import { useState } from "react";
import { Trash, DocumentUpload } from "iconsax-react";
import axios from "axios";
export const UploadImage = ({imageAsset,setImageAsset}) => {
  
  //TODO upload the imageAsset to cloudinary and it will return the url to image
  //TODO then upload the url of image to firebase firestore
  //TODO then take name and description of the community
  //TODO make final document in firestore



  const uploadImage = (e) => {
    const file = e.target.files[0];
   // console.log(URL.createObjectURL(file))
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (["png", "jpg", "jpeg", "mp4",].includes(fileExtension)) {
        setImageAsset(file);
      } else {
        alert(
          "Invalid file type. Please select a valid image (png, jpg, jpeg) or video (mp4)."
        );
      }
    }


  };
  return (
    <div className={"h-full w-full border rounded p-2 inline-block mx-auto"}>
      {!imageAsset ? (
        <label>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">
                <DocumentUpload size="25" color="#FF8A65" />
              </p>
              <p className="text-sm w-full"> click to upload</p>
            </div>
            <p className="mt-4 text-sm text-gray-400 ">
              Use high-quality jpeg, mp4, png image
            </p>
          </div>
          <input
            type="file"
            name="upload-image"
            onChange={uploadImage}
            className="w-0 h-0"
          />
        </label>
      ) : (
        <div className="relative h-full">
          <img
            src={URL.createObjectURL(imageAsset)}
            alt="uploaded-image"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            onClick={() => setImageAsset(null)}
          >
            <Trash size="32" color="#FF8A65" />
          </button>
        </div>
      )}
    </div>
  );
};
