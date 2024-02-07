
import { Divider } from "@chakra-ui/react"
export default function CommunityCardSkelton() {
    return (
        <div
            className={
                "border border-borderPrimary dark:border-borderSecondary shadow-sm shadow-accent  hover:bg-softGrey dark:hover:bg-darkerGrey cursor-pointer md:w-[50%] w-full min-h-[250px]  p-8 rounded-lg"
            }
        >
            <div className="flex flex-wrap  items-center gap-4">
                <div className="w-20 h-20 rounded-full skeleton"></div>
                <p className="skeleton w-[70%] h-4">
                </p>
            </div>
            <div className="flex justify-between my-4 flex-wrap gap-6">
                <p className="skeleton w-[45%] h-4 ">
                </p>
                <p className={"skeleton w-[45%]  h-4"}>

                </p>
            </div>
            <Divider className="my-8" />
            <div className={"flex  justify-between items-center gap-4"}>
                <p className={"w-[40%] h-4 skeleton"}>
                </p>
                <p className={"w-[40%] h-4 skeleton"}>
                </p>
            </div>
        </div>
    )
}
