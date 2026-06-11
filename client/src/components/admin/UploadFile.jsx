//rafce
import React, { use, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";

const UploadFile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; //[] empty array
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error("File " + file.name + " is not an image");
          continue;
        }
        Resizer.default.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("upload iamge sucess");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64",
        );
      }
    }
    console.log(e.target.files);
  };
  return (
    <div>
      <input onChange={handleOnChange} type="file" name="images" multiple />
    </div>
  );
};

export default UploadFile;
