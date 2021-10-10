import Avatar from 'react-avatar';


const Avtar = (props)=>{

    return(
        <Avatar src={props.src}  size={40} round="40px" style={{margin:5,border:'1px solid'}}/>
    )
}

export default Avtar;