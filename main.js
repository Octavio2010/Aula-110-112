var prediction_1 = ""
var prediction_2 = ""

Webcam.set({
    width:300,
    height:300,
    imageFormat:"png",
    pngQuality:90
})

camera = document.getElementById("webcam")

Webcam.attach("#webcam")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id = "Capturada" src = "'+data_uri+'"/>'
    })
    speak()
}

console.log("ml5_version",ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/woPY3z9s4/model.json",modelLoad)
function modelLoad(){
    console.log("Modelo carregado")
}

function speak(){
    var synth = window.speechSynthesis
    var  speakData1 = "A primeira previsão é" + prediction_1
    var  speakData2 = "A segunda previsão é" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speakData1+speakData2)
    synth.speak(utterThis)
}