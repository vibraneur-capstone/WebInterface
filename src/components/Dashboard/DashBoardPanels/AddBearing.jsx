import React from 'react';
import { Button } from 'react-bootstrap';
import SearchFilter from '../../Tools/SearchFilter';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class AddComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tags: {
                tagNames: [],
                tagValues: []
            }
        }

        this.addUserTag = this.addUserTag.bind(this);
        this.updateTagName = this.updateTagName.bind(this);
        this.updateTagValue = this.updateTagValue.bind(this);
        this.addBearing = this.addBearing.bind(this);
        this.results = this.results.bind(this);
    }

    componentDidMount() {
        
        if ('config' in this.props) {
            let config = this.props.config;
            if (config !== undefined && 'id' in config) {
                this.props.setTitle(config.id);
            } else {
                // We have to search for the bearing from user input
                this.setState({
                    search: true,
                })
                this.props.setTitle('Bearing Stats');
            }
        } else {
            this.props.setTitle('Bearing Stats');
        }
    }

    addUserTag() {
        console.warn("ADDING USER TAG")
        let new_tags = this.state.tags;
        new_tags.tagNames.push('')
        new_tags.tagValues.push(undefined);

        this.setState({
            tags: new_tags
        })
    }

    updateTagName(idx, name) {
        let tags = this.state.tags;
        tags.tagNames[idx] = name;

        this.setState({
            tags: tags
        })
    }

    updateTagValue(idx, value) {
        let tags = this.state.tags;
        tags.tagValues[idx] = value;
        
        this.setState({
            tags: tags
        })
    }

    addBearing() {
        console.warn("TAGS: ", this.state.tags);
    }

    results (results) {
        return <div>
            {results.map(el => (
                <button
                    onClick={() => this.props.setBearing(el.id)}
                    className='button searchButton'
                >
                    <span>{el.tags.name}</span>
                    
                </button>
            ))}
        </div> 
    }

    render() {

        let tags = [
            <tr className='add_generalTag'>
                <td>
                    <div style={{float: 'left', padding: '8px 5px 8px 5px'}} className='inline'>ID</div>
                </td>
                <td>
                    <h4 className='inline'> : </h4>
                </td>
                <td>
                    <input className='input'></input>
                </td>
            </tr>    
        ]
        
        for (let tag in this.state.tags.tagNames) {
            console.warn("TAG:", tag);
            tags.push(<tr className='add_generalTag'>
                <td>
                    <input className='input' onChange={(e) => this.updateTagName(tag, e.target.value)} className='inline'></input>
                </td>
                <td>
                    <h4 className='inline'> : </h4>
                </td>
                <td>
                    <input className='input' onChange={(e) => this.updateTagValue(tag, e.target.value)} className='inline'></input>
                </td>
                <td>
                    <button
                        style={{
                            color: '#d7263d',
                            border: '0px'
                        }}
                    ><FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon></button>
                </td>
                
            </tr>)
        }
        

        return (
            <div className='inside_panel' style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                <div className='tagContainer'>
                    <table
                        style={{width: '345px'}}
                    >
                        {tags}
                    </table>
                    <button 
                        className='button'
                        onClick={this.addUserTag}
                    >
                        Add Tag
                    </button>
                    <div>Attach Sensor:</div>
                    <SearchFilter
                        renderResults={this.results}
                        setBearing={this.props.changeBearing}
                        dataSource='https://sensor.vibraneur.com/inventory/v1/husky/bearings?status=ALL'
                    ></SearchFilter>
                    <button
                        className='button'
                        style={{ height: '38px'}}
                        onClick={this.addBearing}
                    >Add/Update Bearing</button>
                </div>
            </div>
        )
    }
}