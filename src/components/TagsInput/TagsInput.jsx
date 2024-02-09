/* eslint-disable react/prop-types */
import {AddCircle} from "iconsax-react";

// eslint-disable-next-line react/prop-types
export const TagsInput=({tags, setTags, tagInputValue, setTagInputValue})=>{


    const handleInputChange = (e) => {
        setTagInputValue(e.target.value);
    };

    const addTag = () => {
            // eslint-disable-next-line react/prop-types
        if(!tags.includes(tagInputValue.trim()) && tags.length<5 && tagInputValue){
            setTags([...tags, tagInputValue.trim()]);
            setTagInputValue('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        // eslint-disable-next-line react/prop-types
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap gap-2">
            {/* eslint-disable-next-line react/prop-types */}
            {tags.map((tag) => (
                <div
                    key={tag}
                    className="dark:border-borderSecondary border-borderPrimary border-2 shadow text-textSecondary dark:text-textPrimary px-2 py-2 rounded-full cursor-pointer"
                    onClick={() => handleTagRemove(tag)}
                >
                    {tag}
                </div>
            ))}
            <div className={'flex  bg-primary dark:bg-secondary  border-2 dark:border-borderSecondary border-borderPrimary rounded-lg shadow px-2 py-1'}>
            <input
                type="text"
                value={tagInputValue}
                onChange={handleInputChange}
                className="border border-none w-auto outline-none bg-transparent dark:text-textPrimary text-textSecondary"
                placeholder="Add a tag..."

            />
                <AddCircle onClick={addTag} size="32" color="#FF8A65"/>
            </div>
        </div>
    );
}