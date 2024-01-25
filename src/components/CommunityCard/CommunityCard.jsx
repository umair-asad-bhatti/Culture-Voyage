// eslint-disable-next-line react/prop-types
export const CommunityCard = ({ community }) => {
    return (
        <div className="flex items-center gap-4 border shadow p-4 rounded-lg ">
            <img
                className="w-20 h-20 rounded-full"
                src={community.communityLogoUrl}
                alt={`Logo for ${community.communityName}`}
            />
            <div className="flex-col gap-2">
                <p className="text-xl font-bold dark:text-textPrimary text-textSecondary">
                    {community.communityName}
                </p>
                <p className="text-lg text-accent ">{community.smallDescription}</p>
                <p className="text-lg dark:text-textPrimary text-textSecondary">
                    {community.communityType}
                </p>
            </div>
        </div>
    );
};
