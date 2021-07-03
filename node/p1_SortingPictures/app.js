const path = require('path');
const os = require('os');
const fs = require('fs');

// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다
const folder = process.argv[2];
console.log(folder);
const workingDir = path.join(os.homedir(), 'pictures', folder);
if (!folder || !fs.existsSync(workingDir)) {
    console.error('Please enter folder name in pictures');
    return;
}
console.log(workingDir);

// 2. 그 폴더 안에 video, captured, duplicated 폴더를 만든다
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duolicatedDir);

// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMG_E1234)

fs.promises
.readdir(workingDir)
.then(processFiles)
.catch(console.log);

//돌아서 읽은 파일들을 각각에 폴더에 집어 넣는작업 -- move function은 따로 만들어줌 (file, targetDir)로
function processFiles(files) {
    files.forEach((file) => {
        if (isVideoFile(file)) {
            move(file, videoDir);
        } else if (isCapturedFile(file)) {
            move(file, capturedDir)
        } else if (isDuplicatedFile(files, file)) {
            move(file, duplicatedFile)
        }
    });
}

// 비디오파일, 캡쳐파일, 듀플리케잇파일을 구분하는 작업

function isVideoFile(file) {
    const regExp = /(mp4|move)$/gm;
    const match = file.match(regExp);
    return !!match;
}

function isCapturedFile(file) {
    const regExp = /(png|aae)$/gm;
    const match = file.match(regExp);
    return !!match;
}

function isDuplicatedFile(files, file) {
    if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
        return false
    }
    const edited = `IMG_E${file.split('_'[1])}`;
    const found = files.find((f) => f.includes(edited)); // 이름이 files 안에 있는지 없는지를 잡아냄
    return !!found;
}

function move(file, targetDir) {
    console.info(`move ${file} to ${path.basename(targetDir)}`);
    const oldPath = path.join(workingDir, file);
    const newPath = path.join(targetDir, file);
    fs.promises
    .rename(oldPath, newPath)
    .catch(console.error)
}