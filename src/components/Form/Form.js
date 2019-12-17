import React from "react";
import ReactDOM from "react-dom";
import "./File.css";
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import update from 'react-addons-update';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const Par = () => {
    return (
        <div class="flexbox-container">
            <p id="textP" >to </p>
            <TextField onChange={this.handleStatusChange} name="state" id="standard-basic" label="State" />
        </div>
    )
}

const ParTask = () => {
    return (
        <div class="flexbox-container">
            <p id="textP" >with  </p>
            <TextField onChange={this.handleStatusChange} name="taskName" id="standard-basic" label="Name" />
            <p > to </p>
            <TextField onChange={this.handleStatusChange} name="state" id="standard-basic" label="State" />
        </div>
    )
}
export class IncorporationForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            values: {
                rules:
                    {
                        rule: "", labels: "", items: "", state: "", usId: "", taskName: "",
                    },
            },
            name: "",
            message: [],
            isClicked: false,
            shareholders: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersMergedPr: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersOpenPr: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersCommits: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersNewIssues: [{ name: "", isA: false, isTaskPar: false, and: "text" }]
        };

    }


function() {
        function toJSONString( form ) {
            var obj = {};
            var elements = form.querySelectorAll( "input, select, textarea" );
            for( var i = 0; i < elements.length; ++i ) {
                var element = elements[i];
                var name = element.name;
                var value = element.value;

                if( name ) {
                    obj[ name ] = value;
                }
            }

            return JSON.stringify( obj );
        }

        document.addEventListener( "DOMContentLoaded", function() {
            var form = document.getElementById( "test" );
            var output = document.getElementById( "output" );
            form.addEventListener( "submit", function( e ) {
                e.preventDefault();
                var json = toJSONString( this );
                output.innerHTML = json;

            }, false);

        });

    };

    submitForm = async e => {
        // e.preventDefault();
        // this.setState({isSubmitting: true});
        // const res = await fetch("http://localhost:8080/submit", {
        //     method: "POST",
        //     body: JSON.stringify(this.state.values),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        // this.setState({isSubmitting: false});
        // const data = await res.json();
        // console.log(data)
        // !data.hasOwnProperty("error")
        //     ? this.setState({message: data.success})
        //     : this.setState({message: data.error, isError: true});
        e.preventDefault();

        const data = new FormData(e.target);

        fetch('http://localhost:8080/submit', {
            method: 'POST',
            body: data,
        });

        console.log(data)
    }
