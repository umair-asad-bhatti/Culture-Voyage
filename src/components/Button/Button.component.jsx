

// eslint-disable-next-line react/prop-types
export default function Button({ children, onClickHandler, isDisabled }) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className="w-full bg-accent text-white font-bold p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
            {children}
        </button>
    )
}
