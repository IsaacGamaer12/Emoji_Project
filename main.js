Webcam.set({
    width:350,
    height:350,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap( function(data_uri){
        document.getElementById("result").innerHTML = ' <img id="foto" src=" '  + data_uri + ' "/> ';
    } );
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SXbAakvwg/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model OK!");
}

function check(){
    img = document.getElementById('foto');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        prediccion_1 = results[0].label;
        prediccion_2 = results[1].label;

        if(results[0].label == "feliz"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if(results[0].label == "triste"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "enojado"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(results[1].label == "feliz"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "triste"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "enojado"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }

    }
}