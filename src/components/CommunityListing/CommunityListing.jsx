/* eslint-disable react/prop-types */
import { CommunityCard } from "../CommunityCard/CommunityCard.jsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.jsx";
import { SadAnimation } from "../SadAnimation/SadAnimation.jsx";

// eslint-disable-next-line react/prop-types
export const CommunityListing = ({ communities, isFetching = false }) => {

    if (isFetching)
        return <div className={'flex items-center justify-center w-full'}><LoadingSpinner size={'lg'} /></div>
    if (!isFetching && communities.length === 0)
        return <div className={'flex items-center justify-center w-full'}><SadAnimation size={'lg'} /></div>

    else
        return <div>
            {communities.map((communityData, index) => <CommunityCard key={index} community={communityData} />)}
        </div>
}