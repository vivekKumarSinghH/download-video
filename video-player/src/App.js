import './App.css';
import { useEffect, useState } from 'react';
import DataTable from './Table';
import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
function App() {
  const [fileNames, setFileNames] = useState([])
  const zip = new JSZip();

  const download = (item) => {
    return axios.get(`http://180.151.22.222:93/videos/2022-09-14/${item.file_name}`, { responseType: "blob" }).then((resp) => {
      zip.file(item.file_name, resp.data);
    });
  };

  const downloadAll = () => {
    const arrOfFiles = fileNames.map((item) => download(item)); //create array of promises
    Promise.all(arrOfFiles)
      .then(() => {
        //when all promises resolved - save zip file
        zip.generateAsync({ type: "blob" }).then(function (blob) {
          saveAs(blob, "hello.zip");
        });
      })
      .catch((err) => {
        console.log("error",err);
      });
  };

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("date", "2022-09-14");

    var requestOptions = {
      method: 'POST',
      headers: { "key": "iScGWSNMdNQNPtcrgLpuOUoxooZbnLzibbZqkMwrekgKMUvYBNJuPlbQicPnOjbrYCMlFs" },
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://180.151.22.222:8055/video_log/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setFileNames(result.data)
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <div className="App"  style={{textAlign:"center"}}>
      <IconButton onClick={() => downloadAll()}>
          <ArrowDownwardIcon fontSize='large' />
          Download ALL
      </IconButton>
      <DataTable fileNames={fileNames} />
    </div>
  );
}

export default App;
