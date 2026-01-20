import Image from "next/image"

export default function SuccessfulMsg({message}: {message: string}) {
    return (
        <div className="fixed bg-white top-[50%] left-[50%] w-fit translate-x-[-50%] translate-y-[-50%] border border-gray-200 max-w-fit min-w-[200px] p-[10px] text-center rounded-2xl shadow-2xl z-50">
            <div className="flex justify-center mb-[10px]">
                <Image
                src={"/images/check.png"}
                width={50}
                height={50}
                alt="alert"
            />
            </div>
            
            <span className="text-green-500">{message}</span>
        </div>
    )
}