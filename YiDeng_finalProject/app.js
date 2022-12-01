const electronicDrum = () => {
  const e = document.querySelectorAll(".pad");
  for(let i = 0;i<e.length;i++){
    e[i].style.background = 'radial-gradient(#fab1ed, #fad9f4)'
  }
  var icon = document.getElementById("img8");
  icon.src = "./icons/fx.png";
  var sb = document.querySelectorAll(".stylebutton");
  for(let i = 0;i<sb.length;i++){
    sb[i].style.background = '#fad9f4'
  }
  const dom1 = document.getElementById("d1");
  dom1.getAttributeNode("data-sound").value = "e-clap";
  const dom2 = document.getElementById("d2");
  dom2.getAttributeNode("data-sound").value = "e-snare";
  const dom3 = document.getElementById("d3");
  dom3.getAttributeNode("data-sound").value = "e-kick";
  const dom4 = document.getElementById("d4");
  dom4.getAttributeNode("data-sound").value = "e-tom";
  const dom5 = document.getElementById("d5");
  dom5.getAttributeNode("data-sound").value = "e-crash";
  const dom6 = document.getElementById("d6");
  dom6.getAttributeNode("data-sound").value = "e-hihatclose";
  const dom7 = document.getElementById("d7");
  dom7.getAttributeNode("data-sound").value = "e-hihatopen";
  const dom8 = document.getElementById("d8");
  dom8.getAttributeNode("data-sound").value = "e-fx";
}

const acousticDrum = () => {
  const a = document.querySelectorAll(".pad");
  for(let i = 0;i<a.length;i++){
    a[i].style.background = 'radial-gradient(#fcba03, #fc9d03)'
  }
  var icon = document.getElementById("img8");
  icon.src="./icons/tom-high.png";
  var sb = document.querySelectorAll(".stylebutton");
  for(let i = 0;i<sb.length;i++){
    sb[i].style.background = '#fcba03'
  }
  const dom1 = document.getElementById("d1");
  dom1.getAttributeNode("data-sound").value = "a-clap";
  const dom2 = document.getElementById("d2");
  dom2.getAttributeNode("data-sound").value = "a-snare";
  const dom3 = document.getElementById("d3");
  dom3.getAttributeNode("data-sound").value = "a-kick";
  const dom4 = document.getElementById("d4");
  dom4.getAttributeNode("data-sound").value = "a-tomlow";
  const dom5 = document.getElementById("d5");
  dom5.getAttributeNode("data-sound").value = "a-crash";
  const dom6 = document.getElementById("d6");
  dom6.getAttributeNode("data-sound").value = "a-hihatclose";
  const dom7 = document.getElementById("d7");
  dom7.getAttributeNode("data-sound").value = "a-hihatopen";
  const dom8 = document.getElementById("d8");
  dom8.getAttributeNode("data-sound").value = "a-tomhigh";
}

const drumSound = new Howl({
  "src": [
    "./drumSound/drumSound.webm",
    "./drumSound/drumSound.mp3"
  ],
  "sprite": {
    "a-clap": [
      0,
      594.37641723356
    ],
    "a-crash": [
      2000,
      5540.022675736961
    ],
    "a-hihatclose": [
      9000,
      481.4965986394561
    ],
    "a-hihatopen": [
      11000,
      1723.2653061224496
    ],
    "a-kick": [
      14000,
      699.9546485260772
    ],
    "a-snare": [
      16000,
      605.1020408163267
    ],
    "a-tomhigh": [
      18000,
      1204.2857142857138
    ],
    "a-tomlow": [
      21000,
      823.4013605442171
    ],
    "e-clap": [
      23000,
      319.61451247165587
    ],
    "e-crash": [
      25000,
      2417.5736961451266
    ],
    "e-fx": [
      29000,
      858.5034013605436
    ],
    "e-hihatclose": [
      31000,
      178.61678004535264
    ],
    "e-hihatopen": [
      33000,
      412.8117913832199
    ],
    "e-kick": [
      35000,
      190.9977324263039
    ],
    "e-snare": [
      37000,
      181.85941043083886
    ],
    "e-tom": [
      39000,
      564.3990929705183
    ]
  }
});

  const drumkit = document.querySelector('.drumkit');

  function playDrum(event) {
    if (event.target.classList.contains("pad")) {
        event.preventDefault();
        let soundToPlay = event.target.dataset.sound;
        drumSound.play(soundToPlay);
    }
  }

  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setViewportHeight();

  window.addEventListener('resize', () => {
    setTimeout(setViewportHeight, 100);
  });

  drumkit.addEventListener('click', playDrum);
  drumkit.addEventListener('touchstart', playDrum);
  
  
  const recordBtn = document.querySelector('#record');
  // 获取audio
  const audio = document.querySelector('#audio');

  const audioStream = {
    status: false, // 录音状态
    streams: [], // 用于存储录音stream
    blob: null, // stream转换成的blob
  };

  // MediaRecorder实例
  let mediaRecorder = null;

  // 给录音按钮添加点击事件
  recordBtn.addEventListener('click', async (e) => {
    // 判断录音状态
    if (audioStream.status) {
      controlMediaRecorder()
    } else {
      // 判断mediaRecorder是否存在
      mediaRecorder ? controlMediaRecorder() : getpermission()
    }
  });

  // 获取权限
  function getpermission() {
    // audio 音频 | video 视频
    const constraints = { audio: true, video: false }
    navigator.mediaDevices.getUserMedia(constraints).then((MediaStream) => {
      // 获取成功 得到媒体流 MediaStream 并实例一个MediaRecorder对象
      mediaRecorder = new MediaRecorder(MediaStream);
      mediaRecorder.addEventListener('dataavailable', onDataavailable)
      mediaRecorder.addEventListener('stop', onStop)
      controlMediaRecorder()
    }).catch((error) => {
      // 获取失败
      console.error(error);
    })
  };

  // 控制MediaRecorder
  function controlMediaRecorder() {
    // 判断录音状态
    // inactive 休息  |  recording 录音中  |  paused 暂停
    if (mediaRecorder.state == 'inactive') {
      // 开始录制将之前的录音清空 
      alert('1234')
      audioStream.streams = []
      // 释放内存
      if (audioStream.blob) {
        URL.revokeObjectURL(audioStream.blob)
        audioStream.blob = null
      }

      mediaRecorder.start(1000)
      recordBtn.innerText = 'Stop Recording'
      audioStream.status = true
      console.log("开始录制---");
    } else {
      mediaRecorder.stop()
      recordBtn.innerText = 'Start Recording'
      audioStream.status = false
      console.log("结束录制---");
    }
  };

  // 监听stop事件
  function onStop() {
    // 将audioStream.streams转换为地址
    audioStream.blob = new Blob(audioStream.streams, { type: audioStream.streams[0].type })
    audio.src = URL.createObjectURL(audioStream.blob)
  };

  /**
   * 监听录音dataavailable事件
   * 触发条件
   * 1. 媒体流结束时
   * 2. 调用stop()
   * 3. 调用requestData()
   * 4. 调用start(timeslice)  每隔 timeslice 毫秒触发一次 dataavailable事件
  */
  function onDataavailable(event) {
    // event.data blob对象
    audioStream.streams.push(event.data)
  };
