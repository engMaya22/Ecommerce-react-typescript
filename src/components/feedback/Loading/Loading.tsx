
import { TLoading } from "@customTypes/shared";


interface LoadingProps {
    status : TLoading,
    error:string | null,
    children:React.ReactNode,
}
export default function Loading ({status , error ,children}:LoadingProps){
    
    if(status === 'pending'){
        return <p>Loading please wait ...</p>
    }
    if(status === 'failed'){
        return <p>{error}</p>
    }
    return  <>
             {children}
            </>
}

