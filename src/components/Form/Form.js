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
import config_json from '../../conf.json'

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
            existing_config_json: config_json,
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
            activeConfiguration: "",
            message: [],
            isClicked: false,
            initialTimestamp: "",
            ConfigurationNameTitle: "Select existing configuration",
            NewConfigurationName: "",
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
         var jsonObjConfiguration = JSON.parse("{}");
         if (this.state.ConfigurationNameTitle === "New configuration"){
                jsonObjConfiguration["configuration_name"] = this.state.NewConfigurationName;
         } else {
                jsonObjConfiguration["configuration_name"] = this.state.ConfigurationNameTitle;
         }
         jsonObjConfiguration["periodic_run"] = this.state.activeConfiguration;
         var jsonObjGithub = JSON.parse("{}");
         jsonObjGithub["api_key"] = this.state.apiKeyGit;
         jsonObjGithub["github_base_url"] = this.state.github_base_url;
         jsonObjGithub["repository"] = this.state.repository;
         jsonObjConfiguration["github"] = jsonObjGithub;
         var jsonObjRally = JSON.parse("{}");
         jsonObjRally["api_key"] = this.state.apiKeyRally;
         jsonObjRally["rally_host"] = this.state.rally_host;
         jsonObjRally["workspace"] = this.state.workspace;
         jsonObjRally["project"] = this.state.project;
         jsonObjConfiguration["rally"] = jsonObjRally;
         jsonObjConfiguration["initialTimestamp"] = this.state.initialTimestamp;
         var jsonObjRules = JSON.parse("{}");
         jsonObjRules["commit"] = this.state.rulesCommits;
         jsonObjRules["open-pull-request"] = this.state.rulesOpenPullRequest;
         jsonObjRules["merged-pull-request"] = this.state.rulesMergedPullRequest;
         jsonObjRules["labels"] = this.state.rulesLabelsPullRequest;
         jsonObjRules["ready"] = this.state.rulesReady;
         jsonObjRules["new-issue"] = this.state.rulesNewIssues;
         jsonObjConfiguration["rules"] = jsonObjRules;
         console.log(JSON.stringify(jsonObjConfiguration));

         //make it either replace or add a new configuration
         var jsonObj = JSON.parse("{}");
         jsonObj["configurations"] = this.state.existing_config_json["configurations"];
         if (this.state.ConfigurationNameTitle === "New configuration"){
                jsonObj["configurations"].push(jsonObjConfiguration);
         } else {
                // change an existing configuration
                for (var i = 0 ; i < this.state.existing_config_json["configurations"].length; i++) {
                    if (this.state.existing_config_json["configurations"][i]["configuration_name"] === this.state.ConfigurationNameTitle) {
                        delete jsonObj["configurations"][i];
                        jsonObj["configurations"][i] = jsonObjConfiguration;
                        break;
                    }
                }
         }
         console.log(jsonObj);
         console.log(JSON.stringify(jsonObj));

         e.preventDefault();
         const hostname = window.location.hostname;
                 // this.setState({isSubmitting: true});
         const res = await fetch(`http://${hostname}:8081/submit`, {
             method: "POST",
             body: JSON.stringify(jsonObj),
             headers: {
                "Content-Type": "application/json"
             }
         });
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
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveLPR(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveLPR(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedLabelsPullRequestRules[idx]))
        this.setState({

          rulesLabelsPullRequest: this.state.rulesLabelsPullRequest.filter((s, _idx) => _idx !== idx),
          textedLabelsPullRequestRules: this.state.textedLabelsPullRequestRules.filter((s, _idx) => _idx !== idx)

        });
    }

    newMPRTable(idx) {
        let table = []
        if (this.state.textedMergedPullRequestRules.length > 0) {
            for (let i = 0; i < this.state.textedMergedPullRequestRules.length; i++) {
                var html=this.state.textedMergedPullRequestRules[i];
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveMPR(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveMPR(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedMergedPullRequestRules[idx]))
        this.setState({
          rulesMergedPullRequest: this.state.rulesMergedPullRequest.filter((s, _idx) => _idx !== idx),
          textedMergedPullRequestRules: this.state.textedMergedPullRequestRules.filter((s, _idx) => _idx !== idx)

        });
    }

    newOPRTable(idx) {
        let table = []
        if (this.state.textedOpenPullRequestRules.length > 0) {
            for (let i = 0; i < this.state.textedOpenPullRequestRules.length; i++) {
                var html=this.state.textedOpenPullRequestRules[i];
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveOPR(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveOPR(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedOpenPullRequestRules[idx]))
        this.setState({
          rulesOpenPullRequest: this.state.rulesOpenPullRequest.filter((s, _idx) => _idx !== idx),
          textedOpenPullRequestRules: this.state.textedOpenPullRequestRules.filter((s, _idx) => _idx !== idx)

        });
    }

    newCommitsTable(idx) {
        let table = []
        if (this.state.textedCommitsRules.length > 0) {
            for (let i = 0; i < this.state.textedCommitsRules.length; i++) {
                var html=this.state.textedCommitsRules[i];
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveCommits(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveCommits(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedCommitsRules[idx]))
        this.setState({
          rulesCommits: this.state.rulesCommits.filter((s, _idx) => _idx !== idx),
          textedCommitsRules: this.state.textedCommitsRules.filter((s, _idx) => _idx !== idx)

        });
    }

    newIssueTable(idx) {
        let table = []
        if (this.state.textedNewIssuesRules.length > 0) {
            for (let i = 0; i < this.state.textedNewIssuesRules.length; i++) {
                var html=this.state.textedNewIssuesRules[i];
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveNewIssues(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveNewIssues(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedNewIssuesRules[idx]))
        this.setState({
          rulesNewIssues: this.state.rulesNewIssues.filter((s, _idx) => _idx !== idx),
          textedNewIssuesRules: this.state.textedNewIssuesRules.filter((s, _idx) => _idx !== idx)

        });
    }

    newReadyTable(idx) {
        let table = []
        if (this.state.textedReadyRules.length > 0) {
            for (let i = 0; i < this.state.textedReadyRules.length; i++) {
                var html=this.state.textedReadyRules[i];
                table.push(<tr>{html}<button type="button" onClick={() => this.handleRemoveReady(i)} className="small"> - </button></tr>);
            }
        }
        return table;
    }

    handleRemoveReady(idx) {
        if (window.confirm('Are you sure you wish to delete this item?\n' + this.state.textedReadyRules[idx]))
        this.setState({
          rulesReady: this.state.rulesReady.filter((s, _idx) => _idx !== idx),
          textedReadyRules: this.state.textedReadyRules.filter((s, _idx) => _idx !== idx)

        });
    }

    removeConfiguration = async e => {
        if (this.state.ConfigurationNameTitle !== "New configuration") {
            if (window.confirm('Are you sure you wish to delete this configuration?\n' + this.state.ConfigurationNameTitle)){
                var jsonObj = JSON.parse("{}");
                var configurations = [];
                for (var i = 0 ; i < this.state.existing_config_json["configurations"].length; i++) {
                    if (this.state.existing_config_json["configurations"][i]["configuration_name"] !== this.state.ConfigurationNameTitle) {
                        configurations.push(this.state.existing_config_json["configurations"][i]);
                    }
                }
                jsonObj["configurations"] = configurations;
//                e.preventDefault();
                console.log(jsonObj);
                const hostname = window.location.hostname;
                const res = await fetch(`http://${hostname}:8081/submit`, {
                    method: "POST",
                    body: JSON.stringify(jsonObj),
                    headers: {
                       "Content-Type": "application/json"
                    }
                });
            }
        }
        console.log(jsonObj);
    }

    updateTextedLPRRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["labels"].length; i++) {
            if (this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["item"] === "US/DE"){
                result.push("When a label '" + this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["labelName"] + "' exists in a pull request, then move the US/DE to '" + this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["action"] + "'");
            } else {
                result.push("When a label '" + this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["labelName"] + "' exists in a pull request, then move the TA with " + this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["item"].substring(3, this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["item"].length) + " to '" + this.state.existing_config_json["configurations"][idx]["rules"]["labels"][i]["action"] + "'");
            }
        }
        this.setState({
            textedLabelsPullRequestRules: update(this.state.textedLabelsPullRequestRules, {$set: result})
            });

    }

    updateTextedMPRRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"].length; i++) {
            if (this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"][i]["item"] === "US/DE"){
                result.push("When a pull request is merged, move the US/DE to '" + this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"][i]["action"] + "'");
            } else {
                result.push("When a pull request is merged, move the TA with '" + this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"][i]["item"].substring(3, this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"][i]["item"].length) + "' to '" + this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"][i]["action"] + "'");
            }
        }
        this.setState({
            textedMergedPullRequestRules: update(this.state.textedMergedPullRequestRules, {$set: result})
            });

    }

    updateTextedOPRRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"].length; i++) {
            if (this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"][i]["item"] === "US/DE"){
                result.push("When a pull request is merged, move the US/DE to '" + this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"][i]["action"] + "'");
            } else {
                result.push("When a pull request is merged, move the TA with '" + this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"][i]["item"].substring(3, this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"][i]["item"].length) + "' to '" + this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"][i]["action"] + "'");
            }
        }
        this.setState({
            textedOpenPullRequestRules: update(this.state.textedOpenPullRequestRules, {$set: result})
            });

    }

    updateTextedCommitRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["commit"].length; i++) {
            if (this.state.existing_config_json["configurations"][idx]["rules"]["commit"][i]["item"] === "US/DE"){
                result.push("When a pull request is merged, move the US/DE to '" + this.state.existing_config_json["configurations"][idx]["rules"]["commit"][i]["action"] + "'");
            } else {
                result.push("When a pull request is merged, move the TA with '" + this.state.existing_config_json["configurations"][idx]["rules"]["commit"][i]["item"].substring(3, this.state.existing_config_json["configurations"][idx]["rules"]["commit"][i]["item"].length) + "' to '" + this.state.existing_config_json["configurations"][idx]["rules"]["commit"][i]["action"] + "'");
            }
        }
        this.setState({
            textedCommitsRules: update(this.state.textedCommitsRules, {$set: result})
            });

    }
    updateTextedNewIssueRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["new-issue"].length; i++) {
            result.push("Create a new defect, only if the issue contains this label '" + this.state.existing_config_json["configurations"][idx]["rules"]["new-issue"][i]["required_label"] + "'");
        }
        this.setState({
            textedNewIssuesRules: update(this.state.textedNewIssuesRules, {$set: result})
            });

    }

    updateTextedReadyRules(idx) {
        let result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"][idx]["rules"]["ready"].length; i++) {
            result.push("When the story state of US is in state '" + this.state.existing_config_json["configurations"][idx]["rules"]["ready"][i]["story_state"] + "' and the task with name '" + this.state.existing_config_json["configurations"][idx]["rules"]["ready"][i]["item"]  + "' is in state '" + this.state.existing_config_json["configurations"][idx]["rules"]["ready"][i]["state"] + "' then mark it as ready.");
        }
        this.setState({
            textedReadyRules: update(this.state.textedReadyRules, {$set: result})   // this.state.textedReadyRules.concat(result)
            });

    }

    initializeFormBasedOnConfiguration = (idx, configName) => () => {
        if (configName==="New configuration"){
            if (window.confirm('Are you sure you want to start a new configuration? All unsaved rules will be deleted')){
                this.setState({activeConfiguration: "No"})
                this.setState({apiKeyGit: ""});
                this.setState({github_base_url: ""});
                this.setState({repository: ""});
                this.setState({apiKeyRally: ""});
                this.setState({rally_host: ""});
                this.setState({workspace: ""});
                this.setState({project: ""});
                this.setState({initialTimestamp: ""});
                this.setState({rulesLabelsPullRequest: []});
                this.setState({rulesReady: []});
                this.setState({rulesNewIssues: []});
                this.setState({rulesCommits: []});
                this.setState({rulesOpenPullRequest: []});
                this.setState({rulesMergedPullRequest: []});
                this.setState({textedLabelsPullRequestRules: []});
                this.setState({textedReadyRules: []});
                this.setState({textedNewIssuesRules: []});
                this.setState({textedCommitsRules: []});
                this.setState({textedOpenPullRequestRules: []});
                this.setState({textedMergedPullRequestRules: []});
                this.setState({ConfigurationNameTitle: configName});
            }
        } else {
            if (window.confirm('Are you sure you want to load "' + configName + '" configuration? All unsaved rules will be deleted')){
                console.log(this.state.existing_config_json["configurations"]);
                this.setState({activeConfiguration: this.state.existing_config_json["configurations"][idx]["periodic_run"]})
                this.setState({apiKeyGit: this.state.existing_config_json["configurations"][idx]["github"]["api_key"]});
                this.setState({github_base_url: this.state.existing_config_json["configurations"][idx]["github"]["github_base_url"]});
                this.setState({repository: this.state.existing_config_json["configurations"][idx]["github"]["repository"]});
                this.setState({apiKeyRally: this.state.existing_config_json["configurations"][idx]["rally"]["api_key"]});
                this.setState({rally_host: this.state.existing_config_json["configurations"][idx]["rally"]["rally_host"]});
                this.setState({workspace: this.state.existing_config_json["configurations"][idx]["rally"]["workspace"]});
                this.setState({project: this.state.existing_config_json["configurations"][idx]["rally"]["project"]});
                this.setState({initialTimestamp: this.state.existing_config_json["configurations"][idx]["initialTimestamp"]});
                this.setState({rulesLabelsPullRequest: this.state.existing_config_json["configurations"][idx]["rules"]["labels"]});
                this.setState({rulesReady: this.state.existing_config_json["configurations"][idx]["rules"]["ready"]});
                this.setState({rulesNewIssues: this.state.existing_config_json["configurations"][idx]["rules"]["new-issue"]});
                this.setState({rulesCommits: this.state.existing_config_json["configurations"][idx]["rules"]["commit"]});
                this.setState({rulesOpenPullRequest: this.state.existing_config_json["configurations"][idx]["rules"]["open-pull-request"]});
                this.setState({rulesMergedPullRequest: this.state.existing_config_json["configurations"][idx]["rules"]["merged-pull-request"]});
                this.setState({textedLabelsPullRequestRules: []});
                this.setState({textedReadyRules: []});
                this.setState({textedNewIssuesRules: []});
                this.setState({textedCommitsRules: []});
                this.setState({textedOpenPullRequestRules: []});
                this.setState({textedMergedPullRequestRules: []});
                this.updateTextedReadyRules(idx);
                this.updateTextedLPRRules(idx);
                this.updateTextedMPRRules(idx);
                this.updateTextedOPRRules(idx);
                this.updateTextedCommitRules(idx);
                this.updateTextedNewIssueRules(idx);
                this.setState({ConfigurationNameTitle: configName});
            }
        }
    }

    makeActive = (idx) => () => {
                this.setState({activeConfiguration: "Yes"});
    }

    makeNoActive = (idx) => () => {
                this.setState({activeConfiguration: "No"});
    }

    loadConfigurationButtons() {
        var result=[];
        for (var i=0; i<this.state.existing_config_json["configurations"].length; i++) {
            var currentConfigName = this.state.existing_config_json["configurations"][i]["configuration_name"];
            result.push(<Dropdown.Item  onClick={this.initializeFormBasedOnConfiguration(i, currentConfigName)}>{currentConfigName}</Dropdown.Item>);
        }
        result.push(<Dropdown.Item  onClick={this.initializeFormBasedOnConfiguration(this.state.existing_config_json["configurations"].length, "New configuration")}>New configuration</Dropdown.Item>);
        return result;
    }

    render() {
        const isClicked  = this.state.isClicked;
        console.log(this.state);

        return (
            <form onSubmit={this.submitFormNew}>

                <h1>Rules Definition Form</h1>
                <div>
                    <div className="initial-configuration-information">
                        <h2>Initial configuration information</h2>
                        <table><tr><td style={{width: "100%"}}><DropdownButton style={{width: "100%"-50}} name="items" id="dropdown-basic-button" title={this.state.ConfigurationNameTitle}>
                            {
                                this.loadConfigurationButtons()
                            }
                        </DropdownButton></td><td><button style={{width: 50}} type="button" onClick={() => this.removeConfiguration()} className="smallRed"> - </button></td></tr></table>
                        {this.state.ConfigurationNameTitle === "New configuration" && (
                             <p>New configuration name:  <TextField name="NewConfigurationName" value={this.state.NewConfigurationName} onChange={this.handleStatusChange} id="standard-basic" label="NewConfigurationName"/></p>
                        )}
                        <table><tr style={{width: 400}}><td style={{width: 150}}><p>Active configuration:  </p></td><td><DropdownButton style={{width: 250}} name="items" id="dropdown-basic-button" title={this.state.activeConfiguration}>
                                <Dropdown.Item name="items" onClick={this.makeActive(0)}>Yes</Dropdown.Item>
                                <Dropdown.Item name="items" onClick={this.makeNoActive(0)}>No</Dropdown.Item>
                        </DropdownButton></td></tr></table>
                        <h4>GitHub</h4>
                        <p>API key:  <TextField name="apiKeyGit" value={this.state.apiKeyGit} onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>GitHub base URL:  <TextField name="github_base_url" value={this.state.github_base_url} onChange={this.handleStatusChange} id="standard-basic" label="GitHub base URL"/></p>
                        <p>Repository:  <TextField name="repository" value={this.state.repository} onChange={this.handleStatusChange} id="standard-basic" label="Repository"/></p>
                        <br />
                        <br />
                        <h4>Rally</h4>
                        <p>API key:  <TextField name="apiKeyRally" value={this.state.apiKeyRally} onChange={this.handleStatusChange} id="standard-basic" label="API key"/></p>
                        <p>Rally host:  <TextField name="rally_host" value={this.state.rally_host} onChange={this.handleStatusChange} id="standard-basic" label="Rally host"/></p>
                        <p>Workspace:  <TextField name="workspace" value={this.state.workspace} onChange={this.handleStatusChange} id="standard-basic" label="Workspace"/></p>
                        <p>Project:  <TextField name="project" value={this.state.project} onChange={this.handleStatusChange} id="standard-basic" label="Project"/></p>
                        <br />
                        <br />
                        <h4>Initial Timestamp</h4>
                        <Form.Control
                        type="date"
                        value={this.state.initialTimestamp.substring(0, 10)}
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

