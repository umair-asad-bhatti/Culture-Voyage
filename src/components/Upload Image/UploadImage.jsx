import {useState} from "react";
import {Trash,DocumentUpload} from 'iconsax-react'
export const UploadImage=()=>{
    const [imageAsset,setImageAsset]=useState(null)
    //TODO upload the imageAsset to cloudinary and it will return the url to image
    //TODO then upload the url of image to firebase firestore
    //TODO then take name and description of the community
    //TODO make final document in firestore
    const uploadImage=(e)=>{
        //TODO before upload image check its type to be png,jpg or .mp4 something like that
        //TODO it must not be pdf or any other file format
        console.log(URL.createObjectURL(e.target.files[0]))
        setImageAsset(e.target.files[0])
    }
    return (
        <div className={'h-96 w-96 border rounded p-2 inline-block mx-auto' }>
            {!imageAsset ?
                (
                    <label>
                        <div className='flex flex-col items-center justify-center h-full'>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='font-bold text-2xl'>
                                    <DocumentUpload
                                        size="32"
                                        color="#FF8A65"
                                    />
                                </p>
                                <p className='text-lg w-full' > click to upload</p>
                            </div>
                            <p className='mt-32 text-gray-400 '>Use high-quality jpeg,svg, png image</p>
                        </div>
                        <input type='file' name='upload-image' onChange={uploadImage} className='w-0 h-0' />
                    </label>
                ) : (
                    <div className='relative h-full'>
                        <img src={URL.createObjectURL(imageAsset)} alt="uploaded-image"
                             className='h-full w-full'
                        />
                        <button
                            type='button'
                            className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                            onClick={() => setImageAsset(null)}
                        >
                            <Trash
                                size="32"
                                color="#FF8A65"
                            />
                        </button>
                    </div>
                )}
        </div>
    )
}