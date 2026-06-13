//rafce
import React, { use, useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
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
        //console.log(files[i]);

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
    //console.log("e-target-files", e.target.files);
  };
  console.log("form", form);
  const handleDelete = (public_id) => {
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        console.log("filterImages", filterImages);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img src={item.url} alt="" className="w-24 h-24 hover:scale-110" />
            <span
              className="absolute top-0 right-0 bg-red-500 p-1 rounded-3xl"
              onClick={() => handleDelete(item.public_id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <div>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Upload Image
          <input
            type="file"
            className="hidden"
            onChange={handleOnChange}
            multiple
          />
        </label>
      </div>
    </div>
  );
};

export default UploadFile;
