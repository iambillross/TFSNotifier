var tfsNotifier = (function($, window) {
    var tfsNotifier = {};

    function getLastMessage() {

        var lastMessage = {
            id: $('li.message.normal').last().attr('id'),
            sender: $('li.message.normal').last().find('.message-sender').children('div:first-child').attr('title'),
            image: $(location).attr('protocol') + '//' + $(location).attr('host') + $('.chat-box').find('.identity-picture').last().attr('src'),
            message: $('li.message.normal').last().find('.message-text').text()
        }

        return lastMessage;
    };

    function run(interval, timeout) {
        var lastMessage = getLastMessage();

        window.setInterval(function() {

            var currentMessage = getLastMessage();

            if(!$('body').hasClass("visible")) {

                if(lastMessage.id != currentMessage.id && lastMessage.id != undefined) {
                    var n = new Notification(currentMessage.sender, { body: currentMessage.message,
                        icon: currentMessage.image });
                    n.onshow = function () {
                        setTimeout(n.close, timeout);
                    }
                }

            } 

            lastMessage = currentMessage;

        }, interval);
    };

    tfsNotifier.run = run;

    return tfsNotifier;

}(jQuery, window));
