import {
  Button,
  Container,
  Grid,
  Input,
  Dropdown,
  Textarea,
  Text,
  Radio,
  Modal,
  Loading,
  Row,
} from "@nextui-org/react";
import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { supabase } from "../../../../utils/supabaseClient";
import { useRouter } from "next/router";

export default function SubmitAssignmentForm({}) {
  const router = useRouter()

  const id = router.query.id;
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState(
    "Looks like there's nothing wrong here!"
  );

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [description, setDescription] = React.useState();
  const [files, setFiles] = React.useState([]);

  const [loading, setUploading] = React.useState(false);

  const resetForm = () => {
    setDescription("");
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    try {
      const inputData = {
        description: description,
        upload: files,
        student_id: 123,
        assignment_id: id,
      };

      let { error } = await supabase
        .from("Assignments_Submissions")
        .insert([inputData]);

      if (error) throw error;

      setMessage("Assignment Submitted successfully!");
      setVisible(true);
      resetForm();
    } catch (error) {
      setMessage(error.message);
      setVisible(true);
      console.log(error);
    } finally {
    }
  };

  const handleUpload = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `/public/new/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      setFiles([...files, filePath]);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ m: 16 }}
      >
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={resetForm}>
            Reset
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <form>
        <Grid.Container gap={1} justify="start">
          <Grid xs={8}>
            <Textarea
              label="Description:"
              placeholder="Description: "
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              bordered
              auto
              onClick={() => document.getElementById("upload").click()}
            >
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                name="upload"
                onChange={handleUpload}
                disabled={loading ? true : false}
              />
              {loading ? <Loading type="points-opacity" /> : "Upload"}
            </Button>
          </Grid>
          <Grid xs={12}>
            <Gallery withDownloadButton>
              {files.map((url, index) => {
                return (
                  <>
                  <Item
                  
                    original={
                      "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                      url
                    }
                    height={500}
                    width={500}
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref}
                        onClick={open}
                        src={
                          "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                          url
                        }

                        style={{ width: "18%", margin: "1%", borderRadius: 10 }}
                      />
                    )}
                  </Item>
                  <Button css={{position: 'relative',
right: '40px'}} flat auto onClick={() => { setFiles(files.filter((url) => url != files[index]))}}>x</Button>
                  </>
                );
              })}
            </Gallery>
          </Grid>
          <Grid xs={12}>
            <Button onClick={handleSubmit} disabled={loading}>Submit</Button>
          </Grid>
        </Grid.Container>
      </form>
    </div>
  );
}
