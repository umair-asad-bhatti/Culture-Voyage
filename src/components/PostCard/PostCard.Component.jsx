import CommunityLogo from '../../assets/Community.png'
import postImage from '../../assets/postImage.png'
import { Heart, MedalStar, Message } from "iconsax-react";
import Button from '../Button/Button.component.jsx'
// import { Card, CardBody, Image, Heading, Stack, Text, CardFooter, Button } from '@chakra-ui/react'
const PostCardComponent = () => {

    return (
        <div className="border border-grey p-6 rounded-lg">
            {/*top section*/}
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-2 items-center justify-center'}>
                    <img src={CommunityLogo} alt="community image" />
                    <div>
                        <h1 className='dark:text-textPrimary text-textSecondary'>StarsNStripesHub</h1>
                        <h3 className='dark:text-textPrimary text-textSecondary'>by @josh_01</h3>
                    </div >
                </div >
                <div className={'flex items-center justify-start  gap-4'}>
                    {/*<div className={' py-1 px-4 bg-accent text-white rounded-lg hover:bg-blue-500 cursor-pointer'}>Join</div>*/}
                        <div className={'w-24'}>
                                <Button isDisabled={false} onClickHandler={()=>{}}>Join</Button>
                        </div>
                    <div className={'text-center dark:text-textPrimary text-textSecondary'}>34m</div>
                </div>
            </div >
            {/*   end top section*/}

            {/*    post card main title*/}
            <h1 className={'text-3xl text-accent font-bold my-6 '}>A Slice of Americana: Sunday BBQ Tradition</h1>
            {/*    post card main title ends*/}
            {/*    post card main section with image*/}
            <div className={'flex justify-center items-start my-4'}>
                <h2 className={'dark:text-textPrimary text-xl text-textSecondary'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi iste non reprehenderit sed veritatis? Adipisci commodi ea esse, et facere modi molestias, quas quis, recusandae reiciendis sint temporibus totam.</h2>
                <img src={postImage} alt="post image" />
            </div>
            {/*    post card main section with image ends*/}
            {/*    post card footer section starts here*/}
            <div className={'mt-2 p-4 border border-x-0 border-b-0 border-t-1 border-grey'}>
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