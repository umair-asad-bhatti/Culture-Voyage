/* eslint-disable react/prop-types */
import { CommunityCard } from "../CommunityCard/CommunityCard.jsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.jsx";
import { SadAnimation } from "../SadAnimation/SadAnimation.jsx";

// eslint-disable-next-line react/prop-types
export const CommunityListing = ({ communities, isFetching = false }) => {

    if (isFetching)
        return <div className={'flex items-center justify-center w-full'}><LoadingSpinner size={'16'} /></div>
    if (!isFetching && communities.length === 0)
        return <div className={'flex items-center justify-center w-full'}><SadAnimation size={'16'} /></div>

    else
        return <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {communities.map((communityData, index) => <CommunityCard key={index} community={communityData} />)}
        </div>
}