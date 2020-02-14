import React from 'react';
import { Button } from 'react-bootstrap';
import SearchFilter from '../../Tools/SearchFilter';

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
            }
        } else {
            this.props.setTitle('Add New Bearing')
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

    render() {

        let tags = [
            <div className='add_generalTag'>
                    <div className='inline'>ID</div>
                    <h4 className='inline'> : </h4>
                    <input className='inline inputBox'></input>
            </div>    
        ]
        
        for (let tag in this.state.tags.tagNames) {
            console.warn("TAG:", tag);
            tags.push(<div className='add_generalTag'>
                <input onChange={(e) => this.updateTagName(tag, e.target.value)} className='inline'></input>
                <h4 className='inline'> : </h4>
                <input onChange={(e) => this.updateTagValue(tag, e.target.value)} className='inline'></input>
            </div>)
        }
        

        return (
            <div style={{width: '100%', height: 'calc(100% - 30px)' }}>
                <div className='tagContainer'>
                    {tags}
                    <Button onClick={this.addUserTag}>Add Tag</Button>
                    <div>Attach Sensor:</div>
                    <SearchFilter></SearchFilter>
                </div>
            </div>
        )
    }
}