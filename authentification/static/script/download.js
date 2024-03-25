async function download(filename) {
    let response = await fetch("/files/"+filename, {method: 'POST', headers: {
        'Content-type': 'application/zip'
    }});
    let link = document.createElement('a');
    link.download = filename;
    let blob = new Blob(['Hello, world!'], {type: 'text/plain'});
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}