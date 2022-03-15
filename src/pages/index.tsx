import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onHandleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    return false;
  };

  const uploadFile = async (signedUrl: string): Promise<void> => {
    await axios.put(signedUrl, selectedFile, {
      headers: {
        "Content-Type": selectedFile.type,
      },
    });
  };

  const onHandleSubmit = async () => {
    try {
      const res = await axios.post("/api/storage/signedurl", {
        name: selectedFile.name,
        size: selectedFile.size,
      });
      await uploadFile(res.data.url);
    } catch (err) {
      return;
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="uploadimage">Choose file to upload</label>
        <input
          type="file"
          accept=".png"
          name="uploadimage"
          onChange={onHandleChange}
        />
      </div>
      <button onClick={onHandleSubmit}>Upload</button>
    </div>
  );
};

export default Home;
