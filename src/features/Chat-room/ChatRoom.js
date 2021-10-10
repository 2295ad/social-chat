import {connect} from 'react-redux';
import {Container} from 'reactstrap';
import {Button, Box, Flex, Text} from 'rebass/styled-components';
import {useState,useEffect} from 'react';
import styled from 'styled-components';
import { Input} from '@rebass/forms';

import {sendMsg, pushPost, pushPostApi} from '../../helpers/actions';
import {USER_EVENT, SOCKET_CONSTANTS, AVATAR_NAMES} from '../../helpers/constants';
import {ModalBox, Avtar, Grid} from '../../components';
import {apiService} from '../../helpers/apiServices';
import {timeConverter} from '../../utils/timeParser';

const AvatarBox = styled(Box)`
    cursor:pointer;
`
const PostSection= styled(Box)`
    min-height: ${props=>props.userType==='SUPER_USER'?'75vh':'90vh'};
    border:2px solid #1D31F9;
    border-radius:5px;
    overflow-y:auto;
    max-height:500px;
    `
const CommentBox = styled(Box)`
    min-height: 10vh;
    border:2px solid #FD1F09;
    border-radius:5px;
    margin-top:30px;
`

const ChatRoom = (props)=>{

    const [isOpen,setOpen] = useState(false);
    const [userComment, setComment] = useState("");

    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);
    const saveComment = (el) => {
        el.preventDefault();
        setComment(el.target.value)
    };
    const setSuperUser = ()=>{
        props.dispatch(sendMsg({type:USER_EVENT.SET_SUPER_USER,query:""}));
        closeModal();
    }

    const handleSubmit = (el)=>{
        el.preventDefault();
        const body = {
            data:{
                content:userComment,
                name:AVATAR_NAMES[props.avatar-1],
                index:props.avatar,
                ts:Math.floor(Date.now() / 1000),
            },
            url:'http://localhost:3001/users/savePost',
        }
        apiService.postData(body)
            .then((res)=>{
                if(res.success){
                    body.data.postcount=props.posts.length?props.posts.length:1;
                    props.dispatch(pushPost(body.data));
                    setComment("");
                }
            }).catch((e)=>{console.error(e)})
    }

    useEffect(()=>{
        apiService.getData('http://localhost:3001/users/fetchPosts',{count:10}) 
                    .then((res)=>{
                        if(res.success && res?.data && res.data.length){
                            props.dispatch(pushPostApi(res.data));
                        }
                    })
                    .catch((e)=>console.error(e)); 
        /* eslint-disable*/
    },[]);
   
    return(
        <Container>
            <Flex 
                alignItems='center' 
                flexDirection='row' 
                mb={'6px'}
                justifyContent='center' >
                {props.superUserNudge && 
                <Flex alignItems='baseline' flexDirection='row' mb={'10px'} mt={'10px'} >
                    <Button variant='outline' mr={2} onClick={()=>openModal()}>
                        Choose Avatar
                    </Button>
                    <Text
                        as="p"
                        fontSize={[ 4 ]}
                        color='#1D31F9'
                        textAlign="center"
                        mb={'20px'}>
                        Super user available, choose your avatar & post!
                    </Text>
                </Flex>
                }
            </Flex>

            <ModalBox 
                isOpen={isOpen}
                onClose={closeModal}
                heading={"Choose your Avatar"}>
                <Box>
                    <Text
                        as="p"
                        fontSize={[ 5 ]}
                        color='#1D31F9'
                        textAlign="center"
                        mb={'20px'}>
                        Choose your Avatar
                    </Text>
                    {   
                    AVATAR_NAMES.map((ele,index)=>{
                        return <Flex alignItems='center' 
                                    flexDirection='row' 
                                    style={{borderBottom: '1px solid'}}
                                    mb={'6px'}
                                    justifyContent='center' 
                                    key={index}
                                    >
                                        <AvatarBox onClick={()=>setSuperUser(index+1)}>
                                        <Avtar src={`../../assets/nerd_${index+1}`}/>
                                        </AvatarBox>
                                        <Text as = "p" fontSize={[ 3 ]} ml={'10px'}>{ele}</Text>
                            </Flex>
                    })
                    }
                </Box>
            </ModalBox>

            <Flex flexDirection='column'>
                <PostSection pb={2} userType={props.userType} >
                    {props.posts.map((el,index)=>{
                            return (
                                <Grid name={el.name} 
                                     index={el.index}
                                     ts={timeConverter(el.ts)} 
                                     content={el.content}
                                     key={index}
                                />
                            )
                    })}
                </PostSection>
                {props.userType==='SUPER_USER'&&
                <CommentBox p={2}>
                    <Box as ='form' onSubmit={handleSubmit}>   
                        <Flex flexDirection='row'>
                            <Input
                                id='post'
                                type='text'
                                value={userComment}
                                onChange={saveComment}
                                placeholder='Type your message & press Enter or Submit'      
                            />
                            {props.socketConnection===SOCKET_CONSTANTS.CONNECTED ?
                                <Button variant='outline' ml={2}>
                                    Submit
                                </Button>:<Text
                                    as="p"
                                    fontSize={[ 2 ]}
                                    color='#1D31F9'
                                    textAlign="center"
                                    mb={'20px'}>
                                    Please try reconnecting again!
                                </Text>}
                        </Flex>
                    </Box>
                </CommentBox>
                }
            </Flex>
        </Container>
    )
}

const mapStateToProps = function(state){
    return{
        userType:state.userType,
        superUserNudge:state.superUserNudge,
        socketConnection:state.socketConnection,
        posts:state.posts,
        avatar:state.avatar,
    }
}
export default connect(mapStateToProps)(ChatRoom);