song1 = "";
song2 = "";
leftWristX = "";
rightWristX = "";
leftWristY = "";
rightWristY = "";
songStatus = "";


function preload()
{
    song1 = loadSound("Taylor Swift - Delicate.mp3");
    song2 = loadSound("NewJeans-Hype-Boy-24-Najjamuzic-com.mp3");
}
function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("poseNet has been initialized!");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWrist = "+leftWristX+"leftWristY = "+leftWristY);
        console.log("rightWrist = "+rightWristX+"rightWristY = "+rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
    }
}


function draw()
{
    image(video,0,0,500,500);
    song1Status = "";
    fill("#e0cc12");
    stroke("#e0cc12");
    
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if (song1Status == false)
        {
            song1.play();
            document.getElementById("song1").innerHTML = "Song = " + song1;
        }
     }
}