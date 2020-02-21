import React from "react";
import ReactDOM from "react-dom";
import "./File.css";
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import update from 'react-addons-update';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';

const Par1 = (props) => {
    console.log(props.onChange)
    return (
        <div class="flexbox-container">
            <p id="textP" >to </p>
            <TextField onChange={props.onChange} name="state" id="standard-basic" label="State" />
        </div>
    )
}

const Par2 = (props) => {
    return (
        <div class="flexbox-container">
            <p id="textP" >with  </p>
            <TextField onChange={props.func} name="taskName" id="standard-basic" label="Name" />
            <p > to </p>
            <TextField onChange={props.func} name="state" id="standard-basic" label="State" />
        </div>
    )
}

export class IncorporationForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            rule: "",
            labels: "",
            items: "",
            status: "",
            api_key: "",
            rally_host: "",
            workspace: "",
            project: "",
            github_base_url: "",
            repository: "",
            usId: "",
            taskName: "",
            name: "",
            message: [],
            isClicked: false,
            DropdownButtonLPRTitle: "Item",
            DropdownButtonMergeTitle: "Item",
            DropdownButtonOPRTitle: "Item",
            DropdownButtonCommitsTitle: "Item",
            rulesLabelsPullRequest: [],
            rulesMergedPullRequest: [],
            rulesOpenPullRequest: [],
            rulesCommits: [],
            rulesNewIssues: [],
            rulesReady: [],
            textedLabelsPullRequestRules: [],
            textedMergedPullRequestRules: [],
            textedOpenPullRequestRules: [],
            textedCommitsRules: [],
            textedNewIssuesRules: [],
            textedReadyRules: [],
            shareholders: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, and: "text" }],
            shareholdersMergedPr: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, and: "text" }],
            shareholdersOpenPr: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, and: "text" }],
            shareholdersCommits: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, and: "text" }],
            shareholdersNewIssues: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, and: "text" }]
        };

    }




    submitForm = async e => {
        e.preventDefault();
        // this.setState({isSubmitting: true});
        const res = await fetch("http://localhost:8080/submit", {
            method: "POST",
            body: JSON.stringify({
                "github": {
                    "api_key": this.state.api_key,
                    "github_base_url": this.state.github_base_url,
                    "repository": this.state.repository,
                },
                "rally": {
                    "api_key": this.state.api_key,
                    "rally_host": this.state.rally_host,
                    "workspace": this.state.workspace,
                    "project": this.state.project
                },
                "rules": {
                    "commit": [
                        {"item": this.state.items, "action": this.state.status},
                    ],
                    "open-pull-request": [
                        {"item": this.state.items, "action": this.state.status},
                    ],
                    "merged-pull-request": [
                        {"item": this.state.items, "action": this.state.status},
                    ],
                    "labels": [
                        {"labelName": this.state.status, "item": this.name, "action": this.state.status},
                    ],
                    "ready": [
                        {
                            "story-state": this.state.status, "conditions": [
                                {"item": this.state.name, "state": this.state.status}
                            ]
                        }],
                    "new-issue": []
                }
                }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(res)
    }

    handleStatusChange = (event) => {
        let name = event.target.name;
        if (name === "state")
            name = "status";
        console.log(name)
        this.setState({[name]: event.target.value});

    }


    handleRemoveShareholder = idx => () => {
        this.setState({
            shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });

    };

     handleSelectUs = idx => () => {
         this.setState({items: "US/DE"});

         this.setState({
        shareholders: update(this.state.shareholders, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}} })

         });

         this.setState({DropdownButtonLPRTitle: "US/DE"});
         console.log(this.state.shareholders[idx].isSelectedPar1);
         console.log(this.state.shareholders[idx].isSelectedPar2);

    }

    handleSelectTask = idx => () => {
        this.setState({items: "TA"});

        this.setState({
            shareholders: update(this.state.shareholders, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}} })

        });
        this.setState({DropdownButtonLPRTitle: "TA"});
         console.log(this.state.shareholders[idx].isSelectedPar1);
         console.log(this.state.shareholders[idx].isSelectedPar2);

    }

    handleSelectUsForMergedPr = idx => () => {
        this.setState({items: "US/DE"});
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}}})

        });
        this.setState({DropdownButtonMergeTitle: "US/DE"});
    }

    handleSelectTaskForMergedPr = idx => () => {
        this.setState({items: "TA"});
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}}})

        });
        this.setState({DropdownButtonMergeTitle: "TA"});
    }

    handleSelectUsForOpenPr = idx => () => {
        this.setState({items: "US/DE"});
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}}})

        });
        this.setState({DropdownButtonOPRTitle: "US/DE"});
     }

    handleSelectTaskForOpenPr = idx => () => {
        this.setState({items: "TA"});
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}}})

        });
        this.setState({DropdownButtonOPRTitle: "TA"});
    }
    handleSelectUsForCommits = idx => () => {
        this.setState({items: "US/DE"});
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}}})

        });
        this.setState({DropdownButtonCommitsTitle: "US/DE"});
    }


    handleSelectTaskForCommits = idx => () => {
        this.setState({items: "TA"});
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}}})

        });
        this.setState({DropdownButtonCommitsTitle: "TA"});
    }
    onSelectChange = event => {
        console.log("onSelectChange");
    };

    addNewLabelPullRequestRule = idx => () => {
    if (this.state.DropdownButtonLPRTitle === "US/DE") {
        this.setState({
        rulesLabelsPullRequest: this.state.rulesLabelsPullRequest.concat({labelName: this.state.labels, item: "US/DE", action: this.state.status})});

        this.setState({
        textedLabelsPullRequestRules: this.state.textedLabelsPullRequestRules.concat("When a label '" + this.state.labels + "' exists in a pull request, then move the US/DE to '" + this.state.status + "'")});
        }
    else if (this.state.DropdownButtonLPRTitle === "TA"){
        this.setState({
        rulesLabelsPullRequest: this.state.rulesLabelsPullRequest.concat({labelName: this.state.labels, item: "TA-" + this.state.taskName, action: this.state.status})});

        this.setState({
        textedLabelsPullRequestRules: this.state.textedLabelsPullRequestRules.concat("When a label '" + this.state.labels + "' exists in a pull request, then move the TA with '" + this.state.taskName + "' to '" + this.state.status + "'")});
    }
    }

    addNewMergedPullRequestRule = idx => () => {
        if (this.state.DropdownButtonMergeTitle === "US/DE") {
            this.setState({
            rulesMergedPullRequest: this.state.rulesMergedPullRequest.concat({item: "US/DE", action: this.state.status})});

            this.setState({
            textedMergedPullRequestRules: this.state.textedMergedPullRequestRules.concat("When a pull request is merged, move the US/DE to '" + this.state.status + "'")});
            }
        else if (this.state.DropdownButtonMergeTitle === "TA"){
            this.setState({
            rulesMergedPullRequest: this.state.rulesMergedPullRequest.concat({item: "TA-" + this.state.taskName, action: this.state.status})});

            this.setState({
            textedMergedPullRequestRules: this.state.textedMergedPullRequestRules.concat("When a pull request is merged, move the TA with '" + this.state.taskName + "' to '" + this.state.status + "'")});
        }
        }

    addNewOpenPullRequestRule = idx => () => {
        if (this.state.DropdownButtonOPRTitle === "US/DE") {
            this.setState({
            rulesOpenPullRequest: this.state.rulesOpenPullRequest.concat({item: "US/DE", action: this.state.status})});

            this.setState({
            textedOpenPullRequestRules: this.state.textedOpenPullRequestRules.concat("When a pull request is opened, move the US/DE to '" + this.state.status + "'")});
            }
        else if (this.state.DropdownButtonOPRTitle === "TA"){
            this.setState({
            rulesOpenPullRequest: this.state.rulesOpenPullRequest.concat({item: "TA-" + this.state.taskName, action: this.state.status})});

            this.setState({
            textedOpenPullRequestRules: this.state.textedOpenPullRequestRules.concat("When a pull request is opened, move the TA with '" + this.state.taskName + "' to '" + this.state.status + "'")});
        }
        }

    addNewCommitsRule = idx => () => {
        if (this.state.DropdownButtonCommitsTitle === "US/DE") {
            this.setState({
            rulesCommits: this.state.rulesCommits.concat({label: this.state.defect})});

            this.setState({
            textedCommitsRules: this.state.textedCommitsRules.concat("When a commit is happening, move the US/DE to '" + this.state.defect + "'")});
        }
        else if (this.state.DropdownButtonCommitsTitle === "TA"){
            this.setState({
            rulesCommits: this.state.rulesCommits.concat({item: "TA-" + this.state.taskName, action: this.state.status})});

            this.setState({
            textedCommitsRules: this.state.textedCommitsRules.concat("When a commit is happening, move the TA with '" + this.state.taskName + "' to '" + this.state.status + "'")});
        }
        }

    addNewIssueRule = idx => () => {
            this.setState({
            rulesNewIssues: this.state.rulesNewIssues.concat({story_status: this.state.usId, item: this.state.taskName, state: this.state.status})});

            this.setState({
            textedNewIssuesRules: this.state.textedNewIssuesRules.concat("Create a new defect, only if the issue contains this label '" + this.state.defect + "'")});
        }

    addNewReadyRule = idx => () => {
            this.setState({
            rulesReady: this.state.rulesReady.concat({story_status: this.state.usId, item: this.state.taskName, state: this.state.status})});

            this.setState({
            textedReadyRules: this.state.textedReadyRules.concat("When the story state of US is in state '" + this.state.usId + "' and the task with name '" + this.state.taskName  + "' is in state '" + this.state.status + "' then mark it as ready.")});
        }

    render() {
        const isClicked  = this.state.isClicked;
        console.log(this.state);
        console.log(this.state.rulesLabelsPullRequest);

        return (
            <form onSubmit={this.submitForm}>

                <h1>Rules Definition Form</h1>
                <div>
                    <div className="initial-configuration-information">
                        <h2>Initial configuration information</h2>
                        <h4>GitHub</h4>
                        <p>API key:  <TextField name="apiKey" onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>GitHub base URL:  <TextField name="github_base_url" onChange={this.handleStatusChange} id="standard-basic" label="GitHub base URL"/></p>
                        <p>Repository:  <TextField name="repository" onChange={this.handleStatusChange} id="standard-basic" label="Repository"/></p>
                        <br />
                        <br />
                        <h4>Rally</h4>
                        <p>API key:  <TextField name="apiKey" onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>Rally host:  <TextField name="rally_host" onChange={this.handleStatusChange} id="standard-basic" label="Rally host"/></p>
                        <p>Workspace:  <TextField name="workspace" onChange={this.handleStatusChange} id="standard-basic" label="Workspace"/></p>
                        <p>Project:  <TextField name="project" onChange={this.handleStatusChange} id="standard-basic" label="Project"/></p>
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
                    </div>
                    </div>
                    {!isClicked && (
                        <div>
                {this.state.shareholders.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>When a label </p>
                        <TextField name="labels" id="standard-basic" label="Label name"
                                   onChange={this.handleStatusChange}
                        />
                        <p>exists in a pull request, then move the</p>
                        <div className="uslabel"></div>
                        <DropdownButton name="items" id="dropdown-basic-button" title={this.state.DropdownButtonLPRTitle}>
                            <Dropdown.Item name="items" onClick={this.handleSelectUs(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item name="items" onClick={this.handleSelectTask(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 onChange={this.handleStatusChange} />
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 &&(
                            <Par2 onChange={this.handleStatusChange} />
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewLabelPullRequestRule(idx)}> + </Button>
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
                    </div>
                </div>
                {this.state.shareholdersMergedPr.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        <DropdownButton name="items" id="dropdown-basic-button" title={this.state.DropdownButtonMergeTitle}>
                            <Dropdown.Item  onClick={this.handleSelectUsForMergedPr(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item  onClick={this.handleSelectTaskForMergedPr(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 onChange={this.handleStatusChange}/>
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={this.handleStatusChange}/>
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewMergedPullRequestRule(idx)}> + </Button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="openPR">Open pull requests</h2>
                    </div>
                </div>
                {this.state.shareholdersOpenPr.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        <DropdownButton name="items" id="dropdown-basic-button" title={this.state.DropdownButtonOPRTitle}>
                            <Dropdown.Item  onClick={this.handleSelectUsForOpenPr(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item  onClick={this.handleSelectTaskForOpenPr(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 onChange={this.handleStatusChange}/>
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={this.handleStatusChange} />
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewOpenPullRequestRule(idx)}> + </Button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="commits">Commits</h2>
                    </div>
                </div>
                {this.state.shareholdersCommits.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Move the </p>
                        <div className="uslabel"></div>
                        <DropdownButton name="items" id="dropdown-basic-button" title={this.state.DropdownButtonCommitsTitle}>
                            <Dropdown.Item onClick={this.handleSelectUsForCommits(idx)} href="#/action-1">US/DE</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSelectTaskForCommits(idx)} href="#/action-2">TA</Dropdown.Item>
                        </DropdownButton>
                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 func={this.handleStatusChange} />
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 func={this.handleStatusChange} />
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewCommitsRule(idx)}> + </Button>
                    </div>
                ))}
                <br/>
                <br/>
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="issues">New Issue</h2>
                    </div>
                </div>
                {this.state.shareholdersNewIssues.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Create a new defect only if the issue contains this label </p>
                        <TextField id="standard-basic" label="Defect Tag"
                            onChange={this.handleStatusChange}
                        />

                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 func={this.handleStatusChange}/>
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 func={this.handleStatusChange}/>
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewIssueRule(idx)}> + </Button>
                    </div>
                ))}
                <div className="rows">
                    <div className="mainLab">
                        <h2 name="ready">Ready</h2>
                    </div>
                </div>
                {this.state.shareholdersCommits.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>When the story state of US is </p>
                        <TextField name="usId" onChange={this.handleStatusChange} id="standard-basic" label="US ID"
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> and the task with name </p>
                        <TextField name="taskName" onChange={this.handleStatusChange} id="standard-basic" label="Task name "
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> is in state </p>
                        <TextField name="state"  onChange={this.handleStatusChange} id="standard-basic" label="Task state "
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> then mark it as ready. </p>
                        {shareholder.isSelectedPar1 && !shareholder.isSelectedPar2 && (
                            <Par1 onChange={this.handleStatusChange} />
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={this.handleStatusChange} />
                        )}
                        <p>&nbsp;&nbsp;</p>
                        <Button style={{width: 50}} onClick={this.addNewReadyRule(idx)}> + </Button>
                    </div>
                ))}
                <button>Submit</button>
            </form>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IncorporationForm />, rootElement);

