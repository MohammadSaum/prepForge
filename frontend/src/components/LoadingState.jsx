function LoadingState({ message = "Loading..." }) {
    return (
        <div className="
            flex
            items-center
            justify-center
            py-20
        ">
            <div className="text-center">
                <div className="
                    w-5
                    h-5
                    border-2
                    border-[#24272B]
                    border-t-[#A1A3A8]
                    rounded-full
                    animate-spin
                    mx-auto
                    mb-4
                " />

                <p className="text-sm text-[#686A70]">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default LoadingState;