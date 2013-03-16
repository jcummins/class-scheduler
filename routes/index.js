module.exports = function(app){

    var winston = require('winston');
    winston.cli();

    app.get('/', function(req, res){

        /* Invalidate our previous JSON that was stored in memory
         * to force new, current JSON. 
         * See: http://stackoverflow.com/questions/14340365/how-to-work-around-node-js-require-caching-in-coffeescript
         */
        path = require('path');
        require.cache[path.resolve('./data/app.json')] = null;

        // Try loading the data, send an error boolean and empty object if not
        var data={},
            errors = [];

        try {
            data=require('../data/app.json');
        } catch(e) {
            data=data;
            errors[errors.length] = 'Oops. Looks like we couldn\'t parse your JSON file.';
        }

        // Data integrity checks

        // Ensure we can locate some courses
        try{
            if(!Array.isArray(data.Courses)) {
                errors[errors.length] = 'Hmm. We couldn\'t find any courses.';
            } else {
                if(data.Courses.length<1) {
                    errors[errors.length] = 'Hmm. We couldn\'t find any courses.';
                }
            }
        } catch(e) {
            errors[errors.length] = 'Hmm. We couldn\'t find any courses.';
        }

        // Ensure course IDs are unique (ignore case)
        try{

            function hasDuplicate(arr) {
                var i = arr.length, j, val;

                while (i--) {
                    val = arr[i].ID.toUpperCase();
                    j = i;
                    while (j--) {
                        if (arr[j].ID.toUpperCase() === val) {
                            return true;
                        }
                    }
                }
                return false;
            }

            if(hasDuplicate(data.Courses)) {
                errors[errors.length] = 'Course ID conflict! Please ensure course IDs are unique.';
            }

        } catch(e) {
            errors[errors.length] = 'Course ID conflict! Please ensure course IDs are unique.';
        }

        // Parse each meetingtime as a moment, check if chronological
        try{
            var moment = require('moment');
            data.Courses.forEach(function(element, index, array){
                if(Array.isArray(element.MeetingTimes)) {
                    element.MeetingTimes.forEach(function(element2, index2, array2) {
                        var StartTime = moment(element2.StartTime);
                        if(StartTime.isValid()) {
                            var EndTime = moment(element2.EndTime);
                            if(EndTime.isValid()) {
                                if(StartTime.isBefore(EndTime)) {
                                    /* winston.info('Success!'); */
                                }
                                else {
                                    errors[errors.length] = 'Invalid times in course: ' + element.ID + '. StartTime must be before EndTime.';
                                }
                            } else {
                                errors[errors.length] = '\nInvalid end time: '+ element2.EndTime +' \nIn course: ' + element.ID;
                            }
                        } else { 
                            errors[errors.length] = '\nInvalid start time: '+ element2.StartTime +' \nIn course: ' + element.ID;
                        }
                    });
                }
                
            });

        } catch(e) {
            errors[errors.length] = 'We loaded the JSON but encountered an unknown error during meetingtime parsing.';
        }
        if(errors.length>0) {
            winston.error(errors[0]);
        } else {
            winston.info('Successful!');
        }
        // Finally, show the page
        res.render('index', {
            title: 'D3',
            errors: JSON.stringify(errors),
            data: JSON.stringify(data)
        });
    });
    
    app.get('/test', function(req,res) {
        res.render('index', {
            title: 'Test'
        });
    });
    
};
