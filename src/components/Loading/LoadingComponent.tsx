const LoadingComponent = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white shadow-2xl rounded-full">

                <svg className="w-14 animate-spin" viewBox="25 25 50 50">
                    <circle
                        className="stroke-blue-500 stroke-[2] fill-none stroke-linecap-round"
                        cx={50}
                        cy={50}
                        r={20}
                        strokeDasharray="90, 200"
                        strokeDashoffset={0}
                    />
                </svg>
            </div>
        </div>
    );
};


export default LoadingComponent;