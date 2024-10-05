
import { memo } from "react";

const   Heading =memo(({title}:{title:string})=> {
  return (
    <h2 className="mb-3" style={{fontSize:"26px"}}>{title }</h2>
  )
})
export default Heading;



// import { memo } from "react";

// const   Heading =memo(({children}:{children:React.ReactNode})=> {//we recieve the title as childeren node 

//   console.log('rener');
//   return (
//     <h2 className="mb-3" style={{fontSize:"26px"}}>{children }</h2>
//   )
// })
// export default Heading;