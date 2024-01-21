
// eslint-disable-next-line react/prop-types
export default function Button({ children, onClickHandler, isDisabled }) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className="w-full bg-accent text-textLight font-bold p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-accent"
        >
            {children}
        </button>
    )
}
