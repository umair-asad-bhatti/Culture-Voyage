import { EyeSlash, Eye } from "iconsax-react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function InputField({ type, value, setValue, children, maxLength }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isTextarea = type === 'textarea';
  return (
    <div className={`flex items-center gap-2 bg-transparent w-full py-1 px-4 text-lg border-2 focus-within:border-accent rounded-lg ${isTextarea ? 'flex-col' : ''}`}>
      {children}
      {isTextarea ? (
        <textarea
          placeholder={type}
          name={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='outline-none border-none dark:text-textPrimary w-full bg-transparent resize-none'
          maxLength={maxLength}
        />
      ) : (
        <input
          placeholder={type}
          type={!isPasswordVisible ? type : 'text'}
          name={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='outline-none border-none dark:text-textPrimary w-full bg-transparent'
        />
      )}
      {isTextarea && (
        <div className="flex justify-end items-center mt-2">
          <span className={`text-[#808998] ${value.length === maxLength ? 'text-red-500' : ''}`}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
      {type === 'password' && (
        <div className={`flex content-end ml-2 ${isTextarea ? 'mt-2' : ''}`} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {type === 'password' && (!isPasswordVisible ? <EyeSlash className={'dark:text-primary text-darkGrey'} /> : <Eye className={'dark:text-primary text-darkGrey'} />)}
        </div>
      )}
    </div>
  );
}
