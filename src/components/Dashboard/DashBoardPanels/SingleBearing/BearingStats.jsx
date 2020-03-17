import React from 'react';
import axios from 'axios';
import TagRow from '../TagRow.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Tools/Button.jsx';

export default class BearingStats extends React.Component {
    constructor (props) {
        super(props);
      
        this.state = {
            settings: {},
            tags: {
                tagIdx: [],
                tagNames: {},
                tagValues: {}
            },
        }

        this.sendRequest = this.sendRequest.bind(this);   
        this.updateSettings = this.updateSettings.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateTagName = this.updateTagName.bind(this);
        this.updateTagValue = this.updateTagValue.bind(this);
        this.removeUserTag = this.removeUserTag.bind(this);
    }

    componentDidMount() {
        this.sendRequest('https://sensor.vibraneur.com/inventory/v1/bearing?id=' + this.props.id, this.updateSettings)
    }

    updateSettings (data) {        
        let settings = data.tags;
        let tagIdx = [];
        let tagNames = {};
        let tagValues = {};

        let idx = 0;
        for (let tag in settings) {
            console.warn("TAG: ", tag);
            tagIdx.push(idx);
            tagNames[idx] = tag;
            tagValues[idx] = settings[tag];
            idx = idx + 1;
        }

        console.warn("TAG NAMES: ", tagNames);
        console.warn("TAG VALUES: ", tagValues);
        
        this.setState({
            settings: settings,
            tags: {
                tagIdx: tagIdx,
                tagNames: tagNames,
                tagValues: tagValues,
            }
        })

    }

    sendRequest(url, callback) {
        axios.get(url).then(function (response) {
            // Check to make sure the data has actually been returned
            console.warn("RESPONSE: ", response);
            if (response.data !== undefined) {
                let data = response.data;
                
                if (data === undefined) {
                    console.warn("Empty Response");
                    return;
                } else {
                    callback(data);
                }
            }
        }).catch(function (error) {
            // handle error
            console.warn("Error: ", error);
        })
    }

    toggleEdit () {
        console.warn("Editting: ", this.state.editting);
        this.setState({
            editting: !this.state.editting
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
        console.warn("updateTagName");
        console.warn("IDX: ", idx);
        console.warn("NAME: ", name);
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
        console.warn("updateTagValue");
        console.warn("IDX: ", idx);
        console.warn("VALUE: ", value);
        let tags = this.state.tags;
        tags.tagValues[idx] = value;
        
        this.setState({
            tags: tags
        })
    }
    
    render () {
      
        let settings = this.state.tags;
        let tags = [];

        let editButton = <Button
            colours={this.props.colours}
            onClick={this.toggleEdit}
            contents={<FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>}
        ></Button>

        if (settings !== undefined) {
            for (let idx in settings.tagIdx) {
                console.warn("IDX: ", idx);
                let key = settings.tagNames[idx];
                let value = settings.tagValues[idx];
                console.warn("KEY: ", key);
                console.warn("VALUE: ", value);

                tags.push(<TagRow
                    id={idx}
                    key={idx}
                    updateTagName={this.updateTagName}
                    updateTagValue={this.updateTagValue}
                    removeUserTag={this.removeUserTag}
                    tag={key}
                    value={value}
                    editting={this.state.editting}
                ></TagRow>)
            }
        }
        
        return (
            <div>
                {editButton}
                {tags}
            </div>
        )
    }
}