import { Button, Grid, Input } from "@nextui-org/react";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProfileContainer({}) {

  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [batch, setBatch] = useState();
  const [editOption, setEditOption] = useState(true);

  const user = useUser();
  const session = useSession();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          let { data, error, status } = await supabase
            .from("Users")
            .select(` id, email, teacher, name, phone, batch ( shift, grade ) `)
            .eq("email", user.email)
            .single();

          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setId(data.id);
            setEmail(data.email);
            setPhone(data.phone);
            setName(data.name);
            setBatch(data.batch.grade + 'ᵗʰ ' + data.batch.shift)
          }
        } catch (error) {
          alert("Error loading user data!");
        } finally {
        }
      })();
    }
  }, [session]);
  return (
    <>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Input type={"text"} labelLeft="ID" value={id} readOnly />
        </Grid>
        <Grid xs={12}>
          <Input type={"text"} labelLeft="Email" value={email} readOnly />
        </Grid>
        <Grid xs={12}>
          <Input
            type={"text"}
            labelLeft="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={editOption}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            type={"tel"}
            labelLeft="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={editOption}
            maxLength={12}
          />
        </Grid>
        <Grid xs={12}>
          <Input type={"text"} labelLeft="Batch" value={batch} readOnly />
        </Grid>
      </Grid.Container>
      {/* <Button onClick={toggleEdit}> {editOption ? "Edit" : "Cancel"} </Button> */}
    </>
  );
}
