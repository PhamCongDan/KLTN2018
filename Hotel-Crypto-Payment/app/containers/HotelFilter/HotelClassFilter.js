import React from 'react';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Rate} from 'antd'
class HotelClassFilter extends React.Component {
  constructor(props){
    super(props)
   
  }



  render() {
    const data=[1,2,3,4,5]
    return (
        <FormGroup>
          {data.map((item)=>(
            <FormControlLabel
              control={
              <CheckboxField
                label={item}
                handleChange={this.props.handleChange}
                value={item}
                
              />
            }
            label={
              <Rate disabled defaultValue={item}/>
            }
          />
          ))
          }
        </FormGroup>
    );
  }
}
export class CheckboxField extends React.PureComponent {
  constructor(props){
    super(props)
  }
  // handleCheck = (event, checked) => {
  //   // this.props.onChange(event, isInputChecked, this.props.value);
  //   this.set
   
  // };

  render() {
    return (
          <Checkbox
          label={<Rate disabled defaultValue={this.props.label}/>}
          value= {this.props.value}
          onChange={this.props.handleChange}
          color='default'
          />
    )}
}
export default HotelClassFilter;
const plainOptions = ['1','2','3','4','5'];
// export default class HotelClassFilter extends React.Component {
//   render() {
//     return (
//       <div>
//         <div>
//             <Checkbox
//               indeterminate={this.props.indeterminate}
//               onChange={this.props.onCheckAllChange}
//               checked={this.props.checkAll}
//             >
//               Check all
//             </Checkbox>
//           </div>
//         <br />
//         <CheckboxGroup
//             options={plainOptions}
//             value={this.props.checkedList}
//             onChange={this.props.onChange}
//           />
//       </div>
//     );
//   }
//   }
