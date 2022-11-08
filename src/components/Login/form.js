import React from "react";
import { Grid, Input, Button, Link } from "@nextui-org/react";
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'

export default function LoginForm() {
    const { isLoading, session, error, supabaseClient } = useSessionContext();

    return (
        <React.Fragment>
            <Grid.Container
                css={{
                    width: 300,
                    margin: 'auto'
                }}
                gap={1}
                justify="center">
                <Grid xs justify='center'>
                    <img style={{ width: '50%' }} src="https://images-platform.99static.com//hbdQ5eUu96hb1j7Tt7PufcWfYGc=/123x113:1372x1362/fit-in/500x500/99designs-contests-attachments/90/90581/attachment_90581241" />
                </Grid>
                <Grid xs={12} justify={'center'}>
                    <Auth
                        redirectTo="http://localhost:3000/"
                        appearance={{ theme: ThemeSupa }}
                        supabaseClient={supabaseClient}
                        providers={['']}
                        socialLayout="horizontal"
                    />
                </Grid>
            </Grid.Container>
        </React.Fragment>
    );
}