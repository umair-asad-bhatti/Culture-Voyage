// eslint-disable-next-line react/prop-types
export const SplitScreenComponent = ({ children, leftWeight, rightWeight, middleWeight }) => {
    const [Left, Middle, Right] = children

    return (
        <>
            <div className='flex'>
                <div style={{ flexGrow: leftWeight }}>
                    {Left}
                </div>
                <div style={{ flexGrow: middleWeight }}>
                    {Middle}
                </div >
                <div style={{ flexGrow: rightWeight }}>
                    {Right}
                </div >
            </div >
        </>

    )

}