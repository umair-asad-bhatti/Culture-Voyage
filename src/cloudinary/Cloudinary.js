import axios from "axios";
const preset_key = "culturevoyage";
const cloud_name = "du2kwgdxc";
export const uploadImageAssetToCloudinary=async (imageAsset)=>{
    const formData = new FormData();
    formData.append('file',imageAsset);
    formData.append("upload_preset",preset_key);
    const {data}= await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData);
    return data;
}