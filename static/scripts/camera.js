






const canvas = document.getElementById("canvas");
const turnON = document.getElementById("turnON");
const turnOFF = document.getElementById("turnOFF");
const download = document.getElementById("download");
const flipCamera = document.getElementById("flipCamera");
const startRecording = document.getElementById("startRecording");
const stopRecording = document.getElementById("stopRecording");


const camera = {
    canvas: null,
    video: null,
    stream: null,
    renderFrame: null,
    isRunning: false,
    isRunningReady: false,
    start: function(canvas, mirror = false) {
        if (this.isRunning) return;
        this.isRunning = true;
        this.canvas = canvas;
        this.video = document.createElement("video");
    
        navigator.mediaDevices
        navigator.mediaSession
        navigator.mediaCapabilities
        navigator.mediaDevices.getUserMedia({ video: true }).then(localStream => {
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
        }).catch(error => {
            if (error.name === "NotAllowedError" || error.name === "NotFoundError") {
                console.log("La cámara está apagada o no está disponible");
            } else {
                console.log("Error al acceder a la cámara: " + error);
            }
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
        if (!this.isRunning) {
          console.log("La cámara debe estar encendida para poder grabar.");
          return;
        }
      
        if (this.mediaRecorder) {
          console.log("La grabación ya se encuentra en progreso.");
          return;
        }
      
        if (!window.MediaRecorder) {
          console.log("El objeto MediaRecorder no está disponible en este navegador.");
          return;
        }
      
        try {
            const chunks = [];
            this.mediaRecorder = new MediaRecorder(this.stream);
            
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
        } catch (error) {
            console.log("Error al iniciar la grabación: " + error);
        }
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
});

stopRecording.addEventListener("click", function() {

});

flipCamera.addEventListener("click", function() {
    camera.flipCamera();
});
  
  
  














