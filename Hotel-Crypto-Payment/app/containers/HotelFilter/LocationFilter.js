import React from 'react';
import styled from 'styled-components';
import { Select, Slider, Input } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

export default class LocationFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Wrapper>
          {/* <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select City"
            optionFilterProp="children"
            onChange={this.props.CityChange}
            filterOption={
              (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
                location.map((item) => (
                  <Option value={item.name} key={item.name}>{item.name}</Option>
                ))
            }
          </Select> */}
        </Wrapper>
        {/* <Wrapper>
          <Slider
            marks={{ 0.5: '0.5 km', 20: '20 km' }}
            step={0.1}
            min={0.5}
            max={20}
            onChange={this.props.DistanceChange}
          />
        </Wrapper> */}
        <Wrapper>
          <Search
            placeholder="Address"
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
            name="address"
            onChange={this.props.InputChange}
          />
        </Wrapper>
        <Wrapper>
          <Search
            placeholder="Hotel Name"
            onSearch={(value) => console.log(value)}
            style={{ width: 200 }}
            name="name"
            onChange={this.props.InputChange}
          />
        </Wrapper>
      </div>

    );
  }
}
const Wrapper = styled.div`
    text-align:center;
    padding: 8px 0px;
`;
