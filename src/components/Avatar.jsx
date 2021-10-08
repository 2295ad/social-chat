import Avatar from 'react-avatar';


const Avtar = (props)=>{

    return(
        <Avatar src={props.src}  size={40} round="40px" style={{marginBottom:'5px'}}/>
    )
}

export default Avtar;