/////

    handleStatusChange(event) {
        console.log(event.target.value)
    // //  if(event.target.name == 'taskName')
    // // this.setState({taskName: event.target.value});
    // // else if (event.target.name == 'state')
    // // this.setState({state: event.target.value});
    // //  else if (event.target.name == 'item')
    //      this.setState({item: event.target.value});

         }

    handleRemoveShareholder = idx => () => {
        this.setState({
            shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });

    };

     handleSelectUs = idx => () => {
        console.log("ciao")

         this.setState({
        shareholders: update(this.state.shareholders, {[idx]: {isA: {$set: true}}})

         });

    }

    handleSelectUsForMergedPr = idx => () => {

        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isA: {$set: true}}})

        });

    }

    handleSelectUsForOpenPr = idx => () => {

        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isA: {$set: true}}})

        });

    }
    handleSelectUsForCommits = idx => () => {

        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isA: {$set: true}}})

        });

    }

    handleSelectTask = idx => () => {
        console.log("ciao")
        // if (this.state.shareholders.isA) {
        //     this.setState({
        //         shareholders: update(this.state.shareholders, {[idx]: {isA: {$set: false}}})
        //
        //     });
        // }
        this.setState({
            shareholders: update(this.state.shareholders, {[idx]: {isTaskPar: {$set: true}}})

        });

    }

    handleSelectTaskForMergedPr = idx => () => {
        console.log("ciao")
        // if (this.state.shareholders.isA) {
        //     this.setState({
        //         shareholders: update(this.state.shareholders, {[idx]: {isA: {$set: false}}})
        //
        //     });
        // }
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isTaskPar: {$set: true}}})

        });

    }

    handleSelectTaskForOpenPr = idx => () => {
        console.log("ciao")
        // if (this.state.shareholders.isA) {
        //     this.setState({
        //         shareholders: update(this.state.shareholders, {[idx]: {isA: {$set: false}}})
        //
        //     });
        // }
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isTaskPar: {$set: true}}})

        });

    }

    handleSelectTaskForCommits = idx => () => {
        console.log("ciao")
        // if (this.state.shareholders.isA) {
        //     this.setState({
        //         shareholders: update(this.state.shareholders, {[idx]: {isA: {$set: false}}})
        //
        //     });
        // }
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isTaskPar: {$set: true}}})

        });

    }
    onSelectChange = event => {
        console.log("onSelectChange");
    };

    render() {
        const isClicked  = this.state.isClicked ;
        console.log(this.state.shareholders)

        // const json = {};
        // Array.from(formData.entries()).forEach(([key, value]) => {
        //     json[key] = value;
        // })

        // JSON.stringify(json)

        return (
            <form onSubmit={this.submitForm}>

                <h1>Rules Definition Form</h1>
                <div>
                    <div className="initial-configuration-information">
                        <h2>Initial configuration information</h2>
                        <h4>GitHub</h4>
                        <p>API key:  <TextField id="standard-basic" label="API key"/></p>
                        <p>GitHub base URL:  <TextField id="standard-basic" label="GitHub base URL"/></p>
                        <p>Repository:  <TextField id="standard-basic" label="Repository"/></p>
                        <br />
                        <br />
                        <h4>Rally</h4>
                        <p>API key:  <TextField id="standard-basic" label="API key"/></p>
                        <p>Rally host:  <TextField id="standard-basic" label="Rally host"/></p>
                        <p>Workspace:  <TextField id="standard-basic" label="Workspace"/></p>
                        <p>Project:  <TextField id="standard-basic" label="Project"/></p>
                        <br />
                        <br />
                        <h4>Initial Timestamp</h4>
                        <Form.Control
                        type="date"
                        />
                    </div>
                    <br />
                    <br />
                    <div className="rows">
                    <div className="mainLab">
                    <h2 name="labels">Labels of pull request</h2>
                {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholder}>*/}
                {/*    <Fab color="primary" >*/}
                {/*        <AddIcon/>*/}
                {/*    </Fab>*/}
                {/*</Tooltip>*/}
                    </div>
                    </div>
                    {!isClicked && (
                        <div>
                {this.state.shareholders.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>When a label </p>
                        <TextField name="labelName" id="standard-basic" label="PR"
                                   // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p>exists in a pull request, then move the</p>
                        <div className="uslabel"></div>
                    {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                    {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                    {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                    {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                    {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                    {/*</Select>*/}
                        <DropdownButton onChange={this.handleStatusChange} name="item" id="dropdown-basic-button" title="Item">
                            <Dropdown.Item onClick={this.handleSelectUs(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTask(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}

                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                 ))}
                            <br/>
                            <br/>
                        </div>
                    )}

                <div>
                    {this.state.message}
                </div>
                </div>
                <div className="rows">
                    <div className="mainLab">
                        <h2>Merged pull requests</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersMergedPr.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                        {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                        {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                        {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                        {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                        {/*</Select>*/}
                        <DropdownButton name="item" id="dropdown-basic-button" title="Item">
                            <Dropdown.Item onClick={this.handleSelectUsForMergedPr(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTaskForMergedPr(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}

                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="openPR">Open pull requests</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersOpenPr.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                        {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                        {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                        {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                        {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                        {/*</Select>*/}
                        <DropdownButton name="item" id="dropdown-basic-button" title="Item">
                            <Dropdown.Item onClick={this.handleSelectUsForOpenPr(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTaskForOpenPr(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}



                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="commits">Commits</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersCommits.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                        {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                        {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                        {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                        {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                        {/*</Select>*/}
                        <DropdownButton name="item" id="dropdown-basic-button" title="Item">
                            <Dropdown.Item onClick={this.handleSelectUsForCommits(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTaskForCommits(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}

                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="issues">New Issue</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersNewIssues.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Create a new defect only if the issue contains this label </p>
                        <TextField id="standard-basic" label="Defect Tag"
                            // onChange={this.handleShareholderNameChange(idx)}
                        />

                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}



                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="ready">Ready</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersCommits.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>When the story state of US is </p>
                        <TextField id="standard-basic" label="US ID"
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> and the task with name </p>
                        <TextField onChange={this.handleStatusChange} id="standard-basic" label="Task name "
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> is in state </p>
                        <TextField id="standard-basic" label="Task state "
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> then mark it as ready. </p>
                        {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                        {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                        {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                        {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                        {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                        {/*</Select>*/}
                        {shareholder.isA && !shareholder.isTaskPar && (
                            <Par />
                        )}
                        {shareholder.isTaskPar && !shareholder.isA && (
                            <ParTask />
                        )}



                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(0)}
                            className="small"
                        >
                            -
                        </button>
                    </div>
                ))}
                <button>Submit</button>
            </form>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IncorporationForm />, rootElement);

