
import { EyeSlash, Eye } from "iconsax-react"
import { useState } from "react"
// eslint-disable-next-line react/prop-types
export default function InputField({ type, value, setValue, children }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <div className="flex items-center gap-2  w-full py-2 px-4 text-lg border-2 border-[#808998] rounded-lg focus-within:border-accent">
            {children}
            <input

                placeholder={type}
                type={!isPasswordVisible ? type : 'text'}
                name={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='outline-none border-none w-full'
            />
            {
                type == 'password' && <div className="flex content-end ml-16" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {type == 'password' && (!isPasswordVisible ? <EyeSlash

                        color="#808998"
                    /> : <Eye

                        color="#808998"
                    />)}
                </div>
            }




        </div>
    )
}
