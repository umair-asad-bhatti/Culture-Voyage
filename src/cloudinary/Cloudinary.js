import axios from "axios";

export const uploadImageAssetToCloudinary=async (imageAsset)=>{
    const preset_key = "culture voyage";
    const cloud_name = "dxudpps7i";
    const formData = new FormData();
    formData.append('file',imageAsset);
    formData.append("upload_preset",preset_key);
    const {data}= await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    return data;
}