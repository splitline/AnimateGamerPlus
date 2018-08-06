// utils
setStyle = (element, styles) => {
    for (s in styles) {
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
    `<p>動畫瘋 Plus 選單</p>
    <div id="off-light" class="item">開關燈</div>
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
            <input type="range" min="0.1" max="2" value="${speed}" step="0.1" class="slider" id="speed-slider">
            <span id="speed-val">${speed}</span>
        </div>
    </div>`;
setStyle(menu, {
    top: 0,
    left: 0,
});

// toggle menu
document.addEventListener('contextmenu', function (e) {
    let appended = !!document.getElementById("right-click-menu");
    if (e.target && e.target.id === 'ani_video_html5_api') {
        !appended && document.querySelector('#ani_video').appendChild(menu);

        // set context menu position
        let video = document.querySelector('#ani_video_html5_api');
        let videoPos = video.getBoundingClientRect();
        setStyle(menu, {
            display: 'block',
            top: (e.clientY - videoPos.y) + "px",
            left: (e.clientX - videoPos.x) + "px"
        });

        // set speed 
        let speedSlider = document.getElementById("speed-slider");
        !appended && speedSlider.addEventListener('input', (e) => {
            speed = speedSlider.value;
            video.playbackRate = speed;
            document.getElementById("speed-val").innerText = speed;
        });

        // on / off light
        let offLight = document.getElementById("off-light");
        !appended && offLight.addEventListener('click', (e) => {
            isOffLight = !isOffLight;
            setStyle(blackDiv, {
                display: isOffLight ? 'block' : 'none'
            })
            setStyle(
                document.querySelector('.player'), {
                    zIndex: isOffLight ? 777 : '',
                }
            )
        });

        // op skipper
        let opSkipper = document.querySelectorAll(".op-skipper");
        !appended && opSkipper.forEach(element => {
            element.addEventListener('click', (e) => {
                console.log(e.target.dataset.time);
                video.currentTime += e.target.dataset.time * 60;
            });
        });

        e.preventDefault();
    }
}, false);

window.addEventListener('click', function (e) {
    if (document.getElementById("right-click-menu"))
        setStyle(document.getElementById("right-click-menu"), { display: 'none' })
})
