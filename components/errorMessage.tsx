import Image from "next/image"

export default function ErrorMessage({message}: {message: string}) {
    return (
        <div className="fixed bg-white top-[50%] left-[50%] w-fit translate-x-[-50%] translate-y-[-50%] border border-gray-200 p-[10px] rounded-2xl shadow-2xl z-50">
            <div className="flex items-center mb-[10px] gap-[10px]">
                <Image
                src={"/images/danger.png"}
                width={40}
                height={40}
                alt="alert"
            />
            <p>Something went wrong!</p>
            </div>
            
            <span className="text-red-500">{message}</span>
        </div>
    )
}