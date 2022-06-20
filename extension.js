/**
 * Microsoft Store App Badge Generator VSCode Extension
 */

const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	let disposable = vscode.commands.registerCommand('microsoft-store-app-badge-generator.generateBadge', async function () {
		//display intro message
		vscode.window.showInformationMessage('Welcome to the Microsoft Store App Badge Generator Extension! Simply enter and choose which prop values you would like to include for auto-generation.');

		const editor = vscode.window.activeTextEditor; //editor constant

		//if user is currently not on editor
		if(!editor) {
			vscode.window.showInformationMessage("An editor does not exist.");
			return;
		 }
		 
		//PRODUCT ID
		const productId = await vscode.window.showInputBox({
			placeHolder: 'Type in your Product ID'
		 });
		 editor.edit((edit) => {
			edit.insert(editor.selection.active, "<script type = \"module\" src=\"https://getbadgecdn.azureedge.net/ms-store-badge.bundled.js\"></script>");
			edit.insert(editor.selection.active, "<ms-store-badge productid=\"" + productId + "\"");
		 })

		//CAMPAIGN ID
		const campaignId = await vscode.window.showInputBox({
			placeHolder: 'Type in your Campaign ID (Leave empty if none)'
		 });
		 if(campaignId != "") {
			editor.edit((edit) => {
				edit.insert(editor.selection.active, " cid=\"" + campaignId + "\"");
			})
		 }

		//WINDOW MODE
		var windowMode = "";
		const windowModeOptions = [
			{
				label: "Popup",
				description: "MiniPDP Window Mode invoked from the badge"
			},
			{
				label: "Full",
				description: "Regular Store Window Mode invoked from the badge"
			},
		];
		await vscode.window.showQuickPick(windowModeOptions).then(option => {
			windowMode = option.label;
			editor.edit((edit) => {
				edit.insert(editor.selection.active, " windowMode=\"" + windowMode.toLowerCase() + "\"");
			})
		});

		//BADGE THEME
		var theme = "";
		const themeOptions = [
			{
				label: "Dark",
				description: "Dark Themed Badge"
			},
			{
				label: "Light",
				description: "Light Themed Badge"
			},
			{
				label: "Auto",
				description: "Detect browser settings and invert badge theme"
			},
		];
		await vscode.window.showQuickPick(themeOptions).then(option => {
			theme = option.label;
			editor.edit((edit) => {
				edit.insert(editor.selection.active, " theme=\"" + theme.toLowerCase() + "\"" + " size=\"large\"");
			})
		});

		//ANIMATION
		var animation = "";
		const animationOptions = [
			{
				label: "Off",
				description: "Turn off badge animation"
			},
			{
				label: "On",
				description: "Turn on badge animation"
			},
		];
		await vscode.window.showQuickPick(animationOptions).then(option => {
			animation = option.label;
			editor.edit((edit) => {
				edit.insert(editor.selection.active, " animation=\"" + animation.toLowerCase() + "\"></ms-store-badge>");
			})
		});

		/*
		//Webview
		const panel = vscode.window.createWebviewPanel(
			'preview',
			'Preview',
			vscode.ViewColumn.One,
			{}
		);
		//panel.webview.html = editor.document.getText();
		console.log(editor.document.getText());
		//vscode.window.showTextDocument(editor.document, editor.viewColumn);
		*/
		});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
