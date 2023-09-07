
import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useRecordWebcam } from 'react-record-webcam';

const OPTIONS = {
  filename: 'test-filename',
  fileType: 'mp4',
  width: 800,
  height: 1080,
};

export default function WebCam() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const recordWebcam = useRecordWebcam(OPTIONS);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    facingMode: { exact: 'environment' },
  });

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setPermissionGranted(true);
        recordWebcam.open();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermissionGranted(false);
    }
  };

  return (
    <div>
      <h1 style={{"color":"red", "textAlign":"center"}}>My webcam</h1>
      <p style={{"color":"blue"}}>Camera status: {recordWebcam?.status || 'Not Available'}</p>
      <div>
        {!permissionGranted ? (
          <button onClick={requestPermission}>Request Permission</button>
        ) : (
          <>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
          </>
        )}
      </div>

      {permissionGranted && (
        <><div style={{"height": "700px", "width":"700px"}}>
          <video style={{"backgroundColor":"pink","position":'relative', "justifyContent":"center"}}
            ref={recordWebcam?.webcamRef}
            autoPlay
            muted
          />
          <video 
            ref={recordWebcam?.previewRef}
            controls
          />
          </div>
        </>
      )}

      <p style={{"color":"red"}}>Status: {status}</p>
     
      <video src={mediaBlobUrl} controls autoPlay loop />
      <hr/>
    </div>
  );
}

