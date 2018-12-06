document.getElementById('save')
    .addEventListener('click', () => {
        chrome.storage.sync.set({
            ncc: document.getElementById('ncc').checked,
            autoNext: document.getElementById('next').checked
        }, () => {
            var status = document.getElementById('status');
            status.textContent = '設定已儲存';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });
    });

const restore_options = () => {
    chrome.storage.sync.get({
        ncc: true,
        autoNext: true
    }, function (items) {
        document.getElementById('ncc').checked = items.ncc;
        document.getElementById('next').checked = items.autoNext;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);