import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TagRow extends React.Component {

    render () {
        return (
            <tr id={this.props.tag} className='add_generalTag'>
                <td>
                    <input className='input' onChange={(e) => this.props.updateTagName(this.props.tag, e.target.value)} className='inline'></input>
                </td>
                <td>
                    <h4 className='inline'> : </h4>
                </td>
                <td>
                    <input className='input' onChange={(e) => this.props.updateTagValue(this.props.tag, e.target.value)} className='inline'></input>
                </td>
                <td>
                    <button
                        style={{
                            color: '#d7263d',
                            border: '0px'
                        }}
                        onClick={() => this.props.removeUserTag(this.props.tag)}
                    ><FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon></button>
                </td>
                
            </tr>
        )
    }
}