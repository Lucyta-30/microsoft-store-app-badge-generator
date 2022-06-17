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
		 
		var offsetLength = 4503599627370495 //max value, use for string indexing;
		//PRODUCT ID
		const productId = await vscode.window.showInputBox({
			placeHolder: 'Type in your Product ID'
		 });
		 editor.edit((edit) => {
			edit.insert(new vscode.Position(0,0), "<script type = \"module\" src=\"https://getbadgecdn.azureedge.net/ms-store-badge.bundled.js\"></script>");
			edit.insert(new vscode.Position(1,0), "<ms-store-badge productid=\"" + productId + "\"");
		 })

		//CAMPAIGN ID
		const campaignId = await vscode.window.showInputBox({
			placeHolder: 'Type in your Campaign ID (Leave empty if none)'
		 });
		 if(campaignId != "") {
			editor.edit((edit) => {
				edit.insert(new vscode.Position(1, offsetLength), " cid=\"" + campaignId + "\"");
			})
		 }

		//WINDOW MODE
		var windowMode = "";
		const windowModeOptions = [
			{
				label: "Popup",
				decription: "MiniPDP Window Mode invoked from the badge"
			},
			{
				label: "Full",
				description: "Regular Store Window Mode invoked from the badge"
			},
		];
		await vscode.window.showQuickPick(windowModeOptions).then(option => {
			windowMode = option.label;
			editor.edit((edit) => {
				edit.insert(new vscode.Position(1, offsetLength), " windowMode=\"" + windowMode.toLowerCase() + "\"");
			})
		});

		//BADGE THEME
		var theme = "";
		const themeOptions = [
			{
				label: "Dark",
				decription: "Dark Themed Badge"
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
				edit.insert(new vscode.Position(1, offsetLength), " theme=\"" + theme.toLowerCase() + "\"" + " size=\"large\"");
			})
		});

		//ANIMATION
		var animation = "";
		const animationOptions = [
			{
				label: "Off",
				decription: "Turn off badge animation"
			},
			{
				label: "On",
				description: "Turn on badge animation"
			},
		];
		await vscode.window.showQuickPick(animationOptions).then(option => {
			animation = option.label;
			editor.edit((edit) => {
				edit.insert(new vscode.Position(1, offsetLength), " animation=\"" + animation.toLowerCase() + "\"> </ms-store-badge>");
			})
		});

		});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
