
// eslint-disable-next-line react/prop-types
export default function Button({ children, onClickHandler, isDisabled,px=2,py=2 }) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClickHandler}
            className={`w-full bg-accent text-textLight font-bold px-${px} py-${py} rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-accent`}
        >
            {children}
        </button>
    )
}
