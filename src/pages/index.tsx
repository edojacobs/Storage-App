import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Wrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  width: 250px;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  border: 2px solid #1aa1e5;
`;

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
    <Container>
      <Wrapper>
        <div>
          <input
            type="file"
            accept=".png"
            name="uploadimage"
            onChange={onHandleChange}
          />
        </div>
        <Button onClick={onHandleSubmit}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Home;
