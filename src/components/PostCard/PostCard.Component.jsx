
// import { Card, CardBody, Image, Heading, Stack, Text, CardFooter, Button } from '@chakra-ui/react'
const PostCardComponent = () => {

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
                    <button className="btn hover:bg-accent hover:text-white bg-primary text-black border shadow-lg">Watch</button>
                </div>
            </div>
        </div>
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