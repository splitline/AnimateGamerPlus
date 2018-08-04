console.log("owo)/")

// utils
setStyle = (element, styles) => {
    for (s in styles) {
        element.style[s] = styles[s];
    }
}

// right click menu
let menu = document.createElement('div');
menu.id = "right-click-menu";
menu.innerHTML =
    `<p>動畫瘋 Plus 選單</p>
    <div id="off-light" class="item">關燈</div>
    <div id="loop" class="item">循環播放</div>
    <div class="multi-option">
        <div>
            播放速度 
        </div>
        <div class="option-container">
            <button>正常</button>
            <button>1.25</button>
            <button>1.5</button>
            <button>2</button>
        </div>
    </div>`;
setStyle(menu, {
    backgroundColor: 'white',
    top: 0,
    left: 0,
});


// toggle menu
document.addEventListener('contextmenu', function (e) {
    if (e.target && e.target.id === 'ani_video_html5_api') {
        document.querySelector('#ani_video').appendChild(menu);

        let video = document.querySelector('#ani_video_html5_api');
        let videoPos = video.getBoundingClientRect();
        setStyle(menu, {
            display: 'block',
            top: (e.clientY - videoPos.y) + "px",
            left: (e.clientX - videoPos.x) + "px"
        });
        e.preventDefault();
    }
}, false);

window.addEventListener('click', function (e) {
    if (document.getElementById("right-click-menu"))
        setStyle(document.getElementById("right-click-menu"), { display: 'none' })
})