import React from "react";
import ReactDOM from "react-dom";
import AddIcon from '@material-ui/icons/Add';
import "./File.css";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
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
            shareholders: [{ name: "", isA: false, isTaskPar: false, and: "text" }]
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
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    };

    handleAddShareholder = () => {

        this.setState({
            shareholders: this.state.shareholders.concat([{ name: "", isA: false }])
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
    onSelectChange = event => {
        console.log("onSelectChange");
    };

    render() {
        const isClicked  = this.state.isClicked ;
        console.log(this.state.shareholders)
        // console.log(isClicked)
        return (
            <form onSubmit={this.handleSubmit}>

                <h4>Configuration Form</h4>
                <div>
                    <div className="rows">
                    <div className="mainLab">
                    <h2>Labels of pull request</h2>
                <Tooltip title="Add" aria-label="add" onClick={this.handleAddShareholder}>
                    <Fab color="primary" >
                        <AddIcon/>
                    </Fab>
                </Tooltip>
                    </div>
                    </div>
                    {!isClicked && (
                        <div>
                {this.state.shareholders.map((shareholder, idx) => (
                    <div className="shareholder">
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
                            <Dropdown.Item onClick={this.handleSelectUs(idx)} href="#/action-1">US</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTask(idx)} href="#/action-2">DE</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">TA</Dropdown.Item>
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
                <button>Submit</button>
            </form>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IncorporationForm />, rootElement);

