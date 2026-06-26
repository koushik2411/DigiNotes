function Loader() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-10">

            <div className="h-24 w-24 rounded-full border-8 border-blue-300 border-t-transparent animate-spin"></div>

            <p className=" text-lg font-semibold animate-pulse">
                Loading your Notes...
            </p>

        </div>
    );
}

export default Loader;