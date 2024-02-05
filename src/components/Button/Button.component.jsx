
// eslint-disable-next-line react/prop-types
export default function Button({ children, onClickHandler, isDisabled, px = 2, py = 2 }) {

    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className={`w-full bg-buttonBackgroundColor text-buttonLightTextColor dark:text-buttonDarkTextColor font-bold rounded-lg hover:bg-buttonBackgroundOnHover  focus:outline-none focus:shadow-outline-accent px-${px} py-${py} `}
        >
            {children}
        </button>
    )
}
