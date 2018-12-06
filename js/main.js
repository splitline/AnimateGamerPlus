'use strict'

// utils
const setStyle = (element, styles) => {
    for (var s in styles) {
        element.style[s] = styles[s];
    }
};

let speed = 1, isOffLight = false;

let blackDiv = document.createElement("div");
blackDiv.id = "black-layer";
setStyle(blackDiv, {
    display: 'none'
});
document.body.appendChild(blackDiv);

// right click menu
let menu = document.createElement('div');
menu.id = "right-click-menu";
menu.innerHTML =
    `<p style="font-weight:bold;">動畫瘋 Plus 選單</p>
<div id="off-light" class="item">開關燈</div>
<div id="PiP" class="item">切換子母畫面</div>
<div class="multi-option">
    <div>
        跳 OP 
    </div>
    <div class="option-container">
        <button class="op-skipper" data-time="1.5">+1:30</button>
        |
        <button class="op-skipper" data-time="0.5">+0:30</button>
        <button class="op-skipper" data-time="1.0">+1:00</button>
        <button class="op-skipper" data-time="2.0">+2:00</button>
        <button class="op-skipper" data-time="2.5">+2:30</button>
    </div>
</div>
<div class="multi-option">
    <div>
        播放速度 
    </div>
    <div class="option-container">
        <input type="range" min="0.5" max="2" value="${speed}" step="0.1" class="slider" id="speed-slider">
        <span id="speed-val">${speed}</span>

        <button id="reset-speed">Reset</button>
    </div>
</div>`;

setStyle(menu, {
    top: 0,
    left: 0,
});

// toggle menu
document.addEventListener('contextmenu', function (e) {
    if (e.target && e.target.id === 'ani_video_html5_api') {
        if (document.webkitCurrentFullScreenElement) {
            if (!document.getElementById("ani_video").querySelector('#right-click-menu')) {
                menu = document.getElementById('right-click-menu');
                document.getElementById("ani_video").appendChild(menu);
            }

            // set context menu position
            setStyle(menu, {
                display: 'block',
                top: (e.clientY) + "px",
                left: (e.clientX) + "px"
            });
        } else {
            if (document.getElementById("ani_video").querySelector('#right-click-menu')) {
                menu = document.getElementById('right-click-menu');
                document.body.appendChild(menu);
            }

            // set context menu position
            setStyle(menu, {
                display: 'block',
                top: (e.pageY) + "px",
                left: (e.pageX) + "px"
            });
        }

        e.preventDefault();
    }
}, false);

const hideContextMenu = (e) => {
    setStyle(document.getElementById("right-click-menu"), { display: 'none' })
}

window.addEventListener('mousedown', function (e) {
    if (e.target.id == "ani_video_html5_api"
        && event.which == 1
        && document.getElementById("right-click-menu")
        && document.getElementById("right-click-menu").style.display === "block") {
        e.target.paused ? e.target.play() : e.target.pause();
    }
    if (e.path.every(p => p.id !== "right-click-menu")
        && document.getElementById("right-click-menu"))
        hideContextMenu(e);
})

window.onload = () => {
    chrome.storage.sync.get({
        ncc: true,
        autoNext: true
    }, function (items) {
        if (items.ncc) {
            window.ncc_check = setInterval(function () {
                if (document.querySelector(".ncc-choose-btn")) {
                    document.getElementById('adult').click();
                    clearInterval(window.ncc_check);
                }
            }, 750);
        }

        if (items.autoNext) {
            
        }
    });


    // Init context menu

    document.body.appendChild(menu);
    menu.style.display = 'none';
    const video = () => document.getElementById('ani_video_html5_api');


    // set speed 
    document.getElementById("speed-slider").oninput = (e) => {
        speed = e.target.value;
        video().playbackRate = speed;
        document.getElementById("speed-val").innerText = speed;
    };
    document.getElementById("reset-speed").onclick = (e) => {
        document.getElementById("speed-val").innerText
            = document.getElementById("speed-slider").value
            = video().playbackRate
            = speed
            = 1;
        hideContextMenu(e);
    };

    // on / off light
    document.getElementById("off-light").onclick = (e) => {
        isOffLight = !isOffLight;
        setStyle(document.querySelector("div.video"), {
            zIndex: isOffLight ? 777 : '',
        });
        setStyle(blackDiv, {
            display: isOffLight ? 'block' : 'none'
        })
        hideContextMenu(e);
    };

    // Picture in picture
    document.getElementById("PiP").onclick = (e) => {
        if (document.pictureInPictureEnabled) {
            if (!document.pictureInPictureElement) {
                video().requestPictureInPicture()
                    .catch(error => console.error(error));
            } else {
                document.exitPictureInPicture()
                    .catch(error => console.error(error));
            }
        } else {
            alert("你的瀏覽器不支援此功能 QQ");
        }
        hideContextMenu(e);
    };

    // op skipper
    document.querySelectorAll(".op-skipper")
        .forEach(element => {
            element.onclick = (e) => {
                video().currentTime += e.target.dataset.time * 60 - 3;
                hideContextMenu(e);
            };
        });
}