









const canvas = document.getElementById("canvas");
const turnON = document.getElementById("turnON");
const turnOFF = document.getElementById("turnOFF");
const download = document.getElementById("download");
const flipCamera = document.getElementById("flipCamera");
const startRecording = document.getElementById("startRecording");
const stopRecording = document.getElementById("stopRecording");
const toogleMicrofone = document.getElementById("toogleMicrofone");
const toogleVideo = document.getElementById("toogleVideo");
const pauseResumeRecording = document.getElementById("pauseResumeRecording");
const showTime = document.getElementById("recording-time");


const camera = {
    canvas: null,
    video: null,
    stream: null,
    renderFrame: null,
    isRunning: false,
    isRunningReady: false,
    start: function(canvas, mirror = false) {
        if (this.isRunning){ 
            console.log("La camara se encuentra en uso.")
            return;
        } 
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.log("La API de getUserMedia no es compatible con este navegador");
            return;
        }    

        this.isRunning = true;
        this.canvas = canvas;
        this.video = document.createElement("video");
    
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(localStream => {
            this.stream = localStream;
    
            this.video.srcObject = localStream;
            this.video.play();
    
            this.video.addEventListener("loadedmetadata", () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
    
                const context = this.canvas.getContext("2d");
                
                if (mirror) {
                    context.translate(this.canvas.width, 0);
                    context.scale(-1, 1);
                }
                
                this.renderFrame = () => {
                    if (this.canvas) {
                        context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
                        requestAnimationFrame(this.renderFrame);
                        this.isRunningReady = true;
                    }
                };
    
                requestAnimationFrame(this.renderFrame);
            });
        });
    },
    stop: function() {
        if (!this.canvas) return;
        else{
            while(this.isRunning && this.isRunningReady){
                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                    this.video.pause();
                    cancelAnimationFrame(this.renderFrame);
                    this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
            
                    this.stream = null;
                    this.video = null;
                    this.renderFrame = null;
                    this.canvas = null;
                }
                this.isRunning = false;
                this.isRunningReady = false;
            }
        }
    },
    download: function() {
        if (this.isRunning) {
            if (!this.stream) {
                console.log("Se requiere permiso para acceder a la cámara.");
                return;
            }

            if (!this.canvas || !this.video.srcObject) {
                console.log("La cámara no está capturando ninguna imagen.");
                return;
            }
            const canvas = this.canvas;
            const downloadLink = document.createElement("a");
        
            const now = new Date();
            const fileName = `picture_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.png`;
        
            downloadLink.setAttribute("download", fileName);
            const canvasData = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            downloadLink.setAttribute("href", canvasData);
        
            if (!downloadLink.href) {
                console.log("No se pudo crear el enlace de descarga.");
                return;
            }
        
            downloadLink.click();
        } else {
          console.log("La cámara debe estar encendida para poder descargar una foto");
        }
    },
    flipCamera: function() {
        if (!this.stream) {
            console.log("Se requiere permiso para acceder a la cámara.");
            return;
        }
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoDevices.length < 2) {
                    console.log("No se encontraron suficientes dispositivos de cámara.");
                    return;
                }
                const currentDeviceId = this.stream.getTracks()[0].getSettings().deviceId;
                const nextDeviceId = videoDevices.find(device => device.deviceId !== currentDeviceId).deviceId;
                const constraints = { video: { deviceId: { exact: nextDeviceId } } };
                return navigator.mediaDevices.getUserMedia(constraints);
            })
            .then(localStream => {
                this.stream = localStream;
                this.video.srcObject = localStream;
                this.video.play();
            })
            .catch(error => console.log("Error al alternar entre cámaras: " + error));
    },
    startRecording: function() {
        
        if (this.mediaRecorder) {
            console.log("La grabación ya se encuentra en progreso.");
            return;
        }
    
        if (!window.MediaRecorder) {
            console.log("El objeto MediaRecorder no está disponible en este navegador.");
            return;
        }

        if (!this.isRunning) {
            console.log("La cámara debe estar encendida para poder grabar.");
            return;
        }

        if (!this.isRunningReady) {
            console.log("Espere a que carguen los datos.");
            
            if(this.isRunningReady){
                console.log()
            }
            return;
        }
    
        try {
            const chunks = [];
            const constraints = { audio: true, video: true };
            navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    
                this.mediaRecorder.addEventListener("dataavailable", event => {
                    chunks.push(event.data);
                });
    
                this.mediaRecorder.addEventListener("stop", () => {
                    const blob = new Blob(chunks, { type: "video/mp4" });
                    const url = URL.createObjectURL(blob);
    
                    const downloadLink = document.createElement("a");
                    downloadLink.setAttribute("href", url);
                    downloadLink.setAttribute("download", "recording.mp4");
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
    
                    downloadLink.click();
    
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                        document.body.removeChild(downloadLink);
                    }, 100);
    
                    this.mediaRecorder = null;
                });
    
                this.mediaRecorder.start();
                console.log("La grabación ha comenzado.");
            })
            .catch((error) => {
                console.log("Error al obtener el acceso a la cámara y/o micrófono: " + error);
            });
        } catch (error) {
            console.log("Error al iniciar la grabación: " + error);
        }
    },
    stopRecording: function() {
        if (!this.mediaRecorder) {
          console.log("No hay grabación en progreso para detener.");
          return;
        }
      
        this.mediaRecorder.stop();
        console.log("La grabación se ha detenido.");
    },
    toggleAudio: function() {
        if (!this.stream) {
            console.log("Aun no se ha activado la cámara.");
            return;
        }
      
        const audioTracks = this.stream.getAudioTracks();
      
        if (audioTracks.length === 0) {
          console.log("La cámara no tiene pistas de audio");
          return;
        }
      
        const audioTrack = audioTracks[0];
        const enabled = audioTrack.enabled;
      
        audioTrack.enabled = !enabled;
      
        console.log(`El audio de la cámara ahora está ${audioTrack.enabled ? "activado" : "desactivado"}`);
    },   
    toggleVideo: function() {
        if (!this.video) {
            console.log("No existe transmicion de datos de la cámara.");
            return;
        } 
      
        const videoTrack = this.stream.getVideoTracks()[0];
        const enabled = videoTrack.enabled;
      
        videoTrack.enabled = !enabled;
      
        console.log(`El video de la cámara ahora está ${videoTrack.enabled ? "activado" : "desactivado"}`);
    },
    pauseResumeRecording: function() {
        if (!this.mediaRecorder) {
            console.log("No hay grabación en progreso para pausar/reanudar.");
            return;
        }

        if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.pause();
            console.log("La grabación se ha pausado.");
        } else if (this.mediaRecorder.state === 'paused') {
            this.mediaRecorder.resume();
            console.log("La grabación se ha reanudado.");
        }
    },
    showRecordingTime: function(element) {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let t;
    
        const add = function() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            element.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                                    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                                    (seconds > 9 ? seconds : "0" + seconds);
    
            t = setTimeout(add, 1000);
        };
    
        add();
    },
    
};
  
turnOFF.addEventListener("click", function() {
    camera.stop();
});

turnON.addEventListener("click", function() {
    camera.start(canvas, true);
});

download.addEventListener("click", function() {
    camera.download();
});

startRecording.addEventListener("click", function() {
    camera.startRecording();
    camera.showRecordingTime(showTime);
});

stopRecording.addEventListener("click", function() {
    camera.stopRecording();
});

flipCamera.addEventListener("click", function() {
    camera.flipCamera();
});

toogleMicrofone.addEventListener("click", function() {
    camera.toggleAudio();
});
  
toogleVideo.addEventListener("click", function() {
    camera.toggleVideo();
});

pauseResumeRecording.addEventListener("click", function() {
    camera.pauseResumeRecording();
});

  














