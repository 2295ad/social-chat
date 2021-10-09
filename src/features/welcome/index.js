import {useState, useEffect} from 'react';
import {Button, Box, Flex, Text} from 'rebass/styled-components';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {ModalBox, Avtar} from '../../components';
import {joinChat} from '../../helpers/actions';

function Welcome(props) {

    const Wrapper = styled(Box)`
      margin-top:100px;
      `
    const AvatarBox = styled(Box)`
      cursor:pointer;
      `
    const [isOpen,setOpen] = useState(false);
    
    const openModal = ()=> setOpen(true);
    const closeModal = ()=> setOpen(false);

    const socketConReq = ()=>props.dispatch(joinChat());

     
  return (
    <>
      <Wrapper>
        <center>
          <h3>Welcome, to public chat room.</h3>
          <Button variant='outline' mr={2} onClick={socketConReq}>JOIN CHAT</Button>
        </center>
        </Wrapper>
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
              ['Rayman','Kayzee','Nerddy','Hacker','Queenn'].map((ele,index)=>{
                return <Flex alignItems='center' 
                              flexDirection='row' 
                              style={{borderBottom: '1px solid'}}
                              mb={'6px'}
                              justifyContent='center' 
                              key={index}
                              >
                                <AvatarBox onClick={()=>alert(index+1)}>
                                  <Avtar src={`../../assets/nerd_${index+1}`}/>
                                </AvatarBox>
                                <Text as = "p" fontSize={[ 3 ]} ml={'10px'}>{ele}</Text>
                      </Flex>
              })
            }
          </Box>
        </ModalBox>
      </>
  );
}

const mapStateToProps = function(state) {
  return {
    userType: state.userType
  }
}

export default connect (mapStateToProps)(Welcome);
