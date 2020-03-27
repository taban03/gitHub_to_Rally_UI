
# GitHub2Rally Web UI

This Web UI provides a form that the user can fill in order to define the configuration used for the GitHub to Rally integration.

In the project directory, you can run:

## How to run the project:

1. Run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
2. Run `node server.js` to start the Nodejs express backend (default port `8080`)

##Configuration

1.  Hostname: the hostname where the web app will run on. If you're running on local environment, set it to `localhost`.
2.  GitHub and Rally configurations, such as the API key, the GitHub base URL, the repository name, the Rally workspace etc.
3.  Initial Timestamp: the initial time value from where you want start the scanning for the mapping.

By default, the updater will run every 5 minutes, scanning GitHub side and mapping to Rally according to the settings that you provided.

## Rules
The GitHub2Rally Web UI provides different rules that the user can define to customize the mapping between GitHub and Rally based on his needs.

**Note:** For the GitHub2Rally integration to work, the GitHub branch must contain the id of the US/DE (USXXXXXX or DEXXXXXX).

1.  Labels of pull request: define the rule used to update a Rally item (US, TA, DE) state based on a label name assigned to a PR. The label name should refer to the user story/defect ID (USXXXXXX, DEXXXXXX) or to a task name. The Rally item will be automatically updated to the defined state.

    **Example:**
    
        When a label 'In progress' exists in a pull request, then move the corresponding user story to in Progress.
        
2.  Merged pull requests: defines the rule used to update a Rally item (US, TA, DE) state once the corresponding PR is merged.
    **Example:**
    
        When a pull request is merged, move the US/DE to Complete
        
3.  Open pull requests: defines the rule used to update a Rally item (US, TA, DE) state once the corresponding PR is open.
    **Example:**
    
        When a pull request is open, move the US/DE to In progress
        
4.  Commits: defines the rule used to update a Rally item (US, TA, DE) state once a commit is performed on the corresponding GitHub item.
    **Example:**
    
        When a commit is happening, move the US/DE to In progress
 
5.  New Issue: defines the rule used to create a new defect on Rally based on the corresponding GitHub issue with a specific label.
    **Example:**
    
        Create a new defect, only if the issue contains this label Bug
        
6.  Ready: defines the rule used to mark as Ready a specific user story on Rally based on the state of a specific task.
    **Example:**
    
        When the story state of US is in state Defined and the task with name Testing is in state Defined then mark it as ready
        