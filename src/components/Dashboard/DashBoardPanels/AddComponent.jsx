import React from 'react';
import { Button } from 'react-bootstrap';

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
        this.props.setTitle('Add New Bearing')
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

    updateTagName(e) {
        console.warn("updateTagName(E): ", e);
    }

    updateTagValue(e) {
        console.warn("updateTagValue(E): ", e);
    }

    render() {

        let tags = [
            <div className='add_idTag'>
                    <h4 className='inline'>ID</h4>
                    <h4 className='inline'> : </h4>
                    <input className='inline inputBox'></input>
            </div>    
        ]
        
        for (let tag in this.state.tags.tagNames) {
            console.warn("TAG:", tag);
            tags.push(<div className='add_generalTag'>
                <input className='inline'></input>
                <h4 className='inline'> : </h4>
                <input className='inline'></input>
            </div>)
        }
        

        return (
            <div style={{width: '100%', height: 'calc(100% - 30px)' }}>
                {tags}
                <Button onClick={this.addUserTag}>Add Tag</Button>

                <h4>Attach Sensor</h4>
            </div>
        )
    }
}