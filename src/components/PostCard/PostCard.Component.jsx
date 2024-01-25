import CommunityLogo from '../../assets/Community.png'
import postImage from '../../assets/postImage.jpg'
import { Heart, MedalStar, Message } from "iconsax-react";
import Button from '../Button/Button.component.jsx'
import {Link} from 'react-router-dom'
// import { Card, CardBody, Image, Heading, Stack, Text, CardFooter, Button } from '@chakra-ui/react'
const PostCardComponent = () => {

    return (
        <Link to={`/post/sdfhkhkj5654jkh63`}>
        <div style={{transition:'0.1s ease'}} className="border border-borderPrimary dark:border-borderSecondary p-6 rounded-lg hover:bg-softGrey dark:hover:bg-darkerGrey cursor-pointer">
            {/*top section*/}
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-2 items-center justify-center'}>
                    <img src={CommunityLogo} alt="community image" />
                    <div>
                        <p className='dark:text-textPrimary text-textSecondary'>StarsNStripesHub</p>
                        <p className='dark:text-textPrimary text-textSecondary'>by @josh_01</p>
                    </div >
                </div >
                <div className={'flex items-center justify-start  gap-4'}>
                        <div className={'w-24'}>
                                {/*TODO implement the jon community feature*/}
                                <Button py={1} isDisabled={false} onClickHandler={()=>{}}>Join</Button>
                        </div>
                    <div className={'text-center dark:text-textPrimary text-textSecondary'}>34m</div>
                </div>
            </div >
            {/*   end top section*/}

            {/*    post card main title*/}
            <p className={'text-xl text-accent font-bold my-6 '}>A Slice of Americana: Sunday BBQ Tradition</p>
            {/*    post card main title ends*/}
            {/*    post card main section with image*/}
            <div className={'flex justify-center flex-col items-start my-4'}>
                <h2 className={'dark:text-textPrimary text-lg text-textSecondary'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi iste non reprehenderit....</h2>
                <img className={' my-2 rounded-lg shadow w-full h-60'} src={postImage} alt="post image" />
            </div>
            {/*    post card main section with image ends*/}
            {/*    post card footer section starts here*/}
            <div className={'mt-2 p-4 border border-x-0 border-b-0 border-t-1 border-borderPrimary dark:border-borderSecondary'}>
                <div className={'flex justify-between items-center'}>
                    {/*likes icon and likes information*/}
                    <div className={'cursor-pointer flex justify-center items-center gap-2'}>
                        <Heart
                            size="32"
                            className='dark:text-textPrimary text-textSecondary'
                        />
                        <p className='dark:text-textPrimary text-textSecondary'>41</p>
                    </div>
                    <div className={'cursor-pointer flex justify-center items-center gap-2'}>
                        <MedalStar
                            size="32"
                            className='dark:text-textPrimary text-textSecondary'
                        />
                        <p className='dark:text-textPrimary text-textSecondary'>41</p>
                    </div>
                    <div className={'cursor-pointer flex justify-center items-center gap-2'}>
                        <Message
                            size="32"
                            className='dark:text-textPrimary text-textSecondary'
                        />
                        <p className='dark:text-textPrimary text-textSecondary'>41</p>
                    </div>
                </div>
            </div>
            {/*    post card footer section ends here*/}

        </div >
        </Link>


        // <Card
        //     direction={{ base: 'column', sm: 'column', md: "column",lg }}
        //     overflow='hidden'
        //     variant='outline'

        // >
        //     <Image
        //         objectFit='cover'
        //         maxW={{ base: '100%', sm: '200px' }}
        //         src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        //         alt='Caffe Latte'
        //     />

        //     <Stack>
        //         <CardBody>
        //             <Heading size='md'>The perfect latte</Heading>

        //             <Text py='2'>
        //                 Caffè latte is a coffee beverage of Italian origin made with espresso
        //                 and steamed milk.
        //             </Text>
        //         </CardBody>

        //         <CardFooter>
        //             <Button variant='solid' colorScheme='blue'>
        //                 Buy Latte
        //             </Button>
        //         </CardFooter>
        //     </Stack>
        // </Card>
    )
}
export default PostCardComponent