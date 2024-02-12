import React from "react";

export const CommunityDetailPageSkelton = () => {
  return (
    <>
      <div className={"w-full relative rounded-lg shadow-lg h-[300px]"}>
        <div className=" dark:bg-secondary h-12 w-12 flex items-center justify-center rounded-full absolute top-2 left-2 skeleton"></div>
        <div className={"object-cover rounded-lg w-full h-full skeleton"}></div>
        <div
          className={
            "md:w-[200px] w-32 h-32 border md:h-[200px] object-cover rounded-full absolute md:-bottom-20 -bottom-12 right-24 skeleton"
          }
        ></div>
      </div>
      <div className={"w-full dark:text-textPrimary text-textSecondary my-12"}>
        <h1 className={"font-extrabold text-2xl my-2  skeleton w-[40%]"}>
          &nbsp;
        </h1>
        <h1 className={"font-extrabold mt-2 skeleton w-[40%]"}>&nbsp;</h1>
        <p
          className={
            "dark:text-textPrimary mt-2 text-textSecondary w-[40%] skeleton"
          }
        >
          &nbsp;
        </p>
        <h1 className={"my-2 skeleton w-[40%]"}>&nbsp;</h1>
        <div className={"flex items-center justify-start gap-1 flex-wrap"}>
          <p className={"font-extrabold skeleton w-[10%] h-7"}>&nbsp;</p>
          <div>
            <p
              className={`border-none mx-1 p-4 md:my-0 my-2 badge skeleton`}
            ></p>
          </div>
        </div>
        <div className="flex items-center md:justify-end my-8 gap-8  ">
          <p className={" skeleton w-[20%] h-8 "}>&nbsp;</p>
        </div>

        <div className="w-full ">
          <div className="collapse bg-primary dark:bg-secondary border border-t-0 border-l-0 border-r-0 ">
            <input type="checkbox" />
            <div className="collapse-title md:text-2xl  font-medium skeleton"></div>
            <div className="collapse-content">
              <p className="skeleton">&nbsp;</p>
            </div>
          </div>
        </div>
        <div className="w-full rounded-none">
          <div className="collapse bg-primary  dark:bg-secondary border border-t-0 border-l-0 border-r-0  mt-4">
            <input type="checkbox" />
            <div className="collapse-title md:text-2xl  font-medium skeleton"></div>
            <div className="collapse-content">
              <p className="skeleton">&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
