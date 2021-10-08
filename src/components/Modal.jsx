
import Modal from 'react-modal';
import styled from 'styled-components';

const ModalBox =(props)=>{

    const ModalWrapper = styled(Modal)`
        border:2px solid black;
        width:${props=>props.width?props.width:'40%'};
        ${'' /* height:${props=>props.height?props.height:'50%'}; */}
        position: absolute;
        top: 20%;
        left: 25%;
        padding:2rem;
    `
    return(
            <ModalWrapper
                isOpen={props.isOpen}
                onRequestClose={props.onClose}
                contentLabel={props.heading}
                ariaHideApp={false}
                style={{content:{background: '#FFF'}}}
                >
                {props.children}
            </ModalWrapper>
    )

};

export default ModalBox;