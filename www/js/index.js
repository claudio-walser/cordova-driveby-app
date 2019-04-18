/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

    submit: function() {
        params = this.checkedPeople.join(' ')
        params += ' ' + this.checkedTarget
        console.log('send map2.py start ' + params + ' start to the gopigo')
    }
};

app.initialize();