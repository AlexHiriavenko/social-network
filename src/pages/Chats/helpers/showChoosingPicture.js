export function showChoosingPicture(fileRef, setFiles, setImgUrls) {
    let filesList = fileRef?.current.files;
    const files = [];
    for (let i = 0; i < filesList?.length; i++) {
        files.push(filesList[i]);
    }
    setFiles(files);
    setImgUrls(files.map((file) => URL.createObjectURL(file)));
}
