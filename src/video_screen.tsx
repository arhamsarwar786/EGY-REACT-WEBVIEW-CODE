import { useState, ChangeEvent } from 'react';
import axios from 'axios';

function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        let order = urlParams.get("order");
        let formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('playlistId', `${id}`);
        formData.append('order', `${order}`);
        
        setLoading(true);
        const response = await axios.post('http://3.80.91.77:3000/api/video/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setLoading(false);
        console.log('File uploaded:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <>{
        
        isLoading ? <h1>Uploading Please Wait...</h1> : 

        <div>
        
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedFile && (
        <video width="100%" height="80%" controls>
          <source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} />
        </video>
      )}
      {selectedFile && (
        <button onClick={handleUpload}>Upload Video</button>
      )}
    </div>}
    </>
  );
}

export default VideoUploader;
