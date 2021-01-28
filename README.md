# AWS Cognito Auth with React and Amplify
This project is a simple AWS Cognito Authentication Starter React App using AWS Amplify.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
First run the install command to setup the React app:

```bash
npm install
```
### Install the Amplify CLI
If you already have installed Amplify CLI, skip to **Initiate Amplify project**.

If you haven't installed and Amplify CLI yet, run:
```bash
npm install -g @aws-amplify/cli
```

### Configure Amplify project:
```bash
amplify configure
```
You will need to sign-in into your AWS account (or create one, if you haven't already). Next go back to terminal, where  you will be prompted by the config setup. 

If in doubts about setup options, you can follow the steps and video guide from AWS: <https://docs.amplify.aws/cli/start/install#configure-the-amplify-cli>

### Initiate Amplify project:
Run:
```bash
amplify init
```
Accept defaults or configure options for your project

### Add Amplify Authentication
```bash
amplify add auth
```
You will be prompted by the `auth` setup. You can accept defaults and configure most options later in AWS Console.

```bash
?  Do you want to use the default authentication and security configuration? 
    # ❯ Default configuration
?  How do you want users to be able to sign in? (Use arrow keys)
    # ❯ Username
?  Do you want to configure advanced settings? (Use arrow keys)
    # ❯ No, I am done.   
```

Push changes to AWS cloud
```bash
amplify push
```

## Run App
```bash
npm start
```

## Post instalation config
In order for your application to fully work, you will need to configure few extra steps in [AWS Console](https://aws.amazon.com/console/):

1. Login and navigate to Cognito
2. Select Manage User Pools
3. Choose the pool you have created / you're working with 
4. In the left hand side navigation under *General Settings* choose **Message customizations**:
    * Scroll down to *Do you want to customize your email verification messages?*
    * Select: **Verification type:** *Link*
    * This change will send user link to verify accoun instead of verification code (the App currently does not support verification codes)
5 In the left hand side navigation under *App integration* choose **Domain name**
    * Add *Domain prefix*  or configure your own domain
    * If you don't add domain you will probably see the error message when trying to register new user: *Cannot perform specific action because there does not exist a valid use pool domain associated with the user pool*

## Manage your users
You can manage all users from within the [AWS Console](https://aws.amazon.com/console/).
In order to delete a user, execute the command:
```bash
aws cognito-idp  admin-delete-user --user-pool-id <your-Pool-ID> --username <username-to-be-deleted>
```
