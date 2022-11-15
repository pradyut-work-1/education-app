import { Card, Grid, Input, Button } from "@nextui-org/react"
import { useState } from "react"
import { SendIcon } from "./SendIcon"
import { supabase } from "../../../utils/supabaseClient";

export default function DiscussionsSendWidget() {
    const [formInputData, setFormInputData] = useState();
    
  const handleSubmit = async () => {
    if(formInputData){
    try {
      const inputData = {
        content: formInputData,
        user_id: 123,
      };

      let { error } = await supabase
        .from("Chatroom")
        .insert([inputData]);

      if (error) throw error;

        setFormInputData('');
    } catch (error) {
      console.log(error);
    } finally {
    }
}
  };

    return(
        <>
                <Card
          css={{
            position: "sticky",
            bottom: 18,
            p: 5,
            zIndex: 99999,
            '@xs':{
              width: '100%'
            },
            '@sm':{
              
              width: '82.5%'
            }
          }}
          
        >
          <Grid.Container
            css={{ display: "flex", flexWrap: "nowrap", p: 0, py: 2.5 }}
            gap={0.5}
            justify="start"
          >
            <Grid xs justify="start">
              <Input
                clearable
                contentRightStyling={false}
                placeholder="Type your message..."
                css={{ width: "100%" }}
                value={formInputData}
                onChange={ e => setFormInputData(e.target.value)}
                aria-label="Send Message"
                size="lg"
              />
            </Grid>
            <Grid>
                
      <Button onPress={handleSubmit} color="gradient" auto light css={{ p: 10 }}>
              <SendIcon  /></Button>
            </Grid>
          </Grid.Container>
        </Card>
        </>

    )
}