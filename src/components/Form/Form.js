import React from "react";
import ReactDOM from "react-dom";
import AddIcon from '@material-ui/icons/Add';
import "./File.css";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import update from 'react-addons-update';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Par = () => {
    return (
        <div class="flexbox-container">
            <p id="textP" >to </p>
            <TextField id="standard-basic" label="State" />
            <p >state</p>
        </div>
    )
}

const ParTask = () => {
    return (
        <div class="flexbox-container">
            <p id="textP" >with </p>
            <TextField id="standard-basic" label="State" />
            <p >state</p>
        </div>
    )
}
export class IncorporationForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            isAndrea: false,
            name: "",
            message: [],
            isClicked: false,
            shareholders: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersMergedPr: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersOpenPr: [{ name: "", isA: false, isTaskPar: false, and: "text" }],
            shareholdersCommits: [{ name: "", isA: false, isTaskPar: false, and: "text" }]
        };

    }


    handleShareholderNameChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });

        this.setState({ shareholders: newShareholders });
    };

    handleSubmit = evt => {
        const { name, shareholders } = this.state;
        const { handleAddShareholderForMergePr } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    };

    handleAddShareholder = () => {

        this.setState({
            shareholders: this.state.shareholders.concat([{ name: "", isA: false }])
        });

        console.log(this.state.isClicked)

    };

    handleAddShareholderForMergePr = () => {

        this.setState({
            handleAddShareholderForMergePr: this.state.shareholders.concat([{ name: "", isA: false }])
        });

        console.log(this.state.isClicked)

    };

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
        return (
            <form onSubmit={this.handleSubmit}>

                <h4>Configuration Form</h4>
                <div>
                    <div className="rows">
                    <div className="mainLab">
                    <h2>Labels of pull request</h2>
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
                        <TextField id="standard-basic" label="PR"
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
                        <DropdownButton id="dropdown-basic-button" title="Item">
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
                        <DropdownButton id="dropdown-basic-button" title="Item">
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
                <div className="rows">
                    <div className="mainLab">
                        <h2>Open pull requests</h2>
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
                        <DropdownButton id="dropdown-basic-button" title="Item">
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
                <div className="rows">
                    <div className="mainLab">
                        <h2>Commits</h2>
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
                        <DropdownButton id="dropdown-basic-button" title="Item">
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
                <div className="rows">
                    <div className="mainLab">
                        <h2>New Issue</h2>
                        {/*<Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholderForMergePr}>*/}
                        {/*    <Fab color="primary" >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </Fab>*/}
                        {/*</Tooltip>*/}
                    </div>
                </div>
                {this.state.shareholdersCommits.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Create a new defect only if the issue contains this label </p>
                        <TextField id="standard-basic" label="Defect Tag"
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <div className="uslabel"></div>
                        {/*    <Select onChange={this.handleSelectUs(idx)} labelId="label" id="simpleMenu" value="20">*/}
                        {/*    <MenuItem key="{1}" onClick={this.handleSelectUs(idx)} value="10" >US</MenuItem>*/}
                        {/*        <ListItemText onClick={this.handleSelectUs(idx)}></ListItemText>*/}
                        {/*    <MenuItem key="{2}" value="10">DE</MenuItem>*/}
                        {/*    <MenuItem key="{3}" value="10">TA</MenuItem>*/}
                        {/*</Select>*/}
                        <DropdownButton id="dropdown-basic-button" title="Item">
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
                <div className="rows">
                    <div className="mainLab">
                        <h2>Ready</h2>
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
                        <TextField id="standard-basic" label="Task name "
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

