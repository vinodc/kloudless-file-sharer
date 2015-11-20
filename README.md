# File Sharing Tool

A single-page JS app that allows users to select files from cloud storage or
their computer and obtain links to them to share with others.
Links can be protected with passwords and can also be set to expire.

## Usage

### Configuration

This project uses the [Kloudless File Explorer](https://github.com/kloudless/file-explorer).

`js/main.js` contains the Kloudless App ID of the application used. You can
sign up and obtain a Kloudless application [here](https://kloudless.com).
Set this variable to your own Kloudless App ID once your app is configured
with an Upload Location.

Any accounts connected will be connected to this Kloudless application.
An Upload Location registered for this application will be used for
files uploaded via the Dropzone or Computer option.

### Deployment

Run a simple HTTP server at the root of this repository to serve `index.html`.
For example, you could run [http-server](https://github.com/indexzero/http-server).

## Contact

Contact `support@kloudless.com` with any questions or feedback.

