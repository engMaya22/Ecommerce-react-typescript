import Lottie from "lottie-react";
import notFound from "@assets/Lottiefiles/notFound.json"
import emptyCart from "@assets/Lottiefiles/emptyCart.json"
import error from "@assets/Lottiefiles/error.json"
import loading from "@assets/Lottiefiles/loading.json"


const lottieFilesMap = {//we need this to map imports with passed type
  notFound,//name key same to name value(type)
  emptyCart,
  error,
  loading
}
type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap,
    message?:string,
 
}

const LottieHandler = ({type , message } :LottieHandlerProps )=> {
  const messageStyle =  type === 'error' ? 
                                           {fontSize:'19px' , color:'red'} 
                                         : {fontSize:'19px', marginTop:'30px'};
  const lottie = lottieFilesMap[type];
  return (
    <div className={`d-flex flex-column align-items-center  ${type === 'error'? 'text-danger': null}`}>
        <Lottie animationData={lottie} style={{width:'400px' } }
                    // loop={false} 
                    />
        {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default LottieHandler;