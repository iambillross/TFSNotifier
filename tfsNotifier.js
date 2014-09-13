var tfsNotifier = (function($, window, optionsManager) {
    var tfsNotifier = {};
    var options = {
        'interval': 2000,
        'timeout': 5000
    };

    function getLastMessage() {

        var lastMessage = {
            id: $('li.message.normal').last().attr('id'),
            sender: $('li.message.normal').last().find('.message-sender').children('div:first-child').attr('title'),
            image: $(location).attr('protocol') + '//' + $(location).attr('host') + $('.chat-box').find('.identity-picture').last().attr('src'),
            message: $('li.message.normal').last().find('.message-text').text()
        }

        return lastMessage;
    };

    function init() {

        //TODO: Reduce these to one call
        optionsManager.getOption('interval', function(result) {
            if(!$.isEmptyObject(result)) {
                options.interval = result.interval;
            }
        });

        optionsManager.getOption('timeout', function(result) {
            if(!$.isEmptyObject(result)) {
                options.timeout = result.timeout;
            }
        });

        //Register storage listener for settings
        //TODO: Move this to the storage manager
        chrome.storage.onChanged.addListener(function(changes, areaName) {
            //If any keys have been changed
                //Compare the changed keys to the options object
                //Set new option value
            console.log('Changes:' + changes);
        });
    };

    function run() {
        init();

        var lastMessage = getLastMessage();

        window.setInterval(function() {

            var currentMessage = getLastMessage();

            if(!$('body').hasClass("visible")) {

                if(lastMessage.id != currentMessage.id && lastMessage.id != undefined) {
                    var n = new Notification(currentMessage.sender, { body: currentMessage.message,
                        icon: currentMessage.image });
                    n.onshow = function () {
                        setTimeout(n.close, options.timeout);
                    }
                }

            }

            lastMessage = currentMessage;

        }, options.interval);
    };

    tfsNotifier.run = run;

    return tfsNotifier;

}(jQuery, window, optionsManager));
