var fs = require('fs');

function ReadTabFileSync(filename, option) {
    var all_title = new Array();
    var all_data = new Array();
    var all_raw_data = fs.readFileSync(filename, option);
    //split all
    var all_raw_content = all_raw_data.split('\n')
    for (var i = 0; i < all_raw_content.length; i++) {
        //split row
        var row_raw_content = all_raw_content[i].split("\t");
        //delete the ending 
        row_raw_content[row_raw_content.length - 1] = row_raw_content[row_raw_content.length - 1].replace(/\r|\n/ig, "");
        for (var j = 0; j < row_raw_content.length; j++) {
            row_raw_content[j] = row_raw_content[j].replace(/(^s*)|(s*$)/g, "")
        };
        if (i == 0) {
            all_title = row_raw_content;
        };
        if (i >= 1 && row_raw_content.length == all_title.length) {
            all_data[i - 1] = row_raw_content;
        };
    };
    return all_data;
}

function ReadTabFileASync(filename, option, callback) {
    fs.readFile(filename, option, function(err, data) {
        if (err) {
            console.log("ReadTabFileASync Error! filename:%s, option:%s", filename, option);
        } else {
            var all_title = new Array();
            var all_data = new Array();
            var all_raw_content = data.split('\n');

            for (var i = 0; i < all_raw_content.length; i++) {
                //split row
                var row_raw_content = all_raw_content[i].split("\t");
                //delete the ending 
                row_raw_content[row_raw_content.length - 1] = row_raw_content[row_raw_content.length - 1].replace(/\r|\n/ig, "");
                for (var j = 0; j < row_raw_content.length; j++) {
                    row_raw_content[j] = row_raw_content[j].replace(/(^s*)|(s*$)/g, "");
                };
                if (i == 0) {
                    all_title = row_raw_content;
                };
                if (i >= 1 && row_raw_content.length == all_title.length) {
                    all_data[i - 1] = row_raw_content;
                };
            };
            if (callback) {
                callback(all_data);
            }
        }
    });
}

module.exports.ReadTabFileSync = ReadTabFileSync;
module.exports.ReadTabFileASync = ReadTabFileASync;
