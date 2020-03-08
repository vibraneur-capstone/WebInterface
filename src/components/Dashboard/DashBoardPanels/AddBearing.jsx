import React from 'react';
import SearchFilter from '../../Tools/SearchFilter';
import Button from '../../Tools/Button.jsx';
import TagRow from './TagRow.jsx';
import axios from 'axios';

export default class AddComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            tags: {
                tagIdx: [1],
                tagNames: {},
                tagValues: {}
            },
            nextIdx: 2,
        }

        this.addUserTag = this.addUserTag.bind(this);
        this.removeUserTag = this.removeUserTag.bind(this);
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
        let new_tags = this.state.tags;
        new_tags.tagIdx.push(this.state.nextIdx);
        new_tags.tagNames[this.state.nextIdx] = '';
        new_tags.tagValues[this.state.nextIdx] = undefined;

        this.setState({
            tags: new_tags,
            nextIdx: this.state.nextIdx + 1
        })
    }

    removeUserTag(id) {
        let new_tags = this.state.tags;
        let tag_idx = new_tags.tagIdx.indexOf(id);
        new_tags.tagIdx.splice(tag_idx, 1);
        let tagNames = new_tags.tagNames;
        let tagValues = new_tags.tagValues;
        delete tagNames[tag_idx];
        delete tagValues[tag_idx];
        new_tags.tagNames = tagNames;
        new_tags.tagValues = tagValues;
        this.setState({
            tags: new_tags
        })
    }

    updateTagName(idx, name) {
        if (idx === this.state.tags.tagIdx[this.state.tags.tagIdx.length - 1]) {
            this.addUserTag();
        }
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

        // Format the tags
        let formatted = {}
        for (let tag in this.state.tags.tagNames) {
            console.warn("TAG: ", tag);
            console.warn("TAG NAME: ", this.state.tags.tagNames[tag]);
            if (this.state.tags.tagNames[tag] !== "") {
                formatted[this.state.tags.tagNames[tag]] = this.state.tags.tagValues[tag];
            }
        }
        console.warn("FORMATTED: ", formatted);
        console.warn("SENDING ADD BEARING REQUEST")
        axios.post('https://sensor.vibraneur.com/inventory/v1/bearing', {
            "tags": formatted,
              "sensorId": []
        });
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
        
        for (let tag in this.state.tags.tagIdx) {
            tag = this.state.tags.tagIdx[tag];
            
            tags.push(<TagRow
                id={tag}
                key={tag}
                updateTagName={this.updateTagName}
                updateTagValue={this.updateTagValue}
                removeUserTag={this.removeUserTag}
                tag={tag}
            >

            </TagRow>
            )
        }
        

        return (
            <div className='inside_panel' style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                <div className='tagContainer'>
                    <table
                        style={{width: '345px'}}
                    >
                        {tags}
                    </table>
                    {/*<button 
                        className='button'
                        onClick={this.addUserTag}
                    >
                        Add Tag
                    </button>*/}
                    <div>Attach Sensor:</div>
                    <SearchFilter
                        renderResults={this.results}
                        setBearing={this.props.changeBearing}
                        dataSource='https://sensor.vibraneur.com/inventory/v1/Husky/bearings?status=ALL'
                    ></SearchFilter>
                    <Button
                        style={{ height: '38px'}}
                        onClick={this.addBearing}
                        colours={this.props.colours}
                        contents={'Add/Update Bearing'}
                    ></Button>
                </div>
            </div>
        )
    }
}