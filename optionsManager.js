//This might make more sense to call a ChromeStorageManager.
var optionsManager = (function() {
	var optionsManager = {};

	function saveOption(option, value) {
		var setting = {};
		setting[option] = value;
		chrome.storage.local.set(setting, function() {
			alert('Saved');
		});
	};

	function getOption(option, callback) {
		chrome.storage.local.get(option, callback);
	};

	optionsManager.saveOption = saveOption;
	optionsManager.getOption = getOption;

	return optionsManager;
}());
