
const   Heading =({children}:{children:React.ReactNode})=> {//we recieve the title as childeren node 
  return (
    <h2 className="mb-3" style={{fontSize:"26px"}}>{children }</h2>
  )
}
export default Heading;