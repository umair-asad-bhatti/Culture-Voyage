import {useState} from "react";

export const UploadImage=()=>{
    const [imageAsset,setImageAsset]=useState(null)
    const uploadImage=(e)=>{
        console.log(URL.createObjectURL(e.target.files[0]))
        setImageAsset(e.target.files[0])
    }
    return (
        <div className={'h-96 w-96 border rounded p-2 inline-block mx-auto' }>
            {!imageAsset ?
                (
                    <label>
                        <div className='flex flex-col items-center justify-center h-full'>
                            <div className='flex flex-col justify-center items-center '>
                                <p className='font-bold text-2xl'>
                                    {/*<AiOutlineCloudUpload />*/}
                                </p>
                                <p className='text-lg' > click to upload</p>
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
                            {/*<MdDelete />*/}
                            delete
                        </button>
                    </div>
                )}
        </div>
    )
}