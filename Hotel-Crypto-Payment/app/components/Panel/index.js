
import React from 'react';
import styled from 'styled-components';
import { Row,Col } from 'antd';
const Panel=(props)=>(
    <Row style={style}>
        <Col span={2} >
            <img src={props.src} style={{width:40}}/>
        </Col>
        <Col span={10}>
            <Title>{props.title}</Title>
            <Subtitle>{props.subtitle}</Subtitle>
        </Col>
    </Row>
)
const style={
    background: 'rgba(3, 169, 244, 0.09)',
    border: '1px dotted',
    padding: '10px',
    borderRadius: '5px'
}
const Title=styled.div`
    font-size:20px;
    font-weight: bold;
    color: #2c3a8a
`
const Subtitle=styled.div`
    font-size:12px
`

export default Panel