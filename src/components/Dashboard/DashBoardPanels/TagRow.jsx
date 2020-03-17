import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TagRow extends React.Component {

    render () {

        let tag;
        if ('tag' in this.props) {
            tag = this.props.tag;
        }
        let value;
        if ('value' in this.props) {
            value = this.props.value;
        }

        let style;
        if (this.props.editting) {
            style = {
                color: '#d7263d',
                border: '0px'
            }
        } else {
            style = {
                color: '#8d909b',
                border: '0px'
            }
        }

        return (
            <tr id={this.props.tag} className='add_generalTag'>
                <td>
                    <input className='input' onChange={(e) => this.props.updateTagName(this.props.tag, e.target.value)}></input>
                </td>
                <td>
                    <h4 className='inline'> : </h4>
                </td>
                <td>
                    <input className='input' onChange={(e) => this.props.updateTagValue(this.props.tag, e.target.value)}></input>
                </td>
                <td>
                    <button
                        style={style}
                        disabled={!this.props.editting}
                        onClick={() => this.props.removeUserTag(this.props.tag)}
                    ><FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon></button>
                </td>
                
            </tr>
        )
    }
}