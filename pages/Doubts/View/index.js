import Head from 'next/head'
import TopBar from '../../../src/components/navBar'
import DoubtsViewContainer from '../../../src/container/Doubts/View'

export default function Schedule() {
  return (
    <div>
      <Head>
        <title>View Doubt</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar>
        <main>
            <DoubtsViewContainer/>
        </main>
      </TopBar>
    </div>
  )
}