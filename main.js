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
function Check(){
    img = document.getElementById("Capturada")
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("ResultEmotionName").innerHTML=results[0].label
        document.getElementById("ResultEmotionName2").innerHTML=results[1].label

        prediction_1=results[0].label
        prediction_2=results[1].label

        speak()

        if(results[0].label=="feliz"){
            document.getElementById("UpdateEmoji").innerHTML="&#128522"
        }
        if(results[0].label=="triste"){
            document.getElementById("UpdateEmoji").innerHTML="&#128532"
        }
        if(results[0].label=="chorando"){
            document.getElementById("UpdateEmoji").innerHTML="&#128546"
        }
        if(results[0].label=="bravo"){
            document.getElementById("UpdateEmoji").innerHTML="&#128545"
        }

        
        if(results[1].label=="feliz"){
            document.getElementById("UpdateEmoji2").innerHTML="&#128522"
        }
        if(results[1].label=="triste"){
            document.getElementById("UpdateEmoji2").innerHTML="&#128532"
        }
        if(results[1].label=="chorando"){
            document.getElementById("UpdateEmoji2").innerHTML="&#128546"
        }
        if(results[1].label=="bravo"){
            document.getElementById("UpdateEmoji2").innerHTML="&#128545"
        }
    }
}