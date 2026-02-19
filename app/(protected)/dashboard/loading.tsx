import { ThreeDotsLoader } from "@/components/Loader";

export default function Loader(){
    return (
        <div className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <ThreeDotsLoader label="Fetching..."/>
        </div>
    )
}