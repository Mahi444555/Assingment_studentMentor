import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import VideoRecorder from 'react-video-recorder'; // For UI components (optional)
import axios from 'axios';

function ScreenRecorder() {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
      video: true, // Enable video recording
      screen: true, // Capture the screen
    });

    // const handleUpload = async () => {
    //   if (mediaBlobUrl) {
    //     const formData = new FormData();
    //     formData.append('video', new Blob([mediaBlobUrl]));
  
    //     try {
    //       await fetch('http://localhost:5000/api/upload', {  //"http://localhost:5000/api/users"
    //         method: 'POST',
    //         body: formData,
    //       });
    //       console.log('Video uploaded successfully.');
    //     } catch (error) {
    //       console.error('Error uploading video:', error);
    //     }
    //   } else {
    //     console.log('No recorded video to upload.');
    //   }
    // };
// 

const handleUpload = async () => {
  if (mediaBlobUrl) {
    const formData = new FormData();
    formData.append('video', new Blob([mediaBlobUrl]));

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video uploaded successfully.');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        console.error('Error uploading video:', error.response.data.message);
      } else {
        console.error('An unexpected error occurred while uploading the video:', error);
      }
    }
  } else {
    console.log('No recorded video to upload.');
  }
};

// 
    return (
      <div>
        {/* Optional UI components */}
        <h1 style={{'color':'green'}}>Screen Recorder</h1>
        <VideoRecorder 
          onRecordingComplete={(videoBlob) => {
            // Handle the recorded video
            console.log('Video Blob:', videoBlob);
          }}
        />
  
        {/* Display status and buttons */}
        <p>Status: {status}</p>
        {status !== 'recording' ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
  


        {/* Display the recorded video */}
        <h1 style={{'color':'blue'}}>recorded screen</h1>
        {mediaBlobUrl && <video style={{'height': '400px', 'width':'800px', 'border':'5px solid black'}} src={mediaBlobUrl} controls autoPlay />}
     
      {/* Upload Video button */}
      <button style={{"color":"red", 'fontFamily':"cursive"}} onClick={handleUpload}>Upload Video</button>
   
     
        </div>
    );
  }
  
  export default ScreenRecorder;
  