/**
 * ПОСТИТ ФАЙЛ .plx
 */

document.querySelector("#upload-button").addEventListener('click', async function() {
    let upload = await uploadFile();

    if(upload.error == 0)
        alert('File uploaded successful');
    else if(upload.error == 1)
        alert('File uploading failed - ' + upload.message);
});

// async function managing upload operation
async function uploadFile() {
    // function return value
    let return_data = { error: 0, message: '' };

    try {
        // no file selected
        if(document.querySelector("#file-to-upload").files.length == 0) {
            throw new Error('No file selected');
        }
        else {
            // formdata
            let data = new FormData();
            data.append('title', 'Sample Title');
            data.append('file', document.querySelector("#file-to-upload").files[0]);


            
            // send fetch along with cookies
            let response = await fetch('https://localhost/summerpractic/konstructor/api/uploadFile', {
                method: 'POST',
                credentials: 'same-origin',
                body: data
            });

            // server responded with http response != 200
            if(response.status != 200)
                throw new Error('HTTP response code != 200');

            // read json response from server
            // success response example : {"error":0,"message":""}
            // error response example : {"error":1,"message":"File type not allowed"}
            let json_response = await response.json();
            if(json_response.error == 1)
                throw new Error(json_response.message);
        }
    }
    catch(e) {
        // catch rejected Promises and Error objects
        return_data = { error: 0, message: e.message };
    }

    return return_data;
}
