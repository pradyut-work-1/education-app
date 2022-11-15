import { Button, Grid, Input } from "@nextui-org/react";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProfileInfoBlock({}) {

  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [batch, setBatch] = useState();

  const user = useUser();
  const session = useSession();

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          let { data, error, status } = await supabase
            .from("Users")
            .select(` id, email, teacher, name, phone, batch_id ( shift, grade ) `)
            .eq("email", user.email)
            .single();

          if (error && status !== 406) {
            throw error;
          }
          // if (data) {
            // setId(data.id);
            // setEmail(data.email);
            // setPhone(data.phone);
            // setName(data.name);
            // setBatch(data.batch_id.grade + 'ᵗʰ ' + data.batch_id.shift)
            console.log(data)
          // }
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
            readOnly
          />
        </Grid>
        <Grid xs={12}>
          <Input
            type={"tel"}
            labelLeft="Phone"
            value={phone}
            maxLength={12}
            readOnly
          />
        </Grid>
        <Grid xs={12}>
          <Input type={"text"} labelLeft="Batch" value={batch} readOnly />
        </Grid>
      </Grid.Container>
    </>
  );
}
