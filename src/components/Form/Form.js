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
            <TextField onChange={props.onChange} name="taskName" id="standard-basic" label="Name" />
            <p > to </p>
            <TextField onChange={props.onChange} name="state" id="standard-basic" label="State" />
        </div>
    )
}

export class IncorporationForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            additionalCode: "",
            rule: "",
            labels: "",
            status: "",
            apiKeyGit: "",
            apiKeyRally: "",
            rally_host: "",
            workspace: "",
            project: "",
            github_base_url: "",
            repository: "",
            usId: "",
            labelName: "",
            defectTag: "",
            name: "",
            message: [],
            isClicked: false,
            initialTimestamp: "",
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
            shareholders: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }],
            shareholdersMergedPr: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }],
            shareholdersOpenPr: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }],
            shareholdersCommits: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }],
            shareholdersNewIssues: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }],
            shareholdersReady: [{ name: "", isSelectedPar1: false, isSelectedPar2: false, items: "text" }]
        };

    }

    submitFormNew = async e => {
    e.preventDefault();
         var jsonObj = JSON.parse("{}");
         var jsonObjGithub = JSON.parse("{}");
         jsonObjGithub["api_key"] = this.state.apiKeyGit;
         jsonObjGithub["github_base_url"] = this.state.github_base_url;
         jsonObjGithub["repository"] = this.state.repository;
         jsonObj["github"] = jsonObjGithub;
         var jsonObjRally = JSON.parse("{}");
         jsonObjRally["api_key"] = this.state.apiKeyRally;
         jsonObjRally["rally_host"] = this.state.rally_host;
         jsonObjRally["workspace"] = this.state.workspace;
         jsonObjRally["project"] = this.state.project;
         jsonObj["rally"] = jsonObjRally;
         jsonObj["initialTimestamp"] = this.state.initialTimestamp;
         var jsonObjRules = JSON.parse("{}");
         jsonObjRules["commit"] = this.state.rulesCommits;
         jsonObjRules["open-pull-request"] = this.state.rulesOpenPullRequest;
         jsonObjRules["merged-pull-request"] = this.state.rulesMergedPullRequest;
         jsonObjRules["labels"] = this.state.rulesLabelsPullRequest;
         jsonObjRules["ready"] = this.state.rulesReady;
         jsonObjRules["new-issue"] = this.state.rulesNewIssues;
         jsonObj["rules"] = jsonObjRules;
         var jsonString = JSON.stringify(jsonObj);

         e.preventDefault();
                 // this.setState({isSubmitting: true});
         const res = await fetch("http://localhost:3000/submit", {
             method: "POST",
             body: JSON.stringify(jsonString),
             headers: {
                "Content-Type": "application/json"
             }
         });

         console.log(jsonString);
    }

    handleStatusChange = (event) => {
        let name = event.target.name;
        console.log(name)
        this.setState({[name]: event.target.value});
    }

    handleDate = (event) => {
        var modifiedDate = event.target.value + "T00:00:00Z";
        this.setState({initialTimestamp: modifiedDate});
    }

    handleDefectTag = (event) => {
        let name = event.target.name;
        console.log(name)
        this.setState({defectTag: event.target.value});
    }

    handleLabelName = (event) => {
        let name = event.target.name;
        console.log(name)
        this.setState({labelName: event.target.value});
    }

    handleStatusChangeLabels = (idx, event) => {
        let name = event.target.name;
        console.log(name)

        if (name === "state")
            name = "status";
        console.log(name)
        this.setState({
            shareholders: update(this.state.shareholders, {[idx]: {[name]: {$set: event.target.value} } })
        });
    }

    handleStatusChangeOpenPr = (idx, event) => {
        let name = event.target.name;
        if (name === "state")
            name = "status";
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {[name]: {$set: event.target.value} } })
        });
    }

    handleStatusChangeMergedPr = (idx, event) => {
        let name = event.target.name;
        if (name === "state")
            name = "status";
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {[name]: {$set: event.target.value} } })
        });
    }

    handleStatusChangeCommits = (idx, event) => {
        let name = event.target.name;
        if (name === "state")
            name = "status";
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {[name]: {$set: event.target.value} } })
        });
    }

    handleStatusChangeReady = (idx, event) => {
        let name = event.target.name;
        if (name === "state")
            name = "status";
        this.setState({
            shareholdersReady: update(this.state.shareholdersReady, {[idx]: {[name]: {$set: event.target.value} } })
        });
    }

     handleSelectUs = idx => () => {
         // this.setState({items: "US/DE"});

         this.setState({
        shareholders: update(this.state.shareholders, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}, items: {$set: "US/DE"}} })

         });

         this.setState({DropdownButtonLPRTitle: "US/DE"});
         console.log(this.state.shareholders[idx].isSelectedPar1);
         console.log(this.state.shareholders[idx].isSelectedPar2);

    }

    handleSelectTask = idx => () => {
        // this.setState({items: "TA"});

        this.setState({
            shareholders: update(this.state.shareholders, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}, items: {$set: "TA"}}})

        });
        this.setState({DropdownButtonLPRTitle: "TA"});
         console.log(this.state.shareholders[idx].isSelectedPar1);
         console.log(this.state.shareholders[idx].isSelectedPar2);

    }

    handleSelectUsForMergedPr = idx => () => {
//        this.setState({items: "US/DE"});
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}, items: {$set: "US/DE"}}})

        });
        this.setState({DropdownButtonMergeTitle: "US/DE"});
    }

    handleSelectTaskForMergedPr = idx => () => {
//        this.setState({items: "TA"});
        this.setState({
            shareholdersMergedPr: update(this.state.shareholdersMergedPr, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}, items: {$set: "TA"}}})

        });
        this.setState({DropdownButtonMergeTitle: "TA"});
    }

    handleSelectUsForOpenPr = idx => () => {
//        this.setState({items: "US/DE"});
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}, items: {$set: "US/DE"}}})

        });
        this.setState({DropdownButtonOPRTitle: "US/DE"});
     }

    handleSelectTaskForOpenPr = idx => () => {
//        this.setState({items: "TA"});
        this.setState({
            shareholdersOpenPr: update(this.state.shareholdersOpenPr, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}, items: {$set: "TA"}}})

        });
        this.setState({DropdownButtonOPRTitle: "TA"});
    }
    handleSelectUsForCommits = idx => () => {
//        this.setState({items: "US/DE"});
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isSelectedPar1: {$set: true}, isSelectedPar2:  {$set: false}, items: {$set: "US/DE"}}})

        });
        this.setState({DropdownButtonCommitsTitle: "US/DE"});
    }


    handleSelectTaskForCommits = idx => () => {
//        this.setState({items: "TA"});
        this.setState({
            shareholdersCommits: update(this.state.shareholdersCommits, {[idx]: {isSelectedPar1: {$set: false}, isSelectedPar2:  {$set: true}, items: {$set: "TA"}}})

        });
        this.setState({DropdownButtonCommitsTitle: "TA"});
    }

    handleSelectItemsforReady = (idx, event) => {
        this.setState({
            shareholdersReady: update(this.state.shareholdersReady, {[idx]: {items: {$set: event.target.value}}})
        });

    }

    onSelectChange = event => {
        console.log("onSelectChange");
    };

    addNewLabelPullRequestRule = idx => () => {
    if (this.state.DropdownButtonLPRTitle === "US/DE") {
        this.setState({
        rulesLabelsPullRequest: this.state.rulesLabelsPullRequest.concat({labelName: this.state.labels, item: "US/DE", action: this.state.shareholders[0].status})});

        this.setState({
        textedLabelsPullRequestRules: this.state.textedLabelsPullRequestRules.concat("When a label '" + this.state.labels + "' exists in a pull request, then move the US/DE to '" + this.state.shareholders[0].status + "'")});
        }
    else if (this.state.DropdownButtonLPRTitle === "TA"){
        this.setState({
        rulesLabelsPullRequest: this.state.rulesLabelsPullRequest.concat({labelName: this.state.labels, item: "TA-" + this.state.shareholders[0].taskName, action: this.state.shareholders[0].status})});

        this.setState({
        textedLabelsPullRequestRules: this.state.textedLabelsPullRequestRules.concat("When a label '" + this.state.labels + "' exists in a pull request, then move the TA with '" + this.state.shareholders[0].taskName + "' to '" + this.state.shareholders[0].status + "'")});
    }
    }

    addNewMergedPullRequestRule = idx => () => {
        if (this.state.DropdownButtonMergeTitle === "US/DE") {
            this.setState({
            rulesMergedPullRequest: this.state.rulesMergedPullRequest.concat({item: "US/DE", action: this.state.shareholdersMergedPr[0].status})});

            this.setState({
            textedMergedPullRequestRules: this.state.textedMergedPullRequestRules.concat("When a pull request is merged, move the US/DE to '" + this.state.shareholdersMergedPr[0].status + "'")});
            }
        else if (this.state.DropdownButtonMergeTitle === "TA"){
            this.setState({
            rulesMergedPullRequest: this.state.rulesMergedPullRequest.concat({item: "TA-" + this.state.shareholdersMergedPr[0].taskName, action: this.state.shareholdersMergedPr[0].status})});

            this.setState({
            textedMergedPullRequestRules: this.state.textedMergedPullRequestRules.concat("When a pull request is merged, move the TA with '" + this.state.shareholdersMergedPr[0].taskName + "' to '" + this.state.shareholdersMergedPr[0].status + "'")});
        }
        }

    addNewOpenPullRequestRule = idx => () => {
        if (this.state.DropdownButtonOPRTitle === "US/DE") {
            this.setState({
            rulesOpenPullRequest: this.state.rulesOpenPullRequest.concat({item: "US/DE", action: this.state.shareholdersOpenPr[0].status})});

            this.setState({
            textedOpenPullRequestRules: this.state.textedOpenPullRequestRules.concat("When a pull request is opened, move the US/DE to '" + this.state.shareholdersOpenPr[0].status + "'")});
            }
        else if (this.state.DropdownButtonOPRTitle === "TA"){
            this.setState({
            rulesOpenPullRequest: this.state.rulesOpenPullRequest.concat({item: "TA-" + this.state.shareholdersOpenPr[0].taskName, action: this.state.shareholdersOpenPr[0].status})});

            this.setState({
            textedOpenPullRequestRules: this.state.textedOpenPullRequestRules.concat("When a pull request is opened, move the TA with '" + this.state.shareholdersOpenPr[0].taskName + "' to '" + this.state.shareholdersOpenPr[0].status + "'")});
        }
        }

    addNewCommitsRule = idx => () => {
        if (this.state.DropdownButtonCommitsTitle === "US/DE") {
            this.setState({
            rulesCommits: this.state.rulesCommits.concat({item: "US/DE", action: this.state.shareholdersCommits[0].status})});

            this.setState({
            textedCommitsRules: this.state.textedCommitsRules.concat("When a commit is happening, move the US/DE to '" + this.state.shareholdersCommits[0].status + "'")});
        }
        else if (this.state.DropdownButtonCommitsTitle === "TA"){
            this.setState({
            rulesCommits: this.state.rulesCommits.concat({item: "TA-" + this.state.shareholdersCommits[0].taskName, action: this.state.shareholdersCommits[0].status})});

            this.setState({
            textedCommitsRules: this.state.textedCommitsRules.concat("When a commit is happening, move the TA with '" + this.state.shareholdersCommits[0].taskName + "' to '" + this.state.shareholdersCommits[0].status + "'")});
        }
        }

    addNewIssueRule = idx => () => {
            this.setState({
            rulesNewIssues: this.state.rulesNewIssues.concat({required_label: this.state.defectTag})});

            this.setState({
            textedNewIssuesRules: this.state.textedNewIssuesRules.concat("Create a new defect, only if the issue contains this label '" + this.state.defectTag + "'")});
        }


    addNewReadyRule = idx => () => {
            this.setState({
            rulesReady: this.state.rulesReady.concat({story_state: this.state.usId, item: this.state.shareholdersReady[0].items, state: this.state.shareholdersReady[0].status})});

            this.setState({
            textedReadyRules: this.state.textedReadyRules.concat("When the story state of US is in state '" + this.state.usId + "' and the task with name '" + this.state.shareholdersReady[0].items  + "' is in state '" + this.state.shareholdersReady[0].status + "' then mark it as ready.")});
        }

    newLPRTable(idx) {
        let table = []
        if (this.state.textedLabelsPullRequestRules.length > 0) {
            for (let i = 0; i < this.state.textedLabelsPullRequestRules.length; i++) {
                var html=this.state.textedLabelsPullRequestRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }

    newMPRTable(idx) {
        let table = []
        if (this.state.textedMergedPullRequestRules.length > 0) {
            for (let i = 0; i < this.state.textedMergedPullRequestRules.length; i++) {
                var html=this.state.textedMergedPullRequestRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }
    newOPRTable(idx) {
        let table = []
        if (this.state.textedOpenPullRequestRules.length > 0) {
            for (let i = 0; i < this.state.textedOpenPullRequestRules.length; i++) {
                var html=this.state.textedOpenPullRequestRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }
    newCommitsTable(idx) {
        let table = []
        if (this.state.textedCommitsRules.length > 0) {
            for (let i = 0; i < this.state.textedCommitsRules.length; i++) {
                var html=this.state.textedCommitsRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }
    newIssueTable(idx) {
        let table = []
        if (this.state.textedNewIssuesRules.length > 0) {
            for (let i = 0; i < this.state.textedNewIssuesRules.length; i++) {
                var html=this.state.textedNewIssuesRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }
    newReadyTable(idx) {
        let table = []
        if (this.state.textedReadyRules.length > 0) {
            for (let i = 0; i < this.state.textedReadyRules.length; i++) {
                var html=this.state.textedReadyRules[i];
                table.push(<tr>{html}</tr>);
            }
        }
        console.log(table);
        return table;
    }



    render() {
        const isClicked  = this.state.isClicked;
        console.log(this.state);
        console.log(this.state.rulesLabelsPullRequest);

        return (
            <form onSubmit={this.submitFormNew}>

                <h1>Rules Definition Form</h1>
                <div>
                    <div className="initial-configuration-information">
                        <h2>Initial configuration information</h2>
                        <h4>GitHub</h4>
                        <p>API key:  <TextField name="apiKeyGit" onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>GitHub base URL:  <TextField name="github_base_url" onChange={this.handleStatusChange} id="standard-basic" label="GitHub base URL"/></p>
                        <p>Repository:  <TextField name="repository" onChange={this.handleStatusChange} id="standard-basic" label="Repository"/></p>
                        <br />
                        <br />
                        <h4>Rally</h4>
                        <p>API key:  <TextField name="apiKeyRally" onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>Rally host:  <TextField name="rally_host" onChange={this.handleStatusChange} id="standard-basic" label="Rally host"/></p>
                        <p>Workspace:  <TextField name="workspace" onChange={this.handleStatusChange} id="standard-basic" label="Workspace"/></p>
                        <p>Project:  <TextField name="project" onChange={this.handleStatusChange} id="standard-basic" label="Project"/></p>
                        <br />
                        <br />
                        <h4>Initial Timestamp</h4>
                        <Form.Control
                        type="date"
                        onChange={this.handleDate}
                        required/>
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
                            <div>
                                <table>
                                        {this.newLPRTable()}
                                </table>
                            </div>
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
                            <Par1 onChange={(event) => this.handleStatusChangeLabels(idx, event)} />
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 &&(
                            <Par2 onChange={(event) => this.handleStatusChangeLabels(idx, event)} />
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
                <div>
                    <table>
                            {this.newMPRTable()}
                    </table>
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
                            <Par1 onChange={(event) => this.handleStatusChangeMergedPr(idx, event)}/>
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={(event) => this.handleStatusChangeMergedPr(idx, event)}/>
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
                <div>
                    <table>
                            {this.newOPRTable()}
                    </table>
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
                            <Par1 onChange={(event) => this.handleStatusChangeOpenPr(idx, event)}/>
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={(event) => this.handleStatusChangeOpenPr(idx, event)} />
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
                <div>
                    <table>
                            {this.newCommitsTable()}
                    </table>
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
                            <Par1 onChange={(event) => this.handleStatusChangeCommits(idx, event)} />
                        )}
                        {shareholder.isSelectedPar2 && !shareholder.isSelectedPar1 && (
                            <Par2 onChange={(event) => this.handleStatusChangeCommits(idx, event)} />
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
                <div>
                    <table>
                            {this.newIssueTable()}
                    </table>
                </div>
                {this.state.shareholdersNewIssues.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>Create a new defect only if the issue contains this label </p>
                        <TextField id="standard-basic" label="Defect Tag"
                            onChange={this.handleDefectTag}
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
                <div>
                    <table>
                            {this.newReadyTable()}
                    </table>
                </div>
                {this.state.shareholdersReady.map((shareholder, idx) => (
                    <div className="shareholder">
                        <p>When the story state of US is </p>
                        <TextField name="usId" onChange={this.handleStatusChange} id="standard-basic" label="US ID"
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> and the task with name </p>
                        <TextField name="taskName" onChange={(event) => this.handleSelectItemsforReady(idx, event)} id="standard-basic" label="Task name "
                            // onChange={this.handleShareholderNameChange(idx)}
                        />
                        <p> is in state </p>
                        <TextField name="state"  onChange={(event) => this.handleStatusChangeReady(idx, event)} id="standard-basic" label="Task state "
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

