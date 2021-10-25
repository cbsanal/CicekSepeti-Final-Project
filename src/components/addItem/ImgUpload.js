import { useDropzone } from "react-dropzone";
import { upload1x, upload2x, imgDelete } from "../../assets";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ImgUpload = ({ imgUrl, setImgUrl }) => {
  const [loadingProcess, setLoadingProcess] = useState(0);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: "image/png, image/jpeg, image/jpg",
    maxSize: 400 * 1024, //400kb
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (files.length !== 0) {
      const token = Cookies.get("jwt");
      const formData = new FormData();
      formData.append("file", files[0]);
      /* fetch does not showing progress and I do not want to download axios for only progress bar, 
      this is why I use xml. uploading image to the server before user publish the product
      is not logical since that image stays in the server even though user delete it in client
      but I need to do with this way in order to have a progress bar */
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://bootcampapi.techcs.io/api/fe/v1/file/upload/image"
      );
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Accept", "*/*");
      xhr.upload.addEventListener("progress", (e) => {
        setLoadingProcess(Math.round((e.loaded / e.total) * 100));
      });
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
          const res = JSON.parse(this.responseText);
          setImgUrl(res.url);
        }
        if (this.readyState === 4 && this.status !== 201) {
          toast.error("Hata oluştu, lütfen tekrar deneyin.");
          setFiles([]);
          setLoadingProcess(0);
        }
      };
      xhr.send(formData);
    }
  }, [files]);

  useEffect(() => {
    if (fileRejections.length !== 0) {
      if (fileRejections[0].errors[0].code === "file-too-large")
        toast.error("Lütfen max. 400kb boyutunda bir dosya yükleyin.");
      if (fileRejections[0].errors[0].code === "too-many-files")
        toast.error("Maksimum 1 resim yükleyebilirsiniz.");
      if (fileRejections[0].errors[0].code === "file-invalid-type")
        toast.error("Lütfen PNG,  JPG veya JPEG türünde dosya yükleyiniz.");
      fileRejections.length = 0;
    }
  }, [fileRejections]);

  return (
    <>
      {imgUrl && (
        <div className="item-img-preview">
          <img src={files[0].preview} alt="ürün-resmi" />
          <img
            src={imgDelete}
            alt="resmi-sil"
            onClick={() => {
              setImgUrl(false);
              setFiles([]);
              setLoadingProcess(0);
            }}
            className="img-delete"
          />
        </div>
      )}
      {!imgUrl && (
        <div className="img-upload-container">
          {files.length === 0 && (
            <div className="file-input-container" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="img-wrapper">
                <img
                  srcSet={`${upload1x}, ${upload2x} 2x`}
                  src={upload1x}
                  alt="resim-yükle"
                />
              </div>
              <span>Sürükleyip bırakarak yükle</span>
              <span>veya</span>
              <span className="select-img">Görsel seçin</span>
              <span>PNG, JPG ve JPEG Dosya boyutu max. 400kb</span>
            </div>
          )}
          {loadingProcess !== 0 && (
            <div className="progress-bar-container">
              <span>{loadingProcess}%</span>
              <div className="progress-bar">
                <div
                  style={{ width: `${loadingProcess}%` }}
                  className="progress"
                ></div>
              </div>
              <span>Yükleniyor</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImgUpload;
