import Button from '../Button/Button.component.jsx'
import {Divider} from "@chakra-ui/react";
import {UserContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import {Link} from 'react-router-dom'
// eslint-disable-next-line react/prop-types
export const CommunityCard = ({ community }) => {
    const {user}=useContext(UserContext)
    return (
        <Link to={`/communities/${community.id}`}>
        <div className={'border border-borderPrimary dark:border-borderSecondary my-2 hover:bg-softGrey dark:hover:bg-darkerGrey cursor-pointer  shadow p-4 rounded-lg'}>
        <div className="flex items-center gap-4 ">
            <img
                className="w-20 h-20 rounded-full"
                src={community.communityLogoUrl}
                alt={`Logo for ${community.communityName}`}
            />
            <div className="flex-col gap-2 w-full">
                <div className={'flex justify-between w-full'}>
                    <p className="text-xl font-bold text-accent"> {community.communityName}</p>
                    <p className={'dark:text-textPrimary text-textSecondary'}>Create At: <span className={'text-accent'}>{community.createdAt}</span></p>
                </div>
                <p className="text-lg dark:text-textPrimary text-textSecondary ">{community.smallDescription}</p>
                <p className="text-lg dark:text-textPrimary text-textSecondary">

                </p>
            </div>
        </div>
            <div className={'my-2'}>
                <Divider/>
            </div>
            <div className={'flex justify-between items-center w-full'}>
                <p className={'dark:text-textPrimary text-textSecondary'}>Online Users: 0</p>
                <div className={'w-[120px]'}>
                    {/*dont show join button for communities which is created by user who is logged in*/}
                    {community.createdBy!==user.uid &&   <Button py={1} onClickHandler={()=>{}} isDisabled={false} >Join</Button>}

                </div>
            </div>
        </div>
        </Link>
    );
};
