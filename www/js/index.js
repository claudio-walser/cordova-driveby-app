var app = {

    checkedPeople: [],
    checkedTarget: false,

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.receivedEvent('deviceready')
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    checkPeople: function (el) {
        el.classList.add("checked");
        this.checkedPeople.push(el.getAttribute('data-value'))
    },

    uncheckPeople: function(el) {
        el.classList.remove("checked");
        for( var i = 0; i < this.checkedPeople.length; i++){ 
           if ( this.checkedPeople[i] === el.getAttribute('data-value')) {
             this.checkedPeople.splice(i, 1); 
           }
        }
    },

    checkTarget: function(el) {
        el.classList.add('checked')
        this.checkedTarget = el.getAttribute('data-value')
        //
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var peopleElements = parentElement.querySelector('.people');
        var targetElements = parentElement.querySelector('.target');
        var that = this

        parentElement.onclick = function(e) {
            clickedElement = e.target
            if (
                !clickedElement.classList.contains('people') && 
                !clickedElement.classList.contains('target') && 
                !clickedElement.classList.contains('button')
            ) {
                return false;
            }

            if (clickedElement.classList.contains('people')) {
                if (clickedElement.classList.contains('checked')) {
                    that.uncheckPeople(clickedElement)
                } else {
                    that.checkPeople(clickedElement)
                }
            } else if (clickedElement.classList.contains('target')) {
                var currentlyChecked = parentElement.querySelector('.target.checked')
                if (currentlyChecked) {
                    currentlyChecked.classList.remove('checked')
                }
                that.checkTarget(clickedElement)
            } else if (clickedElement.classList.contains('button')) {
                that.submit()
            }

        }

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    clearAll: function() {
        var parentElement = document.getElementById('deviceready')
        var checkedElements = parentElement.querySelector('checked')
        console.log(checkedElements)
    },

    submit: function() {
        var params = 'start&' + this.checkedPeople.join('&')
        params += '&' + this.checkedTarget
        params += '&start'


        // Set up our HTTP request
        var xhr = new XMLHttpRequest();

        // Setup our listener to process completed requests
        xhr.onload = function () {

            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // What do when the request is successful
                console.log('success!', xhr);
            } else {
                // What do when the request fails
                console.log('The request failed!');
            }

            // Code that should run regardless of the request status
            console.log('This always runs...');
        };

        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('POST', 'http://10.10.10.10:8889');
        xhr.send(params);



        console.log('send map2.py start ' + params + ' start to the gopigo')
    }
};

app.initialize();