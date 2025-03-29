import Image from "next/image";
import noResult from "@/asset/no-result-found.svg";

export default function NoResultFound() {
    return (
        <div className="flex flex-col gap-5 items-center justify-start">
            <Image height={48} width={48} className="h-48 w-48" src={noResult} alt="noResult" />
            <h2 className="text-secondrybackground font-semibold text-4xl">No Results Found</h2>
            <span className="text-xs text-[#7B899D] font-normal text-center m-0">We couldn’t find what you searched for.
                <br />
                Try searching again.</span>
        </div>
    );
}
