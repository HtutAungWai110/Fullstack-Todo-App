import { ListItemType } from "../lib/types"


function getColorCode(id: string){
    return id.split("").splice(0, 6).join("")
}

export default function ListCard({list} : {list: ListItemType}) {
    return (
        <>
        <div className="w-[250px] border rounded-[5px] p-1 border-r-30 opacity-80 list-hover"
            style={{borderRightColor: `#${getColorCode(list.id)}`}}
        >
            <p className="w-full truncate">{list.title}</p>
        </div>
            
        </>
    )
}