"use client";

const Profile = () => {
  return (
    <>
      <>
        <div className="w-full flex flex-col pb-4 mb-1.5 sm:mb-12">
          <div className="w-full">
            <div className="w-full relative sm:h-48 h-[9rem]">
              <div className="rounded-xl sm:rounded-2xl w-full sm:max-w-2xl inset-0 transition-all duration-500 hover:saturate-[70%] bg-neutral-900/5 max-w-xl bg-[url('/bg/random.jpeg')] bg-cover bg-center mx-auto ml-0 h-36 sm:h-full">
                <div className="w-full  max-w-nav mx-auto left-1/2 -translate-x-1/2 absolute -bottom-6 sm:-bottom-12">
                  <img
                    title="cover image"
                    src="/avatars/laptop-avatar.png"
                    width="130"
                    height="130"
                    className="ring-4 size-24 sm:size-32 transition-all duration-300 cursor-not-allowed hover:saturate-[30%] hover:scale-110 ring-neutral-700/20 aspect-square rounded-full  bg-[#dcdcdc]"
                    alt=" avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Profile;